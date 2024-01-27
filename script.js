// Selecting DOM elements
const video = document.querySelector('.player__video');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const playButton = document.querySelector('.player__button');
const volumeSlider = document.querySelector('input[name="volume"]');
const playbackSpeed = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll('[data-skip]');
const backwardButton = document.querySelector('[data-skip="-10"]');
const forwardButton = document.querySelector('[data-skip="25"]');

// Function to toggle play/pause
function togglePlay() {
  if (video.paused) {
    video.play();
    playButton.textContent = '❚ ❚';
  } else {
    video.pause();
    playButton.textContent = '►';
  }
}

// Function to update progress bar
function updateProgressBar() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Function to handle volume change
function handleVolumeChange() {
  video.volume = volumeSlider.value;
}

// Function to handle playback speed change
function handlePlaybackSpeedChange() {
  video.playbackRate = playbackSpeed.value;
}

// Function to skip video by a specified amount
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Function to go back by 10 seconds
function goBackward() {
  video.currentTime -= 10;
}

// Function to skip forward by 25 seconds
function goForward() {
  video.currentTime += 25;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', () => (playButton.textContent = '❚ ❚'));
video.addEventListener('pause', () => (playButton.textContent = '►'));
video.addEventListener('timeupdate', updateProgressBar);

playButton.addEventListener('click', togglePlay);

volumeSlider.addEventListener('input', handleVolumeChange);
playbackSpeed.addEventListener('input', handlePlaybackSpeedChange);

skipButtons.forEach((button) => button.addEventListener('click', skip));
backwardButton.addEventListener('click', goBackward);
forwardButton.addEventListener('click', goForward);

// Custom logic for volume and playback speed controllers
const volumeSuffix = volumeSlider.dataset.sizing || '';
const playbackSpeedSuffix = playbackSpeed.dataset.sizing || '';

volumeSlider.addEventListener('input', () => {
  document.documentElement.style.setProperty(`--volume`, volumeSlider.value + volumeSuffix);
});

playbackSpeed.addEventListener('input', () => {
  document.documentElement.style.setProperty(`--playback-speed`, playbackSpeed.value + playbackSpeedSuffix);
});