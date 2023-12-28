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
    answerLabelEl.addEventListener("click", handleChoiceLabelClick);
    const answerInputEl = document.createElement("input");
    answerInputEl.setAttribute("type", "radio");
    answerInputEl.setAttribute("name", "answer");
    answerInputEl.setAttribute("id", `answer-${i}`);
    answerInputEl.setAttribute("value", i);
    answerInputEl.addEventListener("click", (e) => {
      e.stopPropagation();
      resetChoiceLabelsClasses();
      const parentLabel = e.target.closest("label");
      if (parentLabel) {
        // Add a new class to the parent label
        parentLabel.classList.add("checked");
        // Your additional logic for the input click event here
        console.log("Input clicked, parent label class added!");
      }
    });
    if (i === question.selectedChoice) {
      answerInputEl.checked = true;
      answerLabelEl.classList.add("checked");
    }
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
function handleChoiceLabelClick(e) {
  console.log("Clicked: ", e.target);
  const nextButton = document.querySelector(".next");
  // Remove checked class
  resetChoiceLabelsClasses();
  // Add .checked to the label
  e.target.classList.add("checked");
  // Add .ready to the next button
  nextButton.classList.add("ready");
}
function resetChoiceLabelsClasses() {
  document
    .querySelectorAll("label.answer")
    .forEach((label) => label.classList.remove("checked"));
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
    console.log(
      "Current Question: ",
      this.questions[this.currentQuestionIndex]
    );
    renderQuestion(this.questions[this.currentQuestionIndex]);
    this.renderNavButtons();
  }

  next() {
    console.log("Next Question!");
    try {
      this.questions[this.currentQuestionIndex].recordAnswer(this.getChecked());
      this.currentQuestionIndex++;
      this.render();
    } catch (err) {
      console.log("Error: ", err);
      alert("Select Answer!");
    }
  }

  prev() {
    console.log("Prev. Question!");
    this.currentQuestionIndex--;
    this.render();
  }

  end() {
    console.log("End Quiz!");
    try {
      this.questions[this.currentQuestionIndex].recordAnswer(this.getChecked());
      console.log(this.questions);
      console.log("Score: ", this.getScore());
    } catch (err) {
      console.log("Error: ", err);
      alert("Select Answer!");
    }
  }

  getScore() {
    console.log("Get Quiz Score!");
    let initialScore = 0;
    return this.questions.reduce((acc, curr) => acc + curr.score, initialScore);
  }

  printQuestions() {
    console.log("Questions: ", this.questions);
  }

  renderNavButtons() {
    if (this.currentQuestionIndex === 0) {
      // first question, render next button only
      this.renderNavButtonsInsideContainer(this.createNextButton());
    } else if (this.currentQuestionIndex < this.questions.length - 1) {
      // mid question, render prev and next button
      this.renderNavButtonsInsideContainer(
        this.createNextButton(),
        this.createPrevButton()
      );
    } else {
      // last question render prev and finish button
      this.renderNavButtonsInsideContainer(
        this.createFinishButton(),
        this.createPrevButton()
      );
    }
  }

  createNextButton() {
    const nextButton = document.createElement("button");
    if (this.currentQuestionIndex === 0) {
      // At the beginning of quiz
      nextButton.innerText = "السؤال التالي";
      nextButton.classList.add("next");
    } else {
      nextButton.innerText = "السؤال التالي";
      nextButton.classList.add("next", "w-60");
    }
    if (
      this.questions[this.currentQuestionIndex].selectedChoice !== undefined
    ) {
      // Add the ready class if the question has a pre-selected choice
      nextButton.classList.add("ready");
    }
    nextButton.addEventListener("click", this.next.bind(this));
    return nextButton;
  }

  createPrevButton() {
    const prevButton = document.createElement("button");
    prevButton.innerText = "السابق";
    prevButton.classList.add("prev", "w-40");
    prevButton.addEventListener("click", this.prev.bind(this));
    return prevButton;
  }

  createFinishButton() {
    const finishButton = document.createElement("button");
    finishButton.innerText = "انهاء الاختبار";
    finishButton.classList.add("next", "w-60");
    finishButton.addEventListener("click", this.end.bind(this));
    return finishButton;
  }

  renderNavButtonsInsideContainer(...navButtons) {
    const navBtnsContainer = document.createElement("div");
    navBtnsContainer.classList.add("actions");
    navButtons.forEach((btn) => navBtnsContainer.appendChild(btn));
    document.querySelector(".question__right").appendChild(navBtnsContainer);
  }

  getChecked() {
    return +document.querySelector('input[name="answer"]:checked').value;
  }
}

// Init App
const quiz = new QuizUI(questions);
quiz.render();
