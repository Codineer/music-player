console.log("lets write javascript")

async function addliinlibrary(tds){
    let song = []
    
    for (let i = 0; i < tds.length; i++) {
        if (tds[i].href.endsWith(".mp3")) {
            let songname = tds[i].querySelector('.name').innerText
            let li = document.createElement("li")
            li.innerHTML = `
            <img src="icon.svg" alt="">
            <div class="sname">
                ${songname}
            </div>
            <div class="artist">
                Song artist
            </div>
            <img src="play.svg" class="invert alplay" alt="">
            <img src="playicon.svg" class="hplay invert">
        `
            document.querySelector('.songList').querySelector('ul').appendChild(li)
            song.push(tds[i].href)
        }
    }
    console.log(2)
    return song
} 
async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response;
    let tds = div.getElementsByTagName("a")
    console.log(1)
    return await addliinlibrary(tds)
}

async function main() {
    //geting list
    let songs = await getSongs()
    console.log(3)
    let songli=document.querySelector('.songList').querySelectorAll('li') 
    songli.forEach((li)=>{ 
    li.addEventListener('mouseover', function () {
        songimgplay = li.querySelector('.hplay')
        // Your code to execute when the element is hovered
        songimgplay.style.display = "block";
     
    });
    li.addEventListener('mouseout', function () {
        songimgplay = li.querySelector('.hplay')
        // Your code to execute when the element is hovered
        songimgplay.style.display = "none";
      
    });})
    let songlistbox=document.querySelector('.songList').querySelector('ul');
    console.log(songlistbox)
    
    //play the first song
    var audio = new Audio(songs[0]);
    // audio.play();
    audio.addEventListener("loadeddata", () => {
        console.log(audio.duration, audio.currentSrc, audio.currentTime)
        // The duration variable now holds the duration (in seconds) of the audio clip
    });

}
main()
