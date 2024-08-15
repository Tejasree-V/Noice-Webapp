console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let prevIndex=-1;
let storedTime = 0;
let audioElement = new Audio('noises/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Dreamy Brown Noise", filePath: "noises/1.mp3", coverPath: "posters/1.jpeg"},
    {songName: "Rainy Day and Birds", filePath: "noises/2.mp3", coverPath: "posters/2.jpg"},
    {songName: "Ocean Waves Pink Noise", filePath: "noises/3.mp3", coverPath: "posters/3.jpg"},
    {songName: "Brown Noise- Basstretch", filePath: "noises/4.mp3", coverPath: "posters/4.jpeg"},
    {songName: "Old Vinyl Record Crackle", filePath: "noises/5.mp3", coverPath: "posters/5.jpeg"},
    {songName: "Dreamy Brown Noise", filePath: "noises/1.mp3", coverPath: "posters/1.jpeg"},
    {songName: "Rainy Day and Birds", filePath: "noises/2.mp3", coverPath: "posters/2.jpg"},
    {songName: "Ocean Waves Pink Noise", filePath: "noises/3.mp3", coverPath: "posters/3.jpg"},
    {songName: "Brown Noise- Basstretch", filePath: "noises/4.mp3", coverPath: "posters/4.jpeg"},
    {songName: "Old Vinyl Record Crackle", filePath: "noises/5.mp3", coverPath: "posters/5.jpeg"},
    
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    
    let audio = new Audio(songs[i].filePath);
    audio.addEventListener('loadedmetadata', () => {
        let totalDuration = audio.duration;
        let minutes = Math.floor(totalDuration / 60);
        let seconds = Math.floor(totalDuration % 60);

        // Format seconds to always be two digits
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        const formattedDuration = `${minutes}:${seconds}`;
        element.getElementsByClassName('tstamp')[0].innerText = formattedDuration;
    });
    
})

const updateSongItemPlayButton = (index, isPlaying) => {
    const playButton = document.getElementsByClassName('songItemPlay')[index];
    if (isPlaying) {
        playButton.classList.remove('fa-play-circle');
        playButton.classList.add('fa-pause-circle');
    } else {
        playButton.classList.remove('fa-pause-circle');
        playButton.classList.add('fa-play-circle');
    }
};

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        updateSongItemPlayButton(songIndex, true);
        prevIndex=songIndex;
    }
    else{
        storedTime = audioElement.currentTime;
        prevIndex=songIndex;
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        updateSongItemPlayButton(songIndex, false);
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        const clickedIndex = parseInt(e.target.id);

        if (e.target.classList.contains('fa-play-circle')) {
            // If the clicked button is a play button
            makeAllPlays();
            songIndex = clickedIndex;
            updateSongItemPlayButton(songIndex, true);
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            audioElement.src = songs[clickedIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            if(prevIndex==songIndex)
                audioElement.currentTime = storedTime;
            audioElement.play();
            gif.style.opacity = 1;
            prevIndex=songIndex;
        } 
        
        else {
            // If the clicked button is a pause button
            storedTime = audioElement.currentTime;
            prevIndex=songIndex;
            audioElement.pause();
            updateSongItemPlayButton(songIndex, false);
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
    });
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `noises/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updateSongItemPlayButton(songIndex-1, false);
    updateSongItemPlayButton(songIndex, true);

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `noises/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updateSongItemPlayButton(songIndex+1, false);
    updateSongItemPlayButton(songIndex, true);
})
