const questions = [
  {
    text: "1. ما نوع البريد التالي",
    img: "/images/Question-1.png",
    choices: [
      {
        text: "تصيد الكتروني",
        isCorrect: false,
      },
      {
        text: "ليس تصيد الكتروني",
        isCorrect: true,
      },
      {
        text: "لا ادري",
        isCorrect: false,
      },
    ],
  },
  {
    text: "2. ما نوع البريد التالي",
    img: "/images/Question-1.png",
    choices: [
      {
        text: "تصيد الكتروني",
        isCorrect: true,
      },
      {
        text: "ليس تصيد الكتروني",
        isCorrect: false,
      },
      {
        text: "لا ادري",
        isCorrect: false,
      },
    ],
  },
  {
    text: "3. ما نوع البريد التالي",
    img: "/images/Question-1.png",
    choices: [
      {
        text: "تصيد الكتروني",
        isCorrect: false,
      },
      {
        text: "ليس تصيد الكتروني",
        isCorrect: false,
      },
      {
        text: "لا ادري",
        isCorrect: true,
      },
    ],
  },
];

// Helpers
function renderQuestion(question) {
  const rightColEl = document.querySelector(
    "#questionContainer .question__right"
  );
  const leftColEl = document.querySelector(
    "#questionContainer .question__left"
  );
  // UI Reset
  rightColEl.innerHTML = "";
  leftColEl.innerHTML = "";
  // Add question dom elements
  const qTextEl = document.createElement("h2");
  qTextEl.classList.add("question__text");
  qTextEl.innerText = question.text;
  const qAnswersEl = document.createElement("form");
  qAnswersEl.setAttribute("id", "answers");
  question.choices.forEach((choice, i) => {
    //<label for="firstAnswer" class="answer">
    // <input type="radio" name="answer" id="firstAnswer" value="1" />
    const answerLabelEl = document.createElement("label");
    answerLabelEl.classList.add("answer");
    answerLabelEl.setAttribute("for", `answer-${i}`);
    const answerInputEl = document.createElement("input");
    answerInputEl.setAttribute("type", "radio");
    answerInputEl.setAttribute("name", "answer");
    answerInputEl.setAttribute("id", `answer-${i}`);
    answerInputEl.setAttribute("value", i);
    answerLabelEl.appendChild(answerInputEl);
    answerLabelEl.append(choice.text);
    qAnswersEl.appendChild(answerLabelEl);
  });
  rightColEl.appendChild(qTextEl);
  rightColEl.appendChild(qAnswersEl);

  const qImgEl = document.createElement("img");
  qImgEl.setAttribute("src", question.img);
  leftColEl.appendChild(qImgEl);
}

// Business Logic
class Question {
  constructor(text, img, choices) {
    this.text = text;
    this.img = img;
    this.choices = choices;
    this.selectedChoice;
    this.score = 0;
  }

  recordAnswer(i) {
    this.selectedChoice = i;
    this.selfCorrect();
  }

  selfCorrect() {
    if (this.choices[this.selectedChoice].isCorrect) {
      this.score = 1;
    } else {
      this.score = 0;
    }
  }

  getSelectedChoiceIndex() {
    return this.selectedChoice;
  }
}

class QuizUI {
  constructor(questions) {
    this.questions = questions.map(
      (q) => new Question(q.text, q.img, q.choices)
    );

    this.currentQuestionIndex = 0;
  }

  render() {
    console.log("Render Quiz!");
    renderQuestion(this.questions[this.currentQuestionIndex]);
    this.renderNavButtons();
  }

  next() {
    console.log("Next Question!");
    this.questions[this.currentQuestionIndex].recordAnswer(this.getChecked());
    this.currentQuestionIndex++;
    this.render();
  }

  prev() {
    console.log("Prev. Question!");
  }

  getScore() {
    console.log("Get Quiz Score!");
    let initialScore = 0;
    return this.questions.reduce((acc, curr) => acc + curr.score, initialScore);
  }

  end() {
    console.log("End Quiz!");
    this.questions[this.currentQuestionIndex].recordAnswer(this.getChecked());
    console.log(this.questions);
    console.log("Score: ", this.getScore());
  }

  printQuestions() {
    console.log("Questions: ", this.questions);
  }

  renderNavButtons() {
    if (this.currentQuestionIndex === 0) {
      // first question, render next button only
      this.renderNextButton();
    } else if (this.currentQuestionIndex < this.questions.length - 1) {
      // mid question, render prev and next button
      this.renderNextButton();
      this.renderPrevButton();
    } else {
      // last question render prev and finish button
      this.renderFinishButton();
      this.renderPrevButton();
    }
  }

  renderNextButton() {
    const nextButton = document.createElement("button");
    nextButton.innerText = "Next";
    nextButton.addEventListener("click", this.next.bind(this));
    document.querySelector(".question__right").appendChild(nextButton);
  }

  renderPrevButton() {
    const prevButton = document.createElement("button");
    prevButton.innerText = "Prev.";
    prevButton.addEventListener("click", this.prev.bind(this));
    document.querySelector(".question__right").appendChild(prevButton);
  }

  renderFinishButton() {
    const finishButton = document.createElement("button");
    finishButton.innerText = "Finish";
    finishButton.addEventListener("click", this.end.bind(this));
    document.querySelector(".question__right").appendChild(finishButton);
  }

  getChecked() {
    return +document.querySelector('input[name="answer"]:checked').value;
  }
}

// Init App
const quiz = new QuizUI(questions);
quiz.render();