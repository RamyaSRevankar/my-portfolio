// Quick Typing Effect for Roles / Capabilities
const textDestination = document.querySelector(".typed-text");
const rolesList = ["Building Modern Web Applications",
    "React Developer",
    "Python Enthusiast",
    "Problem Solver"
];
const typeSpeed = 80;
const eraseSpeed = 40;
const pauseTime = 2000;

let currentWordIndex = 0;
let currentCharIndex = 0;

function runTypingEffect() {
    if (currentCharIndex < rolesList[currentWordIndex].length) {
        textDestination.textContent += rolesList[currentWordIndex].charAt(currentCharIndex);
        currentCharIndex++;
        setTimeout(runTypingEffect, typeSpeed);
    } else {
        setTimeout(runEraseEffect, pauseTime);
    }
}

function runEraseEffect() {
    if (currentCharIndex > 0) {
        textDestination.textContent = rolesList[currentWordIndex].substring(0, currentCharIndex - 1);
        currentCharIndex--;
        setTimeout(runEraseEffect, eraseSpeed);
    } else {
        currentWordIndex = (currentWordIndex + 1) % rolesList.length;
        setTimeout(runTypingEffect, 500);
    }
}

// Start sequence on load
document.addEventListener("DOMContentLoaded", () => {
    if(rolesList.length) setTimeout(runTypingEffect, 500);
});