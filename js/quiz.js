const params = new URLSearchParams(window.location.search);
const quizId = params.get("quiz");

let quizData;
let current = 0;
let score = 0;

/* ---------- Home ---------- */
document.getElementById("homeButton").onclick = () => {
  window.location.href = "index.html";
};

const titleEl = document.getElementById("quiz-title");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("next-btn");

fetch(`quizzes/${quizId}.json`)
  .then(r => r.json())
  .then(data => {
    quizData = data;
    titleEl.textContent = data.title;
    showQuestion();
  });

function showQuestion() {
  const q = quizData.questions[current];
  progressEl.textContent = `Question ${current + 1} of ${quizData.questions.length}`;

  questionEl.innerHTML = q.text;
  choicesEl.innerHTML = "";

  q.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.innerHTML = choice;
    btn.onclick = () => selectAnswer(i);
    choicesEl.appendChild(btn);
  });

  nextBtn.style.display = "none";
  MathJax.typeset();
}

function selectAnswer(i) {
  const q = quizData.questions[current];

  if (i === q.correct) {
    score++;
    questionEl.innerHTML += `<div class="explanation"><p><strong>Correct!</strong></p><p>${q.explanation}</p></div>`;
  } else {
  questionEl.innerHTML += `<div class="explanation">${q.explanation}</div>`;
      }
  nextBtn.style.display = "block";
  MathJax.typeset();
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
    <p>You scored ${score} out of ${quizData.questions.length}.</p>
  `;
  choicesEl.innerHTML = "";
  progressEl.textContent = "";
  <button onclick="window.location.href='index.html'">🏠 Home</button>

  // 🔹 Hook for future analytics (add later)
  // sendAnalytics({ quizId, score, total: quizData.questions.length });
}


