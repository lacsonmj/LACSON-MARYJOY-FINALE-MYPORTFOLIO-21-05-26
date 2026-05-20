// ================= ACTIVE NAVIGATION (SCROLL SPY) =================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

function setActiveNav() {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            current = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${current}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", setActiveNav, { passive: true });


// ================= SCROLL ANIMATION =================

const cards = document.querySelectorAll(
    ".project-card, .skill-card, .testimonial-card, .update-card, .mini-card"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
}


// ================= SEARCH SYSTEM =================

const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", searchSite);
}

function searchSite() {
    let filter = searchInput.value.toLowerCase().trim();

    // 1. Scroll to matching section title
    const sections = document.querySelectorAll("section");
    let matchedSection = null;

    sections.forEach((section) => {
        const title = section.querySelector("h1, h2");

        if (title && title.innerText.toLowerCase().includes(filter)) {
            matchedSection = section;
        }
    });

    if (matchedSection && filter !== "") {
        matchedSection.scrollIntoView({ behavior: "smooth" });
    }

    // 2. Filter cards
    let items = document.querySelectorAll(
        ".update-card, .project-card, .skill-card, .testimonial-card, .mini-card"
    );

    items.forEach((item) => {
        let text = item.innerText.toLowerCase();

        if (filter === "" || text.includes(filter)) {
            item.style.display = "";
            item.classList.add("show");
        } else {
            item.style.display = "none";
        }
    });
}


// ================= SMOOTH SCROLL FUNCTION =================

function scrollToSection(id) {
    const section = document.getElementById(id);

    if (section) {
        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}


// ================= CONTACT FORM (NO PAGE RELOAD / NO SCROLL JUMP) =================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        alert("Message sent successfully!");

        this.reset();
    });
}


// ================= STOP SCROLL RESET ON REFRESH =================

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}


// ================= OPTIONAL: FORCE NAV UPDATE ON LOAD =================

window.addEventListener("load", setActiveNav);