/* ========= Typewriter (no vendor CSS needed) ========= */
const typedTarget = document.getElementById("typed");
const phrases = [
  "Junior Software Developer",
  "Full-Stack Enthusiast",
  "Clean Code. Smooth UX. 🚀"
];
let phraseIndex = 0;
let charIndex = 0;
let typing = true;

function typeLoop() {
  const current = phrases[phraseIndex];
  if (typing) {
    typedTarget.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      typing = false;
      setTimeout(typeLoop, 1200);
      return;
    }
  } else {
    typedTarget.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      typing = true;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, typing ? 60 : 35);
}
if (typedTarget) typeLoop();

/* ========= Bootstrap ScrollSpy (native active link) ========= */
const scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: "#mainNav",
  offset: 80
});

/* ========= EmailJS (safe, error-free guard) =========
   1) Create an account at https://www.emailjs.com
   2) Make a service & template
   3) Replace the constants below
   Works without runtime errors if left as-is (shows alert instead).
*/
const EMAILJS_PUBLIC_KEY  = "";          // e.g. "XyZ123ABC..."
const EMAILJS_SERVICE_ID  = "";          // e.g. "service_abcd123"
const EMAILJS_TEMPLATE_ID = "";          // e.g. "template_efgh456"

if (typeof emailjs !== "undefined" && EMAILJS_PUBLIC_KEY) {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

const form = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Guard if keys not set
  if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
    alert("Form is set up, but EmailJS keys are not configured yet. Open script.js and add your EmailJS Public Key, Service ID, and Template ID.");
    form.reset();
    return;
  }

  try {
    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";

    await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, "#contactForm");

    alert("Thanks! Your message was sent successfully.");
    form.reset();
  } catch (err) {
    console.error(err);
    alert("Sorry, there was a problem sending your message. Please try again.");
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "Send Message";
  }
});
