console.log("lets write javascript")
let currentSong = new Audio();
currentSong.volume = 0;
let songrecord;
let currentsongindex;
function playMusic(li, link, currentsongi) {
    if (link == currentSong.src) {
        pauseResume()
    }
    else {
        currentSong.src = link;
        currentsongindex = currentsongi
        document.querySelector('.playbar').querySelector('.songinfo').innerText =
            li.querySelector('.sname').innerText;
        document.querySelector('.songtime').innerText = "0:00/0:00"
        let playpromise = currentSong.play()
        playpromise.then(() => document.querySelector("#play").src = "playing.svg")
    }

}

function pauseResume() {
    if (currentSong.paused) {
        currentSong.play().then(() => { document.querySelector("#play").src = "playing.svg" })

    }
    else {
        currentSong.pause()

        document.querySelector("#play").src = "play.svg"
    }
}

async function addliinlibrary(tds) {
    let song = []
    count = 0
    document.querySelector('.songList').querySelector('ul').innerHTML = "";
    for (let i = 0; i < tds.length; i++) {
        if (tds[i].href.endsWith(".mp3")) {
            let songname = tds[i].querySelector('.name').innerText
            let li = document.createElement("li")
            li.innerHTML = `
            <img src="icon.svg" alt="">
            <div class="sname" dataComment=${tds[i].href} >
                ${songname}
            </div>
            <a></a>
            <div class="artist">
                Song artist
            </div>
            <img src="play.svg" class="invert alplay" alt="">
            <img src="playicon.svg" class="hplay invert">
        `
            li.addEventListener('mouseover', function () {
                let songimgplay = li.querySelector('.hplay')
                // Your code to execute when the element is hovered
                songimgplay.style.display = "block";

            });
            li.addEventListener('mouseout', function () {
                // Your code to execute when the element is hovered
                let songimgplay = li.querySelector('.hplay')
                songimgplay.style.display = "none";

            });
            li.addEventListener("click", function () {
                let songlink = li.querySelector(".sname").getAttribute('dataComment')
                playMusic(li, songlink, count++)
            })
            document.querySelector('.songList').querySelector('ul').appendChild(li)
            song.push(tds[i].href)
        }
    }
    let songli = document.querySelector('.songList').querySelectorAll('li')
    songrecord = songli
    playMusic(songli[0], songli[0].querySelector(".sname").getAttribute('dataComment'), 0)
    return song
}
async function getSongs(album) {

    let a = await fetch(`http://127.0.0.1:5500/albums/${album}/`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response;
    let tds = div.getElementsByTagName("a")
    return await addliinlibrary(tds)

}
function secondsToMinutes(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    return minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
}
function playnextsong() {
    console.log(currentsongindex)
    console.log(songrecord.length)
    if ((currentsongindex + 1) < songrecord.length) {
        playMusic(songrecord[currentsongindex + 1], songrecord[currentsongindex + 1].querySelector(".sname").getAttribute('dataComment'), currentsongindex + 1)
    }
    else {
        playMusic(songrecord[0], songrecord[0].querySelector(".sname").getAttribute('dataComment'), 0)
    }
}

function playprevioussong() {
    if ((currentsongindex - 1) >= 0) {
        playMusic(songrecord[currentsongindex - 1], songrecord[currentsongindex - 1].querySelector(".sname").getAttribute('dataComment'), currentsongindex - 1)
    }
    else {
        playMusic(songrecord[songrecord.length - 1], songrecord[songrecord.length - 1].querySelector(".sname").getAttribute('dataComment'), songrecord.length - 1)
    }
}
function updateTime() {

    let songtime = currentSong.currentTime
    let songduration = currentSong.duration
    let width = (songtime / songduration) * 100
    if (!isNaN(songduration)) {
        document.querySelector(".circle").style.width = width + '%'
        console.log("updateTime")

        document.querySelector(".songtime").innerHTML = `${secondsToMinutes(Math.floor(songtime))}/${secondsToMinutes(Math.floor(songduration))}`
        if (songduration === songtime) {
            playnextsong()
        }
    }
}

function changeVolume(offsetY) {
    offsetY = Math.abs(offsetY)
    document.querySelector('.currentvolume').style.height = `${((80 - (offsetY)) / 80) * 100}%`
    console.log(document.querySelector('.currentvolume').style.height)
    currentSong.volume = ((80 - (offsetY)) / 80)

}

async function displayalbums(){
    let albums = await fetch('http://127.0.0.1:5500/albums')
    let response =await albums.text()
    let div =document.createElement('div')
    div.innerHTML = response
    let alist=[];
    div.querySelectorAll('a')
    .forEach(element => {
        // console.log(element.href)
        if (element.href.startsWith("http://127.0.0.1:5500/albums/")){
            alist.push(element.href)
        }
    });
    
    console.log(alist)
}
async function main() {

    //geting list
    let songs = await getSongs("phonk")
    console.log(songs)
    await displayalbums()

    let playbutton = document.querySelector('#play')
    playbutton.addEventListener("click", pauseResume);
    let nextbut = document.querySelector('#next')
    nextbut.addEventListener("click", playnextsong);
    let pervbut = document.querySelector('#previous')
    pervbut.addEventListener("click", playprevioussong);

    currentSong.addEventListener('timeupdate', updateTime);
    document.querySelector('.seekbar').addEventListener('click', e => {
        console.log(currentSong.currentTime = (((e.offsetX + 1) / (parseInt(document.querySelector('.seekbar').getBoundingClientRect().width))) * currentSong.duration));
    })
    document.querySelector('.card').addEventListener('mouseenter', (event) => {
        event.target.style.background = "#272727"
        event.target.querySelector('img').style.boxShadow = "3px 3px 20px 3px #121212"
        event.target.querySelector('.play').style.bottom = "8%"
        event.target.querySelector('.play').style.opacity = "1"

    })
    document.querySelector('.card').addEventListener('mouseleave', (event) => {
        event.target.style.background = "#181818"
        event.target.querySelector('img').style.boxShadow = "0px 0px 0px 0px #121212"
        event.target.querySelector('.play').style.bottom = "2%"
        event.target.querySelector('.play').style.opacity = "0"

    })

    //add event listeners to volume slider

    document.querySelector('.volumeimg').addEventListener("click", (event) => {
        let seekbar = document.querySelector('.volumeseekbar')

        if (seekbar.style.display === 'block') {
            seekbar.style.display = "none"
        }
        else {
            seekbar.style.display = "block"
        }
        event.stopPropagation()

    })
    document.querySelector('.volumeseekbar').addEventListener("click", (event) => {
        const mainParentRect = event.currentTarget.getBoundingClientRect();
        const mainParentOffsetY = event.clientY - mainParentRect.top;
        changeVolume(mainParentOffsetY)
    })

    // add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener('click', (event) => {
        document.querySelector(".left").style.left = "0px"
    })
    document.querySelector(".cross").addEventListener('click', (event) => {
        document.querySelector(".left").style.left = "-100%"
    })
    console.log(songrecord)

    setTimeout(() => {
        getSongs("relax")
    }, 4000);

}

main()

// alert("Application(Prototype) still in development phase some features may not be available.\n-Utkarsh,Development Team")