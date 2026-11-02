/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('show')
            toggle.setAttribute('aria-expanded', String(isOpen))
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*===== ROTATING HERO ROLE =====*/
const homeRole = document.getElementById("home-role");
const roleOptions = ["Web Developer", "IT Support"];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (homeRole && !prefersReducedMotion.matches) {
    let roleIndex = 0;

    window.setInterval(() => {
        homeRole.classList.add("is-changing");

        window.setTimeout(() => {
            roleIndex = (roleIndex + 1) % roleOptions.length;
            homeRole.textContent = roleOptions[roleIndex];
            homeRole.classList.remove("is-changing");
        }, 250);
    }, 3500);
}

/*===== PROJECT DETAILS =====*/
const projectDialog = document.getElementById("project-dialog");
const projectCatalog = {
    simarsip: {
        title: "SIMARSIP",
        role: "Backend Development",
        description: "A digital archive management system built for Malang City's Population and Civil Registration Service.",
        highlights: [
            "Developed backend and API functionality as part of a four-person team.",
            "Used Laravel and JavaScript for API development, database management, and web security.",
            "Contributed to more efficient archive management and on-time project delivery."
        ],
        stack: ["Laravel", "JavaScript", "API Development", "Database Management"]
    },
    "ruang-edukasi": {
        title: "Ruang Edukasi",
        role: "Backend Development",
        description: "Backend work for a Massive Open Online Course (MOOC) learning platform.",
        highlights: [
            "Organized API development and managed data and server operations.",
            "Collaborated with the Front-End Engineering team to create API endpoints for app features."
        ],
        stack: ["Backend", "API", "Data Integration", "Server Management"]
    },
    sicafe: {
        title: "SiCafe",
        role: "Full-stack Development",
        description: "A café website developed across the frontend and backend.",
        highlights: [
            "Contributed to the frontend and backend implementation of the café website."
        ],
        stack: ["Full-stack", "Web Development"]
    },
    "weather-app": {
        title: "weatherApp",
        role: "Backend JavaScript",
        description: "A weather application with JavaScript-based backend functionality.",
        highlights: [
            "Built JavaScript backend functionality for the weather application."
        ],
        stack: ["JavaScript", "Backend"]
    },
    "money-management": {
        title: "Money Management Web",
        role: "Laravel Project",
        description: "A Laravel project focused on personal finance management.",
        highlights: [
            "Developed the project as a Laravel-based web application for managing personal finances."
        ],
        stack: ["Laravel", "Finance Web App"]
    },
    kebudayaan: {
        title: "Kebudayaan Web",
        role: "Frontend Project",
        description: "A frontend website presenting Indonesian cultural content.",
        highlights: [
            "Built the website interface to showcase cultural content."
        ],
        stack: ["Frontend", "Cultural Content"]
    }
};

if (projectDialog) {
    const title = document.getElementById("project-dialog-title");
    const role = document.getElementById("project-dialog-role");
    const description = document.getElementById("project-dialog-description");
    const highlights = document.getElementById("project-dialog-highlights");
    const stack = document.getElementById("project-dialog-stack");
    let projectScrollPosition = 0;

    document.querySelectorAll(".work__card").forEach((card) => {
        card.addEventListener("click", () => {
            const project = projectCatalog[card.dataset.project];
            if (!project) return;

            projectScrollPosition = window.scrollY;
            title.textContent = project.title;
            role.textContent = project.role;
            description.textContent = project.description;
            highlights.replaceChildren(...project.highlights.map((item) => {
                const listItem = document.createElement("li");
                listItem.textContent = item;
                return listItem;
            }));
            stack.replaceChildren(...project.stack.map((item) => {
                const badge = document.createElement("span");
                badge.textContent = item;
                return badge;
            }));
            projectDialog.showModal();
            window.requestAnimationFrame(() => window.scrollTo({ top: projectScrollPosition, left: 0, behavior: "auto" }));
        });
    });

    projectDialog.addEventListener("close", () => {
        window.scrollTo({ top: projectScrollPosition, left: 0, behavior: "auto" });
    });
    projectDialog.querySelector(".project-dialog__close").addEventListener("click", () => projectDialog.close());
    projectDialog.addEventListener("click", (event) => {
        if (event.target === projectDialog) projectDialog.close();
    });
}

    /*========== DARK MODE ==========*/
const darkToggle = document.getElementById("dark-toggle");

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const themeStorageKey = "theme-preference";
let selectedTheme = localStorage.getItem(themeStorageKey) || "system";

const setTheme = (mode) => {
    const isDark = mode === "system" ? systemTheme.matches : mode === "dark";
    document.body.classList.toggle("dark-mode", isDark);
    if (!darkToggle) return;

    const icon = mode === "system" ? "fa-circle-half-stroke" : isDark ? "fa-moon" : "fa-sun";
    const label = mode === "system" ? "Tema perangkat" : isDark ? "Mode gelap" : "Mode terang";
    darkToggle.innerHTML = `<i class="fas ${icon}" aria-hidden="true"></i>`;
    darkToggle.setAttribute("aria-pressed", String(mode !== "system"));
    darkToggle.setAttribute("aria-label", `${label}. Klik untuk mengganti tema.`);
    darkToggle.title = `${label} · klik untuk mengganti`;
};

setTheme(selectedTheme);

systemTheme.addEventListener("change", () => {
    if (selectedTheme === "system") setTheme("system");
});

if (darkToggle) {
    darkToggle.addEventListener("click", () => {
        selectedTheme = selectedTheme === "system"
            ? "light"
            : selectedTheme === "light" ? "dark" : "system";

        if (selectedTheme === "system") localStorage.removeItem(themeStorageKey);
        else localStorage.setItem(themeStorageKey, selectedTheme);

        setTheme(selectedTheme);
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
        // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    //     reset: true
});



sr.reveal('.home__data, .about__img, .skills__intro', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .about__info, .skills__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skill-tile, .work__img, .contact-cta__content, .footer__container, .resume-container', { interval: 80 });
