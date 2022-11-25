import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  btnEl: document.querySelector('button[data-start]'),
};

const timeEl = document.querySelectorAll('.value');

refs.btnEl.addEventListener('click', startTaimer);
// refs.inputEl.addEventListener('click', qwe);

let interId = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDates[0] <= options.defaultDate
      ? (refs.btnEl.setAttribute('disabled', true),
        window.alert('Please choose a date in the future'))
      : refs.btnEl.removeAttribute('disabled');
    interId = selectedDates[0];
    convertMs(interId - options.defaultDate);
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  timerId = { days, hours, minutes, seconds };
}

convertMs();
console.log(timerId);

// timerId = setInterval(convertMs, 1000);

function startTaimer(event) {
  for (const timer of timerId) {
    timeEl.forEach(item => {
      item.textContent = timerId[timer];
    });
  }

  refs.spanDay.textContent = timerId.days;
  refs.spanHours.textContent = timerId.hours;
  refs.spanMin.textContent = timerId.minutes;
  refs.spanSec.textContent = timerId.seconds;
  setInterval(() => {
    refs.spanSec.textContent - 1;
  }, 1000);
}

flatpickr(refs.inputEl, options, {});
