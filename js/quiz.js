const params = new URLSearchParams(window.location.search);
const quizId = params.get("quiz");

let quizData;
let current = 0;
let score = 0;


const homeBtn = document.getElementById("homeButton");
if (homeBtn) {
  homeBtn.onclick = () => {
    window.location.href = "index.html";
  };
}

const titleEl = document.getElementById("quiz-title");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("next-btn");
const feedbackEl = document.getElementById("feedback");

/* ---------- MathJax helper ---------- */
function typesetMath() {
  if (window.MathJax) {
    MathJax.typesetPromise();
  }
}

fetch(`quizzes/${quizId}.json`)
  .then(r => r.json())
  .then(data => {
    quizData = data;
    titleEl.textContent = data.title;
    showQuestion();
  });

function showQuestion() {
  const q = quizData.questions[current];

  progressEl.textContent =
    `Question ${current + 1} of ${quizData.questions.length}`;

  questionEl.innerHTML = q.text;
  choicesEl.innerHTML = "";
  feedbackEl.innerHTML = "";

  q.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.innerHTML = `${String.fromCharCode(65 + i)}. ${choice}`;
    btn.onclick = () => selectAnswer(i);
    choicesEl.appendChild(btn);
  });

  nextBtn.style.display = "none";
  typesetMath();
}

function selectAnswer(i) {
  const q = quizData.questions[current];
  const correctLetter = String.fromCharCode(65 + q.correct);

  if (i === q.correct) {
    score++;
    feedbackEl.innerHTML = `
      <div class="explanation">
        <p><strong>Correct!</strong></p>
        <p>${q.explanation}</p>
      </div>
    `;
  } else {
    feedbackEl.innerHTML = `
      <div class="explanation">
        <p><strong>The correct answer was ${correctLetter}.</strong></p>
        <p>${q.explanation}</p>
      </div>
    `;
  }

  nextBtn.style.display = "block";
  typesetMath();
}

nextBtn.onclick = () => {
  current++;
  if (current < quizData.questions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  questionEl.innerHTML = `
    <h3>Finished!</h3>
    <p>Thanks for practicing!</p>
    <p>You scored ${score} out of ${quizData.questions.length}.</p>`;
  choicesEl.innerHTML = "";
  feedbackEl.innerHTML = "";
  progressEl.textContent = "";
 nextBtn.style.display = "none";

}
