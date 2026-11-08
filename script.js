// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// Animated role text
const typedText = document.getElementById("typedText");
const phrases = ["web", "ideas", "technology", "the future"];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typePhrase() {
  const currentPhrase = phrases[phraseIndex];
  typedText.textContent = currentPhrase.slice(0, charIndex);

  if (!deleting && charIndex < currentPhrase.length) {
    charIndex++;
    setTimeout(typePhrase, 100);
  } else if (!deleting) {
    deleting = true;
    setTimeout(typePhrase, 1200);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(typePhrase, 45);
  } else {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typePhrase, 250);
  }
}
typePhrase();

// Reveal sections as they enter the viewport
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form: prepares an email in the visitor's mail app.
// Replace the placeholder address below with your real email address.
const contactForm = document.getElementById("contactForm");
const formHint = document.getElementById("formHint");
const recipientEmail = "sameer44359@gmail.com";

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("visitorName").value.trim();
  const email = document.getElementById("visitorEmail").value.trim();
  const message = document.getElementById("visitorMessage").value.trim();

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  const gmailURL =
  `https://mail.google.com/mail/?view=cm&fs=1` +
  `&to=${encodeURIComponent(recipientEmail)}` +
  `&su=${subject}` +
  `&body=${body}`;

  window.open(gmailURL, "_blank");
});
