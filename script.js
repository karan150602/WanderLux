
document.addEventListener("DOMContentLoaded", () => {
  // Scroll animations
  const elements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add("visible"));
  }

  // Rotating destination banner
  const banner = document.getElementById("banner-text");
  if (banner) {
    const slides = [
      "Explore Bali's tropical paradise",
      "Discover the beauty of Japan",
      "Experience the magic of Paris"
    ];
    let index = 0;
    setInterval(() => {
      index = (index + 1) % slides.length;
      banner.textContent = slides[index];
    }, 3500);
  }

  // Trip cost calculator
  const calculator = document.getElementById("trip-form");
  if (calculator) {
    calculator.addEventListener("submit", event => {
      event.preventDefault();

      const destination = document.getElementById("destination").value;
      const travellers = Number(document.getElementById("travellers").value);
      const days = Number(document.getElementById("days").value);
      const style = document.getElementById("style").value;
      const result = document.getElementById("result");

      const rates = {
        Bali: 130,
        Japan: 210,
        Paris: 250,
        Sydney: 180,
        Singapore: 200
      };
      const multipliers = {
        Budget: 0.8,
        Standard: 1,
        Luxury: 1.7
      };

      if (!rates[destination] ||
          !Number.isInteger(travellers) || travellers < 1 ||
          !Number.isInteger(days) || days < 1 ||
          !multipliers[style]) {
        result.textContent = "Please enter valid trip details.";
        return;
      }

      const base = rates[destination] * travellers * days;
      const accommodation = 65 * days;
      const total = Math.round(
        (base + accommodation) * multipliers[style]
      );

      const currency = new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
        maximumFractionDigits: 0
      });

      result.textContent =
        `Estimated cost for ${travellers} traveller(s) to ` +
        `${destination} for ${days} days: ` +
        `${currency.format(total)} – ${style} Travel Package. ` +
        `This is an indicative estimate, not a confirmed quote.`;
    });
  }

  // Appointment and contact form validation
  document.querySelectorAll(".email-form").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const subject = encodeURIComponent(
        form.dataset.subject || "WanderLux Enquiry"
      );

      const message = [...data.entries()]
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");

      const recipient = "YOUR_EMAIL@example.com";

      if (recipient === "YOUR_EMAIL@example.com") {
        alert("Set a real recipient email in script.js before using this form.");
        return;
      }

      window.location.href =
        `mailto:${recipient}?subject=${subject}` +
        `&body=${encodeURIComponent(message)}`;
    });
  });
});
