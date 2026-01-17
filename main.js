
const text =
  "Minerva Foundation is a nonprofit organization dedicated to expanding educational access for underprivileged children in rural communities. We believe education is the foundation for long-term change.";

let index = 0;
const speed = 40;
const typeTarget = document.getElementById("typewriter");

function typeWriter() {
  if (index < text.length) {
    typeTarget.textContent += text.charAt(index);
    index++;
    setTimeout(typeWriter, speed);
  }
}
typeWriter();


const counters = document.querySelectorAll(".number");

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText;
    const increment = target / 100;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCount, 30);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
});


document.getElementById("missionBtn").addEventListener("click", () => {
  document.getElementById("values").classList.toggle("hidden");
});
