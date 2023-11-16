import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    picker: document.querySelector('#datetime-picker'),
    timer: document.querySelector('.timer'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

refs.startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            Notiflix.Notify.failure("Please choose a date in the future");
            refs.startBtn.disabled = true;
        } else {
            refs.startBtn.disabled = false;
        }
    }
};

flatpickr(refs.picker, options);

class Timer {
    intervalID;

    constructor(render) {
        this.render = render;
    }

    start() {
        this.intervalID = setInterval(() => {
            let diff = new Date(refs.picker.value) - new Date();
            refs.startBtn.disabled = true;
            refs.picker.disabled = true;
            if (diff >= 0) {
                let {days, hours, minutes, seconds} = convertMs(diff);
                this.render({days, hours, minutes, seconds});
            } else {
                clearInterval(this.intervalID);
            }
        }, 1000);
    }
}

const timer = new Timer(render);

refs.startBtn.addEventListener('click', () => { timer.start()});

function render({days, hours, minutes, seconds}) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    return {days, hours, minutes, seconds};
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}









