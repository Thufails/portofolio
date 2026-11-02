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



sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .about__info, .skills__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .work__img, .contact-cta__content, .footer__container, .resume-container', { interval: 200 });
