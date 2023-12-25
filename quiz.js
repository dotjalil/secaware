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
    text: "3. ما نوع البريد التالي",
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
];

// function renderRightCol(qText, choices, qActions) {
//   const rightColEl = document.querySelector(
//     "#questionContainer .question__right"
//   );
//   const qTextEl = document.createElement("h2");
//   qTextEl.classList.add("question__text");
//   qTextEl.innerText = qText;
//   const qAnswersEl = document.createElement("form");
//   qAnswersEl.setAttribute("id", "answers");
//   choices.forEach((choice, i) => {
//     //<label for="firstAnswer" class="answer">
//     // <input type="radio" name="answer" id="firstAnswer" value="1" />
//     const answerLabelEl = document.createElement("label");
//     answerLabelEl.classList.add("answer");
//     answerLabelEl.setAttribute("for", `answer-${i}`);
//     const answerInputEl = document.createElement("input");
//     answerInputEl.setAttribute("type", "radio");
//     answerInputEl.setAttribute("name", "answer");
//     answerInputEl.setAttribute("id", `answer-${i}`);
//     answerInputEl.setAttribute("value", i);
//     answerLabelEl.appendChild(answerInputEl);
//     answerLabelEl.append(choice.text);
//     qAnswersEl.appendChild(answerLabelEl);
//   });
//   rightColEl.appendChild(qTextEl);
//   rightColEl.appendChild(qAnswersEl);
// }

// function renderLeftCol(img) {
//   const leftColEl = document.querySelector(
//     "#questionContainer .question__left"
//   );
//   const qImgEl = document.createElement("img");
//   qImgEl.setAttribute("src", img);
//   leftColEl.appendChild(qImgEl);
// }

// function renderQuestion(q) {
//   renderRightCol(q.text, q.choices, "submit");
//   renderLeftCol(q.img);
// }

// renderQuestion(questions[0]);

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.answers = [];

    this.renderQuestion();
  }

  renderQuestion() {
    // Get current question obj
    const currentQuestion = this.questions[this.currentQuestionIndex];

    // Render the right col
    this.renderRightCol(currentQuestion.text, currentQuestion.choices);

    // Render the left col
    this.renderLeftCol(currentQuestion.img);
  }

  renderRightCol(qText, choices) {
    // Implement your rendering logic for the right column
    const rightColEl = document.querySelector(
      "#questionContainer .question__right"
    );
    const qTextEl = document.createElement("h2");
    qTextEl.classList.add("question__text");
    qTextEl.innerText = qText;
    const qAnswersEl = document.createElement("form");
    qAnswersEl.setAttribute("id", "answers");
    choices.forEach((choice, i) => {
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
    // Render Quz Nav Buttons
    this.renderNavigationButtons();
  }

  renderLeftCol(img) {
    // Implement your rendering logic for the left column
    const leftColEl = document.querySelector(
      "#questionContainer .question__left"
    );
    const qImgEl = document.createElement("img");
    qImgEl.setAttribute("src", img);
    leftColEl.appendChild(qImgEl);
  }

  renderNavigationButtons() {
    const rightColEl = document.querySelector(
      "#questionContainer .question__right"
    );

    // Remove existing navigation buttons
    // Deprecated -> looks like it already gets removed when clearUI is called
    // const existingButtons = document.querySelectorAll(".navigation-button");
    // existingButtons.forEach((button) => button.remove());

    // Add Next or Submit Quiz button based on the current question index
    if (this.currentQuestionIndex === 0) {
      // This is just the beginning of the quiz
      this.createButton(
        "Continue",
        this.submitAnswer.bind(this, this.currentQuestionIndex)
      );
    } else if (this.currentQuestionIndex < this.questions.length - 1) {
      // Quiz still has questions
      this.createButton("Prev", this.prevQuestion.bind(this));
      this.createButton("Next", this.submitAnswer.bind(this, ["m", "n"]));
    } else {
      // Last question in the quiz
      this.createButton("Prev", this.prevQuestion.bind(this));
      this.createButton(
        "Submit Quiz",
        this.submitAnswer.bind(this, ["m", "n"])
      );
    }

    // Add Previous button if not on the first question
    if (this.currentQuestionIndex > 0) {
      // const prevQuest = this.previousQuestion;
      // this.createButton("Previous", prevQuest.bind(this));
    }
  }

  createButton(text, clickHandler) {
    const button = document.createElement("button");
    button.classList.add("navigation-button");
    button.innerText = text;
    button.addEventListener("click", () => {
      console.log("clickHandler");
      clickHandler("fixed value");
    });
    document
      .querySelector("#questionContainer .question__right")
      .appendChild(button);
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.renderQuestion();
    } else {
      // Quiz finished, implement what you want to do after the last question
      console.log("Quiz End!");
    }
  }

  prevQuestion() {
    console.log("prevQuestion()");
  }

  clearUI() {
    console.log("clear ui");
    const rightColEl = document.querySelector(
      "#questionContainer .question__right"
    );
    const leftColEl = document.querySelector(
      "#questionContainer .question__left"
    );

    // clear cols
    rightColEl.innerHTML = "";
    leftColEl.innerHTML = "";
  }

  // Add any other methods or event handlers you need

  // You can add a method to handle the submission of the current question
  submitAnswer(questionIndex, selctedAnswer) {
    console.log("questionIndex", questionIndex);
    console.log("selectedAnswer", selctedAnswer);
    // Implement your logic for handling the submitted answer
    // For example, check if the answer is correct, update score, etc.
    this.answers.push({
      questionIndex,
      selctedAnswer,
    });
    console.log("answers", this.answers);
    // Move to the next question
    this.clearUI();
    this.nextQuestion();
  }
}

// Instantiate the Quiz class with your questions array
const quiz = new Quiz(questions);
