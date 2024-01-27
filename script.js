/*const inputs = document.querySelectorAll('.controls input');

    function handleUpdate() {
      const suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }

    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
// scripts.js*/
const video = document.querySelector('.player__video');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const playButton = document.querySelector('.toggle');
const volumeSlider = document.querySelector('input[name="volume"]');
const playbackSpeedSlider = document.querySelector('input[name="playbackSpeed"]');
const skipButtons = document.querySelectorAll('[data-skip]');

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updatePlayButton() {
  playButton.textContent = video.paused ? '►' : '❚ ❚';
}

function handleVolumeChange() {
  video.volume = volumeSlider.value;
}

function handlePlaybackSpeedChange() {
  video.playbackRate = playbackSpeedSlider.value;
}

function handleSkip() {
  const skipAmount = parseFloat(this.dataset.skip);
  video.currentTime += skipAmount;
}

function handleProgress() {
  const progressPercentage = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${progressPercentage}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', handleProgress);

playButton.addEventListener('click', togglePlay);
volumeSlider.addEventListener('input', handleVolumeChange);
playbackSpeedSlider.addEventListener('input', handlePlaybackSpeedChange);

skipButtons.forEach(button => button.addEventListener('click', handleSkip));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);