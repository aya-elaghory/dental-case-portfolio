
const navToggle = document.getElementById("navToggle");
const navList = document.getElementById("navList");

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    navList.classList.toggle("show");
  });

  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("show");
    });
  });
}


const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.tab;

    tabButtons.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(targetId)?.classList.add("active");
  });
});


const slides = [
  {
    src: null,
    label: "Pre-operative periapical radiograph showing deep caries approaching the pulp.",
  },
  {
    src: null,
    label: "master cone radiograph confirming canal length.",
  },
  {
    src: null,
    label:
      "Final obturation radiograph with canals filled to working length and proper taper.",
  },
  {
    src: null,
    label:
      "Post-operative clinical photograph showing occlusal view after crown.",
  },
];

let currentSlide = 0;
const galleryImg = document.getElementById("galleryImg");
const galleryLabel = document.getElementById("galleryLabel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function updateSlide(index) {
  if (!galleryImg || !galleryLabel) return;

  const slide = slides[index];
  galleryLabel.textContent = slide.label;


  galleryImg.textContent = `Image ${index + 1}`;
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide(currentSlide);
  });

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide(currentSlide);
  });
}


updateSlide(currentSlide);

const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const backToTop = document.getElementById("backToTop");
if (backToTop) {
  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}



const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
      
        entry.target.classList.add("show");
      } else {
        
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.2, 
  }
);

reveals.forEach((el) => observer.observe(el));


const revealElements = document.querySelectorAll(".reveal");

const archesOptions = {
  threshold: 0.25,
};

const archesObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
}, archesOptions);

revealElements.forEach(el => archesObserver.observe(el));

const xrayCards = document.querySelectorAll(".xray-card");

const xrayObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
}, { threshold: 0.2 });

const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusMsg.textContent = "Sending...";

  let data = new FormData(form);

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: data
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      statusMsg.textContent = "Message sent successfully!";
      form.reset();
    } else {
      statusMsg.textContent = "Something went wrong. Please try again.";
    }
  })
  .catch(err => {
    statusMsg.textContent = "Network error. Try again.";
  });
});
