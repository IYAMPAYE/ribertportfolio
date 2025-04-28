// Typing Animation
const typing = new Typed(".typing", {
    strings: ["Data Scientist", "Web Developer", "UI/UX Designer", "Database Administrator"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

// Theme Switcher
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
});

// Theme Colors
const alternateStyles = document.querySelectorAll(".alternate-style");
function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
        if(color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        }
        else {
            style.setAttribute("disabled", "true");
        }
    });
}

// Theme Light and Dark Mode
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark");
});
window.addEventListener("load", () => {
    if(document.body.classList.contains("dark")) {
        dayNight.querySelector("i").classList.add("fa-sun");
    }
    else {
        dayNight.querySelector("i").classList.add("fa-moon");
    }
});

// Navigation Functionality
const nav = document.querySelector(".nav"),
      navList = nav.querySelectorAll("li"),
      totalNavList = navList.length,
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {
        removeBackSection();
        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) {
                addBackSection(j);
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        showSection(this);
        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    });
}

function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-section");
    }
}

function addBackSection(num) {
    allSection[num].classList.add("back-section");
}

function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    const targetSection = document.querySelector("#" + target);
    targetSection.classList.add("active");

    // If portfolio section is shown, ensure items are visible
    if (target === 'portfolio') {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.style.display = 'block';
            item.style.opacity = '1';
        });
        
        // Reinitialize Isotope if needed
        if (portfolioContainer) {
            const iso = new Isotope(portfolioContainer, {
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows',
                filter: '*'
            });
            iso.arrange({ filter: '*' });
            iso.layout();
        }
    }
}

const navTogglerBtn = document.querySelector(".nav-toggler"),
      aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", asideSectionTogglerBtn);

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
}

// Add event listener to close sidebar when clicking outside
document.addEventListener('click', (e) => {
    const aside = document.querySelector('.aside');
    const navToggler = document.querySelector('.nav-toggler');
    
    if (window.innerWidth < 1200 && 
        aside.classList.contains('open') && 
        !aside.contains(e.target) && 
        e.target !== navToggler) {
        asideSectionTogglerBtn();
    }
});

// Portfolio Filtering
const portfolioContainer = document.querySelector('.portfolio-items');
if (portfolioContainer) {
    // Initialize Isotope with a delay to ensure DOM is ready
    setTimeout(() => {
        const iso = new Isotope(portfolioContainer, {
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows',
            filter: '*'
        });

        // Force show all items initially
        iso.arrange({ filter: '*' });
        iso.layout();

        // Make sure all portfolio items are visible
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.style.display = 'block';
            item.style.opacity = '1';
        });

        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                iso.arrange({ filter: filterValue });
            });
        });
    }, 100);
}

// GSAP Animations
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate portfolio items
    gsap.utils.toArray('.portfolio-item').forEach(item => {
        gsap.from(item, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: item,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animate filter buttons
    gsap.from('.filter-btn', {
        y: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
    });
}

// Initialize AOS
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

// Contact Form Validation and Submission
function validateForm() {
    const form = document.querySelector('.contact-form form');
    const name = form.querySelector('input[name="entry.XXXXXXXX"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const subject = form.querySelector('input[name="entry.XXXXXXXX"]').value;
    const message = form.querySelector('textarea').value;

    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return false;
    }

    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    return true;
}
