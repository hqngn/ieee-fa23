/**
 * Resources Used:
 * https://developer.chrome.com/en/articles/serial/
 * https://stackoverflow.com/questions/10142867/reference-url-with-javascript-to-play-sound
 * https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
 */

"use client";

// Delay taken from the third resource listed above

const delay = ms => new Promise(res => setTimeout(res, ms));

// Start search for song using bpm

export async function buttonPress() {

    let port = await openPort();

    let BPM = await readBPM(port);

    let token = await getAccess();

    let playlistID = document.getElementById("urlInput").value

    playlistID = playlistID.split("?")[0].split("/")
    playlistID = playlistID[playlistID.length-1];

    let songURL = await getCloseSongs(token, playlistID, BPM);

    let song = await playMusic(songURL[0]);

    await delay(10000);

    await end(song, port, songURL[1], songURL[2], songURL[3], songURL[4],);

}

// Open port arduino is on (taken from first resource listed above)

export async function openPort() {

    const port = await navigator.serial.requestPort();

    await port.open({ baudRate: 115200 });

    return port;

}

// Read from port arduino (taken from first resource listed above)

export async function readBPM(port) {

    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();

    while (true) {
    
        const { value, done } = await reader.read();
        
        if (done) {

            reader.releaseLock();
            break;

        }

        let BPM = (value.split(",")[0]);

        if (BPM >= 30 && BPM <= 200) {

            reader.releaseLock();

            return BPM;

        }

    }

}

// Gets token from Spotify API

export async function getAccess() {

    let tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
        
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: "grant_type=client_credentials&client_id=" +
        "&client_secret="

    });

    let tokenBody = await tokenResponse.json();

    return tokenBody["access_token"];

}

// Looks for songs in playlist with +/- 2 BPM

export async function getCloseSongs(token, playlistID, BPM) {

    let playlistResponse 
        = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {

        headers: {"Authorization": `Bearer  ${token}`}

    });

    let playlistBody = await playlistResponse.json();

    console.log(playlistBody);

    let tracks = [];

    let artists = [];

    for (let i = 0; i < playlistBody["tracks"]["items"].length; i++) {

        tracks.push(playlistBody["tracks"]["items"][i]["track"]["id"])

        let flag = false;

        if (artists.length < 5) { 

            artists.push(

                playlistBody["tracks"]["items"][i]["track"]["artists"][0]["id"]
                
            );

        }

    }

    let bpmIndexArr = [];

    for (let i = 0; i < playlistBody["tracks"]["items"].length; i++) {

        let tracksResponse = await fetch(
            
            `https://api.spotify.com/v1/audio-features/${tracks[i]}` + 
            `?market=US`, {

            headers: {"Authorization": `Bearer  ${token}` }

        });

        let tracksBody = await tracksResponse.json();

        let newBPM = Math.abs(BPM-tracksBody["tempo"])

        if (newBPM <= 2) {

            bpmIndexArr.push(i);

        }
        
    }   

    let previewResponse;

    let previewBody;

    for (let i = 0; i < bpmIndexArr.length; i++) {

        previewResponse = await fetch(
            
            `https://api.spotify.com/v1/tracks/${tracks[i]}?market=US`, {

            headers: {"Authorization": `Bearer  ${token}`}

        });

        previewBody = await previewResponse.json();

        if (previewBody["preview_url"] != null) {

            let artistNames = "|";

            for (let j = 0; j < previewBody["artists"].length; j++) {

                artistNames += previewBody["artists"][j]["name"] + "|";

            }

            return [
                
                previewBody["preview_url"],
                previewBody["name"],
                artistsNames,
                BPM
            
            ];

        }

    }
        
    return await getRecommended(token, artists, BPM);

}

export async function getRecommended(token, artists, BPM) {

    let recommendedResponse = await fetch(
        
        `https://api.spotify.com/v1/recommendations?limit-100&market=US` +
        `&seed_artists=${artists[0]},${artists[1]},${artists[2]},` +
        `${artists[3]},${artists[4]}&min_tempo=${BPM-2}&max_tempo=${BPM+2}` + 
        `&target_tempo=${BPM}`, {

        headers: {"Authorization": `Bearer  ${token}`}

    });

    let recommendedBody = await recommendedResponse.json(); 

    for (let i = 0; i < recommendedBody["tracks"].length; i++) {

        if (recommendedBody["tracks"][i]["preview_url"] != null) {

            let artistNames = "";

            for (let j = 0; j < recommendedBody["tracks"][i]["artists"].length;
                 j++) {

                artistNames += 
                    recommendedBody["tracks"][i]["artists"][j]["name"] + " ";

            }      

            return [
            
                recommendedBody["tracks"][i]["preview_url"],
                recommendedBody["tracks"][i]["name"], 
                artistNames, 
                BPM
            
            ];

        }

    }

    return null;

}

// Plays audio (taken from second resource listed above)

export async function playMusic(url) {

    let music = new Audio(url);
    music.play();

    return music;

}

// End and disconnect

export async function end(music, port, name, artists, BPM) {

    music.pause();

    window.alert(
    
        `Song: ${name}\nArtists: ${artists}\nYour BPM: ${BPM}`

    );

    port.forget();

}