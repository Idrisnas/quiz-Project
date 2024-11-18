const allResults = JSON.parse(localStorage.getItem("quizResults")) || [];

const resultsList = document.getElementById("resultsList");
const showWinnerBtn = document.getElementById("showWinnerBtn");
const winnerModal = document.getElementById("winnerModal");
const winnerMessage = document.getElementById("winnerMessage");
const closeModalBtn = document.getElementById("closeModalBtn");

if (allResults.length > 0) {
    allResults.forEach(result => {
        const listItem = document.createElement('li');
        listItem.classList.add('p-4', 'bg-gray-50', 'text-xl', 'rounded', 'shadow');
        listItem.innerHTML = `${result.schoolName}, ${result.studentName}: <span class="font-bold">${result.percentage}%</span>`;
        resultsList.appendChild(listItem);
    });
} else {
    const noResultsMessage = document.createElement('li');
    noResultsMessage.classList.add('p-4', 'bg-gray-50', 'rounded', 'shadow');
    noResultsMessage.textContent = 'No quiz results available.';
    resultsList.appendChild(noResultsMessage);
}

// Function to get the highest score and return all students who have that score
function getTopStudents() {
    if (allResults.length === 0) return []; // No results

    // Find the maximum score
    const maxScore = Math.max(...allResults.map(result => parseFloat(result.percentage)));

    // Get all students who have that maximum score
    const topStudents = allResults.filter(result => parseFloat(result.percentage) === maxScore);

    return topStudents;
}

// Function to show the winner(s) in the modal
function showWinner() {
    const topStudents = getTopStudents();

    if (topStudents.length > 0) {
        // If we have one or more top students, show them all
        const topStudentsNames = topStudents.map(student => `${student.studentName} from ${student.schoolName}`).join(", ");
        winnerMessage.textContent = `The winner(s) of the 2024 Lumen Veritas quiz compitition: ${topStudentsNames} with a score of ${topStudents[0].percentage}%!`;
        winnerModal.classList.remove("hidden");
    } else {
        alert("No results to display.");
    }

    console.log("Top students:", topStudents);
}

showWinnerBtn.addEventListener('click', showWinner);

closeModalBtn.addEventListener('click', () => {
    winnerModal.classList.add("hidden");
});


const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenuBtn = document.getElementById("closeMenuBtn");

// Toggle mobile menu on hamburger button click
hamburgerBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

// Close the mobile menu when the close button is clicked
closeMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
});