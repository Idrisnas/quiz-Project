function getDetails() {
    const loggedInData = JSON.parse(localStorage.getItem("loggedIn"));

    if (loggedInData) {
        // Display the school name and student name
        document.getElementById("displaySchoolName").textContent = loggedInData.schoolName;
        document.getElementById("displayStudentName").textContent = loggedInData.studentName;
        return loggedInData.studentName;  // Return the student's name
    } else {
        // If no data is found, redirect to login page
        alert("You are not logged in. Redirecting to login page...");
        window.location.href = "login.html";
    }
}
getDetails()

const questions = [
    { question: "What is the capital of Nigeria?", answers: ["Lagos", "Abuja", "Port Harcourt", "Kano"], correct: 1 },
    { question: "Who was the first president of Nigeria?", answers: ["Olusegun Obasanjo", "Nnamdi Azikiwe", "Yakubu Gowon", "Muhammadu Buhari"], correct: 1 },
    { question: "Which river is the longest in Nigeria?", answers: ["Niger River", "Benue River", "Zambezi River", "Volta River"], correct: 0 },
    { question: "What is the official language of Nigeria?", answers: ["French", "English", "Arabic", "Hausa"], correct: 1 },
    { question: "Which Nigerian state is known as the 'City of Equity'?", answers: ["Enugu", "Kaduna", "Ogun", "Ekiti"], correct: 3 },
    { question: "Who was the Nigerian independence leader and the first Prime Minister?", answers: ["Chukwuemeka Odumegwu Ojukwu", "Ahmadu Bello", "Nnamdi Azikiwe", "Abubakar Tafawa Balewa"], correct: 3 },
    { question: "Which Nigerian city is known for its historical significance in the transatlantic slave trade?", answers: ["Lagos", "Badagry", "Ibadan", "Kano"], correct: 1 },
    { question: "What is Nigeria's national currency?", answers: ["Naira", "Cedi", "Shilling", "Franc"], correct: 0 },
    { question: "Which Nigerian musician is known as 'African Giant'?", answers: ["Wizkid", "Burna Boy", "Davido", "Olamide"], correct: 1 },
    { question: "In what year did Nigeria gain independence?", answers: ["1960", "1957", "1972", "1980"], correct: 0 }
];


let currentQuestionIndex = 0;
let score = 0;
let timer = 120;
let interval;
let totalQuestions = questions.length;

// Shuffle the questions
function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]]; // Swap elements
    }
}

// Start the timer
function countdown() {
    timer--;
    document.getElementById("timer").textContent = `Time Left: ${timer}s`;
    if (timer <= 0) {
        endQuiz(); // End quiz when time runs out
    }
}

// Load a question into the DOM
function loadQuestion() {
    let currentQuestion = questions[currentQuestionIndex];

    // Update question text and answers
    document.getElementById("question").textContent = currentQuestion.question;
    document.getElementById("answer1").textContent = currentQuestion.answers[0];
    document.getElementById("answer2").textContent = currentQuestion.answers[1];
    document.getElementById("answer3").textContent = currentQuestion.answers[2];
    document.getElementById("answer4").textContent = currentQuestion.answers[3];

    // Reset the timer for the entire quiz
    clearInterval(interval); // Clear previous intervals
    interval = setInterval(countdown, 1000); // Start the countdown
}

// Handle the answer submission
function submitAnswer(selectedAnswerIndex, selectedButton) {
    clearInterval(interval); // Stop the timer after answer submission
    let currentQuestion = questions[currentQuestionIndex];

    // Check if the selected answer is correct
    if (selectedAnswerIndex === currentQuestion.correct) {
        score++;
        selectedButton.classList.add('selected'); // Add background color to correct button
    } else {
        selectedButton.classList.add('selected'); // Add background color to the selected answer
    }

    // Disable all answer buttons after selection
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach(button => button.disabled = true);

    // Enable the next button and change its color to green
    const nextBtn = document.getElementById("nextBtn");
    nextBtn.disabled = false;
    nextBtn.classList.remove('next-disabled');
    nextBtn.classList.add('next-active');
}

// Move to the next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion(); // Load the next question
    } else {
        endQuiz(); // End quiz if no questions are left
    }

    // Reset the buttons for the next question
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach(button => {
        button.classList.remove('selected');
        button.disabled = false;
    });

    // Disable the next button again
    const nextBtn = document.getElementById("nextBtn");
    nextBtn.disabled = true;
    nextBtn.classList.remove('next-active');
    nextBtn.classList.add('next-disabled');
}



function endQuiz() {
    clearInterval(interval); // Stop the timer
    let studentName = getDetails();  
    let schoolName = JSON.parse(localStorage.getItem("loggedIn")).schoolName;  

    // Calculate percentage score
    let percentage = (score / totalQuestions) * 100;

    // Save the student's result to localStorage
    const resultData = {
        studentName: studentName,
        schoolName: schoolName,
        score: score,
        percentage: percentage.toFixed(2)
    };

    let allResults = JSON.parse(localStorage.getItem("quizResults")) || [];

    // Push the new result to the array
    allResults.push(resultData);

    // Save  results back to localStorage
    localStorage.setItem("quizResults", JSON.stringify(allResults));


    // Display the result in the alert
    alert(`Congratulations ${studentName}! Quiz ended. Your score is ${score} out of ${totalQuestions} (${percentage.toFixed(0)}%).`);
    window.location.href='result.html'; // Reload the page for a fresh start
}


// Event listeners for the answer buttons
document.getElementById("answer1").addEventListener("click", function () { submitAnswer(0, this); });
document.getElementById("answer2").addEventListener("click", function () { submitAnswer(1, this); });
document.getElementById("answer3").addEventListener("click", function () { submitAnswer(2, this); });
document.getElementById("answer4").addEventListener("click", function () { submitAnswer(3, this); });

// Event listener for the next question button
document.getElementById("nextBtn").addEventListener("click", nextQuestion);

// Event listener for the end quiz button
document.getElementById("endQuizBtn").addEventListener("click", endQuiz);


shuffleQuestions();
loadQuestion();


console.log(JSON.parse(localStorage.getItem("quizResults"))); 
