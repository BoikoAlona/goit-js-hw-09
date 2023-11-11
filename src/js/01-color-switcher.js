function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]')
};

let intervalID;
isActive = false;

refs.startBtn.addEventListener('click', () => {
    if (this.isActive) return;
    this.isActive = true;
    intervalID = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
    if (!this.isActive) return;
    this.isActive = false;
    clearInterval(intervalID);
});
