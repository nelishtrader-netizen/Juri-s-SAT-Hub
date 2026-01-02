// Function to check if elements are in the viewport
function revealElements() {
    const reveals = document.querySelectorAll(".reveal");
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add("active");
        }
    });
}

// Initial check on load and on every scroll
window.addEventListener("scroll", revealElements);
window.addEventListener("load", revealElements);

// Number Counter Animation for Stats
const counters = document.querySelectorAll('.counter');

const runCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / 80; // Speed of counting

    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => runCounter(counter), 25);
    } else {
        counter.innerText = target + "+";
    }
};

// Start counters only when they become visible
const observerOptions = { threshold: 0.5 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

counters.forEach(counter => observer.observe(counter));