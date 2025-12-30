let data;
let currentStep = 0;

const titleEl = document.getElementById("title");
const promptEl = document.getElementById("prompt");
const selfCheckEl = document.getElementById("self-check");
const hintEl = document.getElementById("hint");
const revealEl = document.getElementById("reveal");
const revealBtn = document.getElementById("reveal-btn");
const nextBtn = document.getElementById("next-btn");

fetch("guided_proof_sqrt2.json")
  .then(r => r.json())
  .then(json => {
    data = json;
    titleEl.innerHTML = data.title;
    showStep();
  });

function showStep() {
  const step = data.steps[currentStep];

  promptEl.innerHTML = `<p><strong>Think:</strong> ${step.prompt}</p>`;
  revealEl.innerHTML = "";
  hintEl.innerHTML = "";
  selfCheckEl.innerHTML = "";
  revealBtn.style.display = "inline-block";
  nextBtn.style.display = "none";

  // Self-check (Yes / No)
  if (step.selfCheck) {
    selfCheckEl.innerHTML = `
      <p>${step.selfCheck.question}</p>
      <button id="yes-btn">Yes</button>
      <button id="no-btn">No</button>
    `;

    document.getElementById("yes-btn").onclick = () => {
      revealStep();
    };

    document.getElementById("no-btn").onclick = () => {
      hintEl.innerHTML = `<div class="hint">${step.selfCheck.hint}</div>`;
      MathJax.typeset();
    };
  }

  MathJax.typeset();
}

function revealStep() {
  const step = data.steps[currentStep];
  revealEl.innerHTML = `<div class="reveal">${step.reveal}</div>`;
  revealBtn.style.display = "none";
  nextBtn.style.display = "inline-block";
  MathJax.typeset();
}

revealBtn.onclick = revealStep;

nextBtn.onclick = () => {
  currentStep++;
  if (currentStep < data.steps.length) {
    showStep();
  } else {
    promptEl.innerHTML = "<p><strong>Finished!</strong> You have reached the end of the guided proof.</p>";
    selfCheckEl.innerHTML = "";
    hintEl.innerHTML = "";
    revealEl.innerHTML = "";
    revealBtn.style.display = "none";
    nextBtn.style.display = "none";
  }
};
