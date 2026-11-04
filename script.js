
/* =========================================================
   IYAMPAYE RIBERT — PORTFOLIO JAVASCRIPT
   Navigation, typing, themes, portfolio filters and forms
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. TYPING ANIMATION
       ===================================================== */

    const typingElement = document.querySelector(".typing");

    if (typingElement && typeof Typed !== "undefined") {
        new Typed(".typing", {
            strings: [
                "Data Scientist",
                "Web Developer",
                "UI/UX Designer",
                "Database Administrator"
            ],
            typeSpeed: 70,
            backSpeed: 40,
            backDelay: 1800,
            loop: true,
            smartBackspace: true
        });
    }


    /* =====================================================
       2. ELEMENT REFERENCES
       ===================================================== */

    const body = document.body;

    const styleSwitcher = document.querySelector(".style-switcher");
    const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");

    const dayNight = document.querySelector(".day-night");

    const aside = document.querySelector(".aside");
    const navTogglerBtn = document.querySelector(".nav-toggler");

    const nav = document.querySelector(".nav");
    const navLinks = nav ? nav.querySelectorAll("a") : [];

    const allSections = document.querySelectorAll(".section");


    /* =====================================================
       3. STYLE SWITCHER
       ===================================================== */

    if (styleSwitcher && styleSwitcherToggle) {

        styleSwitcherToggle.addEventListener("click", function (event) {
            event.stopPropagation();

            styleSwitcher.classList.toggle("open");
        });

        // Close the style switcher when clicking elsewhere
        document.addEventListener("click", function (event) {

            if (
                styleSwitcher.classList.contains("open") &&
                !styleSwitcher.contains(event.target)
            ) {
                styleSwitcher.classList.remove("open");
            }

        });

    }


    /* =====================================================
       4. THEME COLOR SWITCHER
       ===================================================== */

    const alternateStyles = document.querySelectorAll(".alternate-style");

    window.setActiveStyle = function (color) {

        alternateStyles.forEach(function (style) {

            if (color === style.getAttribute("title")) {
                style.removeAttribute("disabled");
            } else {
                style.setAttribute("disabled", "true");
            }

        });

    };


    /* =====================================================
       5. LIGHT AND DARK MODE
       ===================================================== */

    function updateThemeIcon() {

        if (!dayNight) return;

        const icon = dayNight.querySelector("i");

        if (!icon) return;

        if (body.classList.contains("dark")) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }

    }

    // Restore the user's previous theme preference
    try {

        const savedTheme = localStorage.getItem("portfolio-theme");

        if (savedTheme === "dark") {
            body.classList.add("dark");
        } else if (savedTheme === "light") {
            body.classList.remove("dark");
        }

    } catch (error) {
        console.warn("Theme preference could not be restored.");
    }

    updateThemeIcon();

    if (dayNight) {

        dayNight.addEventListener("click", function () {

            body.classList.toggle("dark");

            updateThemeIcon();

            try {
                localStorage.setItem(
                    "portfolio-theme",
                    body.classList.contains("dark") ? "dark" : "light"
                );
            } catch (error) {
                console.warn("Theme preference could not be saved.");
            }

        });

    }


    /* =====================================================
       6. NAVIGATION
       ===================================================== */

    function removeBackSection() {

        allSections.forEach(function (section) {
            section.classList.remove("back-section");
        });

    }

    function showSection(element) {

        const href = element.getAttribute("href");

        if (!href || !href.startsWith("#")) return;

        const targetSection = document.querySelector(href);

        if (!targetSection || !targetSection.classList.contains("section")) {
            return;
        }

        removeBackSection();

        allSections.forEach(function (section) {
            section.classList.remove("active");
        });

        targetSection.classList.add("active");

        // Keep navigation links synchronized
        navLinks.forEach(function (link) {
            link.classList.remove("active");
        });

        element.classList.add("active");

        // Close the mobile navigation after selecting a section
        if (window.innerWidth < 1200) {
            closeSidebar();
        }

        // Close the colour switcher when changing sections
        if (styleSwitcher) {
            styleSwitcher.classList.remove("open");
        }

        // Start the new section from the top
        targetSection.scrollTop = 0;

    }

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const href = this.getAttribute("href");

            // Only handle internal section navigation
            if (!href || !href.startsWith("#")) return;

            const target = document.querySelector(href);

            if (!target || !target.classList.contains("section")) return;

            event.preventDefault();

            showSection(this);

        });

    });


    /* =====================================================
       7. MOBILE SIDEBAR
       ===================================================== */

    function closeSidebar() {

        if (aside) {
            aside.classList.remove("open");
        }

        if (navTogglerBtn) {
            navTogglerBtn.classList.remove("open");
        }

    }

    if (navTogglerBtn && aside) {

        navTogglerBtn.addEventListener("click", function (event) {

            event.stopPropagation();

            if (window.innerWidth < 1200) {

                aside.classList.toggle("open");

                navTogglerBtn.classList.toggle("open");

            }

        });

        // Close the menu when clicking outside it
        document.addEventListener("click", function (event) {

            if (
                window.innerWidth < 1200 &&
                aside.classList.contains("open") &&
                !aside.contains(event.target)
            ) {
                closeSidebar();
            }

        });

        // Close the mobile menu when the screen becomes desktop-sized
        window.addEventListener("resize", function () {

            if (window.innerWidth >= 1200) {
                closeSidebar();
            }

        });

    }


    /* =====================================================
       8. PORTFOLIO FILTERING
       ===================================================== */

    const portfolioContainer = document.querySelector(".portfolio-items");

    const portfolioItems = portfolioContainer
        ? portfolioContainer.querySelectorAll(".portfolio-item")
        : [];

    const filterButtons = document.querySelectorAll(".portfolio-filter .filter-btn");

    if (portfolioContainer && filterButtons.length > 0) {

        filterButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                // Update the selected filter button
                filterButtons.forEach(function (filterButton) {
                    filterButton.classList.remove("active");
                });

                this.classList.add("active");

                const filterValue = this.getAttribute("data-filter") || "all";

                portfolioItems.forEach(function (item) {

                    let shouldShow = false;

                    if (
                        filterValue === "all" ||
                        filterValue === "*" ||
                        filterValue === ".all"
                    ) {

                        shouldShow = true;

                    } else {

                        // Support CSS class filters such as .web or .data
                        try {

                            if (filterValue.startsWith(".")) {
                                shouldShow = item.matches(filterValue);
                            } else {

                                // Also support category names
                                const category = item.getAttribute("data-category");

                                shouldShow =
                                    category === filterValue ||
                                    item.classList.contains(filterValue);

                            }

                        } catch (error) {

                            console.warn("Invalid portfolio filter:", filterValue);

                        }

                    }

                    item.classList.toggle("hidden", !shouldShow);

                });

            });

        });

    }


    /* =====================================================
       9. CONTACT FORM VALIDATION
       ===================================================== */

    const contactForm = document.querySelector(".contact-form form");

    if (contactForm) {

        const formFields = contactForm.querySelectorAll(
            'input:not([type="hidden"]):not([type="submit"]):not([type="button"]), textarea'
        );

        // Ensure visible form fields are validated
        formFields.forEach(function (field) {

            field.required = true;

        });

        contactForm.addEventListener("submit", function (event) {

            let formIsValid = true;

            formFields.forEach(function (field) {

                const value = field.value.trim();

                if (!value) {

                    field.setCustomValidity("Please complete this field.");
                    formIsValid = false;

                } else {

                    field.setCustomValidity("");

                }

            });

            if (!formIsValid || !contactForm.checkValidity()) {

                event.preventDefault();

                contactForm.reportValidity();

                return;

            }

            // Let the existing form action/backend process the submission.
            // Do not display a success message before the server confirms it.

        });

        // Clear validation messages as the user edits fields
        formFields.forEach(function (field) {

            field.addEventListener("input", function () {
                field.setCustomValidity("");
            });

        });

    }


    /* =====================================================
       10. INITIAL NAVIGATION STATE
       ===================================================== */

    if (allSections.length > 0) {

        const activeSection = document.querySelector(".section.active");

        if (!activeSection) {

            allSections[0].classList.add("active");

        }

    }

    // Ensure the navigation has an active link
    if (navLinks.length > 0) {

        const activeLink = nav.querySelector("a.active");

        if (!activeLink) {

            const firstLink = navLinks[0];

            if (firstLink) {
                firstLink.classList.add("active");
            }

        }

    }


    /* =====================================================
       11. INITIALIZATION COMPLETE
       ===================================================== */

    console.log("Portfolio JavaScript initialized successfully.");

});
