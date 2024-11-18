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
  console.log("clicked");
  const schoolContact = document.getElementById("schoolContact").value;
  const schoolName = document.getElementById("schoolName").value;
  const studentNamesInput = document.getElementById("studentNames").value;

  aError.classList.add("hidden");
  bError.classList.add("hidden");
  cError.classList.add("hidden");
  let valid = true;
  if (!schoolName || !studentNamesInput || !schoolContact) {
    valid = false;

    if (!schoolName) aError.classList.remove("hidden");
    if (!studentNamesInput) bError.classList.remove("hidden");
    if (!schoolContact) cError.classList.remove("hidden");
  }

  if (!valid) {
    console.log("Form validation failed.");
    return;
  }

  const studentNames = studentNamesInput.split(',').map(name => name.trim()); 
   
  const formData = {
    schoolName: schoolName,
    studentNames:  studentNamesInput.split(',').map(name => name.trim()),
    schoolContact: schoolContact,
  }
  localStorage.setItem('formData', JSON.stringify(formData))
  alert("Form Submitted succesfully Congratulations...");
  window.location.href = "login.html";
  console.log("Form is valid");
});
