const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const savedTheme = localStorage.getItem("wispuser-theme");

if (savedTheme === "dark" || (!savedTheme && matchMedia("(prefers-color-scheme: dark)").matches)) {
  root.classList.add("dark");
}

themeToggle.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem("wispuser-theme", root.classList.contains("dark") ? "dark" : "light");
});

const packageButtons = document.querySelectorAll("[data-package]");
const demoSteps = [...document.querySelectorAll("#demoSteps li")];
const demoResult = document.querySelector("#demoResult");
let selectedPackage = "UGX 500 Demo";

packageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    packageButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    selectedPackage = button.dataset.package;
  });
});

document.querySelector("#runDemo").addEventListener("click", () => {
  demoSteps.forEach((step) => step.classList.remove("done"));
  demoResult.classList.remove("failure");
  demoResult.textContent = "Checking payment...";

  demoSteps.forEach((step, index) => {
    setTimeout(() => {
      step.classList.add("done");
      if (index === demoSteps.length - 1) {
        demoResult.textContent = `${selectedPackage}: payment received, voucher generated, connected successfully.`;
      }
    }, index * 280);
  });
});

const customers = document.querySelector("#customers");
const customerCount = document.querySelector("#customerCount");
const hoursSaved = document.querySelector("#hoursSaved");
const valueSaved = document.querySelector("#valueSaved");

function updateCalculator() {
  const count = Number(customers.value);
  const hours = Math.round((count * 8) / 60);
  const value = hours * 15000;
  customerCount.textContent = count.toLocaleString();
  hoursSaved.textContent = hours.toLocaleString();
  valueSaved.textContent = `UGX ${value.toLocaleString()}`;
}

customers.addEventListener("input", updateCalculator);
updateCalculator();
