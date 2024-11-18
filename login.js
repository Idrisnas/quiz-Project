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

const submit = document.getElementById("submit");
submit.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("trying to login...");
 
  const schoolNameInput = document.getElementById("schoolName").value;
  const studentNamesInput = document.getElementById("studentNames").value;

  aError.classList.add("hidden");
  bError.classList.add("hidden");
  

  const formData = JSON.parse(localStorage.getItem('formData'))
  if (!formData) {
    console.log("No form data found in localStorage");
    return;
  }

 
  let validLogin = false;
  
  if (schoolNameInput === formData.schoolName && formData.studentNames.includes(studentNamesInput)) {
    validLogin = true;
  }

  if (validLogin) {
    // Login is successful, proceed to the quiz page
    localStorage.setItem("loggedIn", JSON.stringify({ schoolName: schoolNameInput, studentName: studentNamesInput }));

    alert('Login successful! Redirecting to quiz page...');
    window.location.href = 'quiz.html'; 
  } else {
    // Show error if login fails
    if (schoolNameInput !== formData.schoolName) {
      aError.classList.remove("hidden");
    }
    if (!formData.studentNames.includes(studentNamesInput)) {
      bError.classList.remove("hidden");
    }
    console.log('Login failed: Invalid school name or student name.');
    
  }

});

