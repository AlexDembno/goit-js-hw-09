const refs = {
  btnstart: document.querySelector('button[data-start]'),
  btnstop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

refs.btnstart.addEventListener('click', enter);
refs.btnstop.addEventListener('click', end);

let interId = null;

function enter(event) {
  interId = setInterval(() => {
    refs.body.style.background = getRandomHexColor();
  }, 1000);
  refs.btnstart.setAttribute('disabled', true);
}
function end(event) {
  clearInterval(interId);
  refs.btnstart.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
