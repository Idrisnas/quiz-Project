let questions = [
  {
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Rome", "Berlin"],
    correct: 0,
  },
  {
    question: "Who wrote 'Hamlet'?",
    answers: [
      "Charles Dickens",
      "William Shakespeare",
      "J.K. Rowling",
      "Leo Tolstoy",
    ],
    correct: 1,
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Mars", "Venus", "Jupiter"],
    correct: 1,
  },
  {
    question: "What is the chemical symbol for water?",
    answers: ["O2", "H2O", "CO2", "NaCl"],
    correct: 1,
  },
  {
    question: "What is my name ?",
    answers: ["nas", "paul", "CO2", "NaCl"],
    correct: 0,
  },
  {
    question: "Who is the host of the quiz?",
    answers: ["atlantic school", "Lumen schools", "CO2", "NaCl"],
    correct: 1,
  },
];
let currentQuestionIndex = 0;
let score = 0;
let timer = 120;
let interval;
let totalQuestions = questions.length;




// Async function to add questions
async function addQuestion(question, options, correctAnswer) {
    try {
        // Fetch existing questions from localStorage or initialize an empty array
        const existingQuestions = JSON.parse(localStorage.getItem('quizQuestions')) || [];

        // Add the new question to the array
        existingQuestions.push({
            question: question,
            options: options,
            correctAnswer: correctAnswer,
        });

        // Store the updated questions array in localStorage
        await new Promise((resolve) => {
            localStorage.setItem('quizQuestions', JSON.stringify(existingQuestions));
            resolve();
        });

        console.log('Question added successfully!');
        console.log(questions);
        
    } catch (error) {
        console.error('Error adding question:', error);
    }
}

// Example usage of addQuestion
addQuestion(
    "What is the capital of France?",
    ["Paris", "London", "Berlin", "Rome"],
    "Paris"
);

addQuestion(
    "What is 2 + 2?",
    ["3", "4", "5", "6"],
    "4"
);

