var spotifyLink;
export async function submitUrl() {

    spotifyLink = document.getElementById('urlInput').value;

    window.location.href='/playsong';
}

export async function goBack() {

    //reset all vars, stop playing music

    window.location.href='../';
}