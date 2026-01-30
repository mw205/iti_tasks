const audio = document.querySelector("audio");
const timeRange = document.querySelector("#timeRange");
const currentAudioTitle = document.querySelector("#currentAudioTitle");
const mediaItems = document.querySelectorAll(".media-item");

audio.addEventListener("loadedmetadata", function () {
  timeRange.max = audio.duration;
});

audio.addEventListener("timeupdate", function () {
  timeRange.value = audio.currentTime;
});

timeRange.addEventListener("input", function () {
  audio.currentTime = timeRange.value;
});
mediaItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    const src = item.dataset.src;
    const title = item.textContent.trim();
    if (!src) return;
    audio.src = src;
    audio.load();
    audio.play();
    currentAudioTitle.textContent = title;

    mediaItems.forEach((el) => el.classList.remove("active"));

    item.classList.add("active");
  });
});
function playAudio() {
  audio.play();
}
function pauseAudio() {
  audio.pause();
}
function stopAudio() {
  audio.pause();
  audio.currentTime = 0;
}
