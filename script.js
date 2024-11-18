// Date and time  deadline
const deadline = new Date("November 1, 2024 11:00:00").getTime();


const countdownElement = document.getElementById('countdown');
const regButton = document.getElementById('regBtn');
const quizButton = document.getElementById('quizBtn');
const lateFeeWarning = document.getElementById('lateFee');
const winnersList = document.getElementById('previousWinners');

//  previous winners
const winners = [
    { school: "Martin-K Academy", name: "Israel Elbar", year: 2023 },
    { school: "Veritas Academy", name: "Miles Brown", year: 2022 },
    { school: "Holmes Academy", name: "Sherlock Holmes", year: 2021 }
];

function displayWinners() {
    winners.forEach(winner => {
        const listItem = document.createElement('li');
        listItem.classList.add('p-2', 'bg-gray-50', 'flex', 'justify-between', 'shadow');
        listItem.innerHTML = `${winner.school}, ${winner.name} <span class="text-green-700">${winner.year}</span>`;
        winnersList.appendChild(listItem);
    });
}

// Countdown function to update time every second
function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = deadline - now;

    if (timeRemaining <= 0) {
        clearInterval(countdownInterval); // Stop the timer
        countdownElement.innerHTML = "Registration Closed";
        lateFeeWarning.classList.remove("hidden");

       
        regButton.style.display = 'none';
        quizButton.style.display = 'none';

        regButton.disabled = true;
        regButton.innerHTML = "Registration Closed";
        
        // quizButton.disabled = true;
    } else {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24)); 
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);

displayWinners();
