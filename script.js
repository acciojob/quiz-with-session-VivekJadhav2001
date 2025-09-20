// Do not change code below this line
      const questions = [
        {
          question: "What is the capital of France?",
          choices: ["Paris", "London", "Berlin", "Madrid"],
          answer: "Paris",
        },
        {
          question: "What is the highest mountain in the world?",
          choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
          answer: "Everest",
        },
        {
          question: "What is the largest country by area?",
          choices: ["Russia", "China", "Canada", "United States"],
          answer: "Russia",
        },
        {
          question: "Which is the largest planet in our solar system?",
          choices: ["Earth", "Jupiter", "Mars"],
          answer: "Jupiter",
        },
        {
          question: "What is the capital of Canada?",
          choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
          answer: "Ottawa",
        },
      ];

      const questionsElement = document.getElementById("questions");
      const submitBtn = document.getElementById("submit");
      const scoreDiv = document.getElementById("score");

      // Load previous answers if any
      let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

      // Render questions
      function renderQuestions() {
        questionsElement.innerHTML = ""; // clear before render
        for (let i = 0; i < questions.length; i++) {
  const question = questions[i];
  const questionElement = document.createElement("div");
  questionElement.classList.add("question");

  const questionText = document.createElement("p");
  questionText.textContent = question.question; // Remove numbering
  questionElement.appendChild(questionText);

  for (let j = 0; j < question.choices.length; j++) {
    const choice = question.choices[j];
    const choiceWrapper = document.createElement("label");

    const choiceElement = document.createElement("input");
    choiceElement.type = "radio";
    choiceElement.name = `question-${i}`;
    choiceElement.value = choice;

    // Restore previous selection with checked attribute
    if (userAnswers[i] === choice) {
      choiceElement.checked = true;
      choiceElement.setAttribute("checked", "true");
    }

    choiceElement.addEventListener("change", (e) => {
      userAnswers[i] = e.target.value;
      sessionStorage.setItem("progress", JSON.stringify(userAnswers));

      // update checked attribute for Cypress
      const siblings = document.getElementsByName(`question-${i}`);
      siblings.forEach((sib) => sib.removeAttribute("checked"));
      e.target.setAttribute("checked", "true");
    });

    choiceWrapper.appendChild(choiceElement);
    choiceWrapper.appendChild(document.createTextNode(choice));
    questionElement.appendChild(choiceWrapper);
  }

  questionsElement.appendChild(questionElement);
}
      }

      // Display previous score on reload
      window.addEventListener("load", () => {
        const savedScore = localStorage.getItem("score");
        if (savedScore !== null) {
          scoreDiv.style.display = "block";
          scoreDiv.innerHTML = `Your score is <span style="color:red;">${savedScore}</span> out of <span style="color:red;">${questions.length}</span>.`;
        }
      });

      renderQuestions();

      // Submit quiz
      submitBtn.addEventListener("click", () => {
        let score = 0;
        for (let i = 0; i < questions.length; i++) {
          if (userAnswers[i] === questions[i].answer) {
            score++;
          }
        }

        // Display score and store in localStorage
        scoreDiv.style.display = "block";
        scoreDiv.innerHTML = `Your score is <span style="color:red;">${score}</span> out of <span style="color:red;">${questions.length}</span>.`;
        localStorage.setItem("score", score);
      });


