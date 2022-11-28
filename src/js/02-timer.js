import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  btnEl: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};

let selectedTime = null;
refs.btnEl.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDates[0] <= options.defaultDate
      ? (refs.btnEl.setAttribute('disabled', true),
        Notiflix.Report.failure(
          'ERROR',
          'Please choose a date in the future',
          'ok'
        ))
      : refs.btnEl.removeAttribute('disabled');
    selectedTime = selectedDates[0] - options.defaultDate;
    // if (selectedTime > 1000) {
    //   const time = convertMs(selectedTime);
    //   showDate(time);
    // }
    return;
  },
};

flatpickr(refs.inputEl, options, {});

refs.btnEl.addEventListener('click', () => {
  timer.start();
});

const timer = {
  intevalId: null,
  start() {
    this.intevalId = setInterval(() => {
      const time = convertMs((selectedTime -= 1000));
      getDate(time);
      refs.btnEl.setAttribute('disabled', true);
      if (selectedTime <= 1000) {
        this.stop();
      }
    }, 1000);
  },
  stop() {
    clearInterval(this.intevalId);
    Notiflix.Report.info('Time is over', 'Please choose a date', 'Ok');
  },
};

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

function getDate({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = days;
  refs.hoursEl.textContent = hours;
  refs.minutesEl.textContent = minutes;
  refs.secondsEl.textContent = seconds;
}

// function showDate({ days, hours, minutes, seconds }) {
//   refs.daysEl.textContent = days;
//   refs.hoursEl.textContent = hours;
//   refs.minutesEl.textContent = minutes;
//   refs.secondsEl.textContent = seconds;
// }
