"use client";

var spotifyLink;

export async function submitUrl() {

    spotifyLink = document.getElementById('urlInput').value;

    window.location.assign('./playsong');

    playMusic();

}

export async function goBack() {

    //reset all vars, stop playing music

    window.location.href='../';
}

export async function playMusic(){

    let music = new Audio("https://p.scdn.co/mp3-preview/ddedd3b4c204e1f8c7770b3c2a3fb241b7a8524f?cid=c1af6b0d3617458bab65259e64a788a3");
    music.play();

}

export async function getAccess() {
 
    // gets access token

    let tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
        
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: ""

    });

    let tokenBody = await tokenResponse.json();
    return tokenBody["access_token"];

}

export async function getClosestSong(token, playlistID, BPM) {

    let playlistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {

        headers: {"Authorization": `Bearer  ${token}`}

    });

    let playlistBody = await playlistResponse.json();

    //get all tracks in playlist

    let tracks = [];

    let artists = [];

    let len = playlistBody["tracks"]["items"].length;

    for (let i = 0; i < len; i++) {

        tracks.push(playlistBody["tracks"]["items"][i]["track"]["id"])

        let flag = false;

        if (artists.length < 5) { 
            
            for (let j = 0; j < artists.length; j++) {

                if (artists[j] = playlistBody["tracks"]["items"][i]["track"]["artists"][0]["id"]) {

                    flag = true;

                }

            }

            if (flag) {

                continue;

            }

            artists.push(playlistBody["tracks"]["items"][i]["track"]["artists"][0]["id"]);

        }

    }

    // get bpm of each track and get +/- 4 bpm

    bpmIndexArr = [];

    for (let i = 0; i < len; i++) {

        let tracksResponse = await fetch(`https://api.spotify.com/v1/audio-features/${tracks[i]}`, {

            headers: {"Authorization": `Bearer  ${token}`}

        });

        let tracksBody = await tracksResponse.json();

        let newBPM = Math.abs(BPM-tracksBody["tempo"])

        if (newBPM <= 4) {

            bpmIndexArr.push(i);

        }
        
    }   

    // find songs

    let previewResponse;

    let previewBody;

    for (let i = 0; i < bpmIndexArr.length; i++) {

        previewResponse = await fetch(`https://api.spotify.com/v1/tracks/${tracks[i]}?market=US`, {

            headers: {"Authorization": `Bearer  ${token}`}

        });

        previewBody = await previewResponse.json();

        if (previewBody["preview_url"] != null) {

            break;

        }

    }
        
    if (previewBody["previewURL"] == null) {

        return getRecommended(token, artists, BPM);

    } 

    return null;

}

export async function getRecommended(token, artists, BPM) {

    let recommendedResponse = await fetch(`https://api.spotify.com/v1/recommendations?$market=US&seed_artists=
        ${artists[0]},${artists[1]},${artists[2]},${artists[3]},${artists[4]}&min_tempo=${BPM-4}&max_tempo=${BPM+4}&target_tempo=${BPM}`, {

        headers: {"Authorization": `Bearer  ${token}`}

    });

    let recommendedBody = await recommendedResponse.json(); 

    for (let i = 0; i < recommendedBody["tracks"].length; i++) {

        if (recommendedBody["tracks"][i]["preview_url"] != null) {

            return recommendedBody["tracks"][i]["preview_url"];

        }

    }

    return null;

}