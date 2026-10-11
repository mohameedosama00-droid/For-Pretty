const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const question = document.getElementById("question");
const finale = document.getElementById("finale");
const tinyNote = document.getElementById("tinyNote");
const progress = document.getElementById("progress");
const restartBtn = document.getElementById("restartBtn");
const buttonsArea = document.querySelector(".buttons");

const playfulMessages = [
  "Oops, that button seems a little shy 🙈",
  "Almost got me! Try again 😌",
  "Nope, I'm too quick 🌷",
  "You might have better luck with Yes 💗",
  "Catch me if you can! ✨"
];
let noCount = 0;

function moveNoButton() {
  noCount++;
  tinyNote.textContent = playfulMessages[(noCount - 1) % playfulMessages.length];

  // Let the No button escape, but keep it inside the button area and on-screen.
  noBtn.classList.add("running");
  noBtn.style.transform = "none";

  const area = buttonsArea.getBoundingClientRect();
  const button = noBtn.getBoundingClientRect();
  const maxX = Math.max(0, area.width - button.width);
  const maxY = Math.max(0, area.height - button.height);

  const left = Math.random() * maxX;
  const top = Math.random() * maxY;
  noBtn.style.left = `${left}px`;
  noBtn.style.top = `${top}px`;
}

noBtn.addEventListener("pointerenter", moveNoButton);
noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});
noBtn.addEventListener("touchstart", () => {
  moveNoButton();
}, { passive: true });

yesBtn.addEventListener("click", () => {
  question.hidden = true;
  finale.hidden = false;
  finale.scrollIntoView({ behavior: "smooth", block: "start" });
  document.title = "A little story begins 💗";
});

restartBtn.addEventListener("click", () => {
  finale.hidden = true;
  question.hidden = false;
  noBtn.classList.remove("running");
  noBtn.style.left = "";
  noBtn.style.top = "";
  noBtn.style.transform = "";
  noCount = 0;
  tinyNote.textContent = "Choose wisely… just kidding (kind of) 🙈";
  question.scrollIntoView({ behavior: "smooth", block: "start" });
});

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const amount = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${amount}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();
