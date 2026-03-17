This web-app has two types of JavaScript logics implemented, one for quizzes and the other for step-by-step proofs (guided proofs). 
To re-use it for different material, the css files, quiz.html and guideproof.html files can be copied and the index.html can be adjusted. 
For the content, the json files would need to be filled in with the questions and answers.

## 📁 Repository Structure

* `index.html`: The main landing page for the web-app.
* `quiz.html` / `guideproof.html` / `induction.html`: The core interactive front-end views.
* `/css/`: Contains the stylesheets (`style2.css`, `guided.css`) for the application UI.
* `/quizzes/`: Contains the JSON data files that power the quizzes (e.g., `week1_gcdprime.json`, `week3_counting.json`).
* `/proofs/`: Contains the JSON data files that power the step-by-step proofs (e.g., `induction.json`, `starsbars.json`, `sqrt2.json`).

## 🚀 How to Run Locally

Since the app relies on fetching local JSON files, opening the HTML files directly in your browser via the `file://` protocol might trigger CORS (Cross-Origin Resource Sharing) errors. 

To run the app locally, serve the directory using a simple local web server. For example, if you have Python installed, run the following command in the root of this repository:

```bash
python -m http.server 8000
