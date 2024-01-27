document.addEventListener('DOMContentLoaded', function () {
    // Selecting elements
    const video = document.querySelector('.player__video');
    const progress = document.querySelector('.progress');
    const progressBar = document.querySelector('.progress__filled');
    const toggleButton = document.querySelector('.player__button');
    const volumeSlider = document.querySelector('input[name="volume"]');
    const playbackSpeedSlider = document.querySelector('input[name="playbackRate"]');
    const skipButtons = document.querySelectorAll('[data-skip]');

    // Functions
    function togglePlay() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    function updateButton() {
        const icon = video.paused ? '►' : '❚ ❚';
        toggleButton.textContent = icon;
    }

    function skip() {
        video.currentTime += parseFloat(this.dataset.skip);
    }

    function handleRangeUpdate() {
        video[this.name] = this.value;
    }

    function handleProgress() {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.flexBasis = `${percent}%`;
    }

    function scrub(e) {
        const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = scrubTime;
    }

    // Event listeners
    video.addEventListener('click', togglePlay);
    video.addEventListener('play', updateButton);
    video.addEventListener('pause', updateButton);
    video.addEventListener('timeupdate', handleProgress);

    toggleButton.addEventListener('click', togglePlay);

    volumeSlider.addEventListener('input', handleRangeUpdate);
    playbackSpeedSlider.addEventListener('input', handleRangeUpdate);

    skipButtons.forEach(button => button.addEventListener('click', skip));

    let mousedown = false;
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false);
});