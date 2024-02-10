
let currentSong = new Audio();
// currentSong.volume = 0;
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
        playpromise.then(() => document.querySelector("#play").src = "images/playing.svg")
    }

}

function pauseResume() {
    if (currentSong.paused) {
        currentSong.play().then(() => { document.querySelector("#play").src = "images/playing.svg" })

    }
    else {
        currentSong.pause()

        document.querySelector("#play").src = "images/play.svg"
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
            <img src="images/icon.svg" alt="">
            <div class="sname" dataComment=${tds[i].href} >
                ${songname}
            </div>
            <a></a>
            <div class="artist">
                Song artist
            </div>
            <img src="images/play.svg" class="invert alplay" alt="">
            <img src="images/playicon.svg" class="hplay invert">
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

    let a = await fetch(album)
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

        document.querySelector(".songtime").innerHTML = `${secondsToMinutes(Math.floor(songtime))}/${secondsToMinutes(Math.floor(songduration))}`
        if (songduration === songtime) {
            playnextsong()
        }
    }
}

function changeVolume(offsetY) {
    offsetY = Math.abs(offsetY)
    document.querySelector('.currentvolume').style.height = `${((80 - (offsetY)) / 80) * 100}%`
    currentSong.volume = ((80 - (offsetY)) / 80)

}

async function displayalbums() {
    let albums = await fetch('http://127.0.0.1:5500/albums')
    let response = await albums.text()
    let div = document.createElement('div')
    div.innerHTML = response
    let alist = [];
    div.querySelectorAll('a')
        .forEach(element => {
            // console.log(element.href)
            if (element.href.startsWith("http://127.0.0.1:5500/albums/")) {
                alist.push(element.href)
            }
        });
    let container = document.querySelector(".cardContainer")
    for (let element of alist){
    
        let card = document.createElement("div")
        card.classList.add('card');
        card.classList.add('rounded');
        
        let filePath = `${element}/info.json`
        let response =await fetch(filePath)
        let jsonContent = await response.json()
        
        card.innerHTML = `<div data-folder="${element}" class="imgincard">
        <div class="play">

            <svg height="50px" width="50px" version="1.1" id="Capa_1"
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 58 58" xml:space="preserve" fill="#000000">

                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                <g id="SVGRepo_iconCarrier">
                    <circle style="fill:#ff0000;" cx="29" cy="29" r="29" />
                    <g>
                        <polygon style="fill:#ffffff;" points="40,29 22,39 22,29.273 22,19 " />
                        <path style="fill:#ff0000;"
                            d="M22,45c-0.16,0-0.321-0.038-0.467-0.116C21.205,44.711,21,44.371,21,44V14 c0-0.371,0.205-0.711,0.533-0.884c0.328-0.174,0.724-0.15,1.031,0.058l22,15C44.836,28.36,45,28.669,45,29s-0.164,0.64-0.437,0.826 l-22,15C22.394,44.941,22.197,45,22,45z M23,15.893v26.215L42.225,29L23,15.893z" />
                    </g>
                </g>

            </svg>



        </div>
        <img class="rounded"
            src="${element}/cover.jpg" alt="">
    </div>
    <h2>${jsonContent.title}</h2>
    <p>${jsonContent.description}</p>`
    card.addEventListener('click',(event) => {
        getSongs(event.currentTarget.querySelector(".imgincard").getAttribute('data-folder'))
    })
        container.appendChild(card)
    };

}
async function main() {

    //geting list
    let songs = await getSongs("http://127.0.0.1:5500/albums/phonk")
    await displayalbums()

    let playbutton = document.querySelector('#play')
    playbutton.addEventListener("click", pauseResume);
    let nextbut = document.querySelector('#next')
    nextbut.addEventListener("click", playnextsong);
    let pervbut = document.querySelector('#previous')
    pervbut.addEventListener("click", playprevioussong);

    currentSong.addEventListener('timeupdate', updateTime);
    document.querySelector('.seekbar').addEventListener('click', e => {
        currentSong.currentTime = (((e.offsetX + 1) / (parseInt(document.querySelector('.seekbar').getBoundingClientRect().width))) * currentSong.duration);
    })
    document.querySelectorAll('.card').forEach(element => {
        element.addEventListener('mouseenter', (event) => {
            event.target.style.background = "#272727"
            event.target.querySelector('img').style.boxShadow = "3px 3px 20px 3px #121212"
            event.target.querySelector('.play').style.bottom = "8%"
            event.target.querySelector('.play').style.opacity = "1"
    
        })
        element.addEventListener('mouseleave', (event) => {
            event.target.style.background = "#181818"
            event.target.querySelector('img').style.boxShadow = "0px 0px 0px 0px #121212"
            event.target.querySelector('.play').style.bottom = "2%"
            event.target.querySelector('.play').style.opacity = "0"
    
        })
    });
   

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


}

main()

alert("Application(Prototype) still in development phase some features may not be available.\n-Utkarsh,Development Team")