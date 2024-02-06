console.log("lets write javascript")
let currentSong = new Audio();
function playMusic(li,link) {
    if (link == currentSong.src) {
        pauseResume()
    }
    else {
        currentSong.src = link;
        document.querySelector('.playbar').querySelector('.songinfo').innerText =
            li.querySelector('.sname').innerText;
        document.querySelector('.songtime').innerText = "00:00/00:00"
    
        currentSong.play()

        document.querySelector("#play").src = "playing.svg"
    }

}

function pauseResume() {
    if (currentSong.paused) {
        currentSong.play()

        document.querySelector("#play").src = "playing.svg"
    }
    else {
        currentSong.pause()

        document.querySelector("#play").src = "play.svg"
    }
}

async function addliinlibrary(tds) {
    let song = []
    for (let i = 0; i < tds.length; i++) {
        if (tds[i].href.endsWith(".mp3")) {
            let songname = tds[i].querySelector('.name').innerText
            let li = document.createElement("li")
            li.innerHTML = `
            <img src="icon.svg" alt="">
            <div class="sname" dataComment=${tds[i].href}>
                ${songname}
            </div>
            <a></a>
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
    return song
}
async function getSongs() {

    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response;
    let tds = div.getElementsByTagName("a")
    return await addliinlibrary(tds)

}
function secondsToMinutes(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    // return minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
    return seconds
}

function updateTime() {

    let songtime = currentSong.currentTime
    let songduration = currentSong.duration
    let width = (songtime / songduration) * 100
    document.querySelector(".circle").style.width = width + '%'
    console.log("updateTime")
    
    document.querySelector(".songtime").innerHTML = `${secondsToMinutes(Math.floor(songtime))}/${secondsToMinutes(Math.floor(songduration))}`

}
async function main() {

    //geting list
    let songs = await getSongs()
    console.log(songs)
    let songli = document.querySelector('.songList').querySelectorAll('li')
    songli.forEach((li) => {
        let songlink = li.querySelector(".sname").getAttribute('dataComment')
        let songimgplay = li.querySelector('.hplay')
        li.addEventListener('mouseover', function () {

            // Your code to execute when the element is hovered
            songimgplay.style.display = "block";

        });
        li.addEventListener('mouseout', function () {

            // Your code to execute when the element is hovered
            songimgplay.style.display = "none";

        });
        li.addEventListener("click", function (event) {
            playMusic(li,songlink)
        })
        // playMusic(li,songlink)
       

    })

    let playbutton = document.querySelector('#play')
    playbutton.addEventListener("click", pauseResume);
    currentSong.addEventListener('timeupdate', updateTime);


}

main()
