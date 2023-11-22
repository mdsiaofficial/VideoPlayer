document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('videoPlayer');
    const openFileBtn = document.getElementById('openFileBtn');
    const playlist = document.getElementById('playlist');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let videoFiles = [];
    let currentVideoIndex = 0;

    openFileBtn.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/*';
        input.multiple = true;
        input.addEventListener('change', handleFileSelect);
        input.click();
    });

    playPauseBtn.addEventListener('click', function() {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    });

    stopBtn.addEventListener('click', function() {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    });

    prevBtn.addEventListener('click', function() {
        if (currentVideoIndex > 0) {
            currentVideoIndex--;
            playSelectedVideo();
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentVideoIndex < videoFiles.length - 1) {
            currentVideoIndex++;
            playSelectedVideo();
        }
    });

    function handleFileSelect(event) {
        const files = event.target.files;
        if (files && files.length > 0) {
            videoFiles = Array.from(files);
            currentVideoIndex = 0;
            playSelectedVideo();
            updatePlaylist();
        }
    }

    function playSelectedVideo() {
        videoPlayer.src = URL.createObjectURL(videoFiles[currentVideoIndex]);
        videoPlayer.play();
    }

    function updatePlaylist() {
        playlist.innerHTML = '';
        videoFiles.forEach((file, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = file.name;
            listItem.addEventListener('click', function() {
                currentVideoIndex = index;
                playSelectedVideo();
            });
            playlist.appendChild(listItem);
        });
    }
});
