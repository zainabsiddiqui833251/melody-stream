document.addEventListener('DOMContentLoaded', function () {
    const songItems = document.querySelectorAll('.song-item');
    const currentSongTitle = document.querySelector('.current-song-title');
    const currentSongArtist = document.querySelector('.current-song-artist');
    const currentSongImg = document.querySelector('.current-song-img');
    const playPauseMain = document.querySelector('.play-pause-main');
    const progressBar = document.querySelector('.progress-bar');
    const audioPlayer = document.getElementById('audio-player');
    const backwardBtn = document.querySelector('.backward');
    const forwardBtn = document.querySelector('.forward');
    const previousBtn = document.querySelector('.previous');
    const nextBtn = document.querySelector('.next');

    let isPlaying = false;
    let songList = Array.from(songItems); // Convert NodeList to Array
    let currentSongIndex = 0; // Track current song index

    function loadSong(index) {
        const song = songList[index];
        if (song) {
            const songTitle = song.querySelector('.song-title').innerText;
            const songArtist = song.querySelector('.song-artist').innerText;
            const songImg = song.querySelector('.song-img').src;
            const songAudio = song.dataset.audio;

            currentSongTitle.innerText = songTitle;
            currentSongArtist.innerText = songArtist;
            currentSongImg.src = songImg;
            audioPlayer.src = songAudio;

            audioPlayer.play().catch(error => {
                console.log('Playback error:', error);
            });

            isPlaying = true;
            playPauseMain.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
        }
    }

    // Set default song details on page load
    loadSong(currentSongIndex); // Load default song
    audioPlayer.pause(); // Ensure the default song is paused on page load

    playPauseMain.addEventListener('click', function () {
        if (isPlaying) {
            audioPlayer.pause();
            this.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
            isPlaying = false;
        } else {
            audioPlayer.play().catch(error => {
                console.log('Playback error:', error);
            });
            this.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
            isPlaying = true;
        }
    });

    songItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            currentSongIndex = index;
            loadSong(currentSongIndex);
        });
    });

    backwardBtn.addEventListener('click', function () {
        audioPlayer.currentTime -= 10;
        if (audioPlayer.currentTime < 0) {
            audioPlayer.currentTime = 0;
        }
    });

    forwardBtn.addEventListener('click', function () {
        audioPlayer.currentTime += 10;
        if (audioPlayer.currentTime > audioPlayer.duration) {
            audioPlayer.currentTime = audioPlayer.duration;
        }
    });

    previousBtn.addEventListener('click', function () {
        if (currentSongIndex > 0) {
            currentSongIndex--;
        } else {
            currentSongIndex = songList.length - 1; // Loop to last song
        }
        loadSong(currentSongIndex);
    });

    nextBtn.addEventListener('click', function () {
        if (currentSongIndex < songList.length - 1) {
            currentSongIndex++;
        } else {
            currentSongIndex = 0; // Loop to first song
        }
        loadSong(currentSongIndex);
    });

    // Simulate progress bar
    setInterval(() => {
        if (isPlaying) {
            let width = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.style.width = width + '%';
        }
    }, 1000);
});


//search
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const songItems = document.querySelectorAll('.song-item');

    function filterSongs() {
        const query = searchInput.value.toLowerCase();

        songItems.forEach(item => {
            const title = item.querySelector('.song-title').innerText.toLowerCase();
            const artist = item.querySelector('.song-artist').innerText.toLowerCase();

            if (title.includes(query) || artist.includes(query)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    searchButton.addEventListener('click', filterSongs);

    // Optional: Allow pressing Enter to trigger search
    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            filterSongs();
        }
    });
});


//sidebar
