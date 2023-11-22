document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');
    const playlist = document.getElementById('playlist');
    const openButton = document.getElementById('openButton');

    openButton.addEventListener('click', openVideos);

    function openVideos() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/*';
        input.multiple = true;

        input.addEventListener('change', handleFileSelection);
        input.click();
    }

    function handleFileSelection(event) {
        const files = event.target.files;

        if (files.length > 0) {
            for (const file of files) {
                addToPlaylist(file);
            }

            openButton.style.display = 'none';
        }
    }

    function addToPlaylist(file) {
        const listItem = document.createElement('li');
        listItem.textContent = file.name;
        listItem.addEventListener('click', () => playVideo(file));
        playlist.appendChild(listItem);
    }

    function playVideo(file) {
        video.src = URL.createObjectURL(file);
        video.play();
    }
});
