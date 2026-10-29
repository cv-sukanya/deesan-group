
document.addEventListener("DOMContentLoaded", function () {

    const hero = document.querySelector(".hero-slide");

    const slides = [
        {
            desktopImage: "assets/images/banner-1.jpg",
            mobileImage: "assets/images/banner-mobile-1.jpg",
            title: "Designed to express",
            text: "We modulate designs by hearing your desires. Floors for every me & you."
        },
        {
            desktopImage: "assets/images/banner-2.jpg",
            mobileImage: "assets/images/banner-mobile-2.jpg",
            title: "Made for modern living",
            text: "Beautiful spaces created with thoughtful design and innovation."
        },
        {
            desktopImage: "assets/images/banner-3.jpg",
            mobileImage: "assets/images/banner-mobile-3.jpg",
            title: "Style that feels like home",
            text: "Bring warmth, character and personality into every space."
        }
    ];

    const title = document.querySelector(".hero-content h1");
    const text = document.querySelector(".hero-content p");
    const dots = document.querySelectorAll(".slider-dots button");
    const prev = document.querySelector(".slider-prev");
    const next = document.querySelector(".slider-next");

    let currentSlide = 0;
    let autoSlide;

    // Select the correct image for the current screen
    function getImage(slide) {
        const isMobile = window.matchMedia("(max-width: 767px)").matches;

        return isMobile
            ? slide.mobileImage
            : slide.desktopImage;
    }

    // Change slide
    function changeSlide(index) {
        currentSlide = (index + slides.length) % slides.length;

        const slide = slides[currentSlide];

        hero.style.backgroundImage = `url("${getImage(slide)}")`;

        title.textContent = slide.title;
        text.textContent = slide.text;

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentSlide);
        });
    }

    // Reset autoplay after manual navigation
    function resetAutoplay() {
        clearInterval(autoSlide);

        autoSlide = setInterval(function () {
            changeSlide(currentSlide + 1);
        }, 6000);
    }

    // Previous slide
    prev.addEventListener("click", function () {
        changeSlide(currentSlide - 1);
        resetAutoplay();
    });

    // Next slide
    next.addEventListener("click", function () {
        changeSlide(currentSlide + 1);
        resetAutoplay();
    });

    // Click slider dots
    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            changeSlide(index);
            resetAutoplay();
        });
    });

    // Update image when switching between mobile and desktop widths
    let wasMobile = window.matchMedia("(max-width: 767px)").matches;

    window.addEventListener("resize", function () {
        const isMobile = window.matchMedia("(max-width: 767px)").matches;

        if (isMobile !== wasMobile) {
            wasMobile = isMobile;
            changeSlide(currentSlide);
        }
    });

    // Show first slide immediately
    changeSlide(0);

    // Start autoplay
    resetAutoplay();


    // Card
    const cards = document.querySelectorAll(".highlight-card");

    const cardObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    cards.forEach((card, index) => {
        card.style.transitionDelay = `${(index % 3) * 100}ms`;
        cardObserver.observe(card);
    });

});


// Homepage - Company stats


document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".company-stats-carousel");
    const viewport = document.querySelector(".company-stats-viewport");
    const track = document.querySelector(".company-stats");
    const prevBtn = document.querySelector(".stats-prev");
    const nextBtn = document.querySelector(".stats-next");

    if (!carousel || !viewport || !track || !prevBtn || !nextBtn) return;

    const cards = Array.from(track.querySelectorAll(".stat-item"));
    if (cards.length < 2) return;

    let currentIndex = 0;
    let autoScroll;
    let paused = false;

    function getVisibleCount() {
        if (window.innerWidth <= 575) return 1;
        if (window.innerWidth <= 991) return 3;
        return 5;
    }

    function getMaxIndex() {
        return Math.max(0, cards.length - getVisibleCount());
    }

    function updateCarousel() {
        const cardWidth = cards[0].getBoundingClientRect().width;
        const maxIndex = getMaxIndex();

        // Wrap to the first position after the last slide.
        if (currentIndex > maxIndex) currentIndex = 0;
        if (currentIndex < 0) currentIndex = maxIndex;

        track.style.transform =
            `translateX(-${currentIndex * cardWidth}px)`;
    }

    function nextSlide() {
        currentIndex++;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex--;
        updateCarousel();
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
    }

    function startAutoScroll() {
        stopAutoScroll();

        if (paused || window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches) return;

        if (cards.length > getVisibleCount()) {
            autoScroll = setInterval(nextSlide, 4000);
        }
    }

    nextBtn.addEventListener("click", function () {
        nextSlide();
        startAutoScroll();
    });

    prevBtn.addEventListener("click", function () {
        prevSlide();
        startAutoScroll();
    });

    carousel.addEventListener("mouseenter", function () {
        paused = true;
        stopAutoScroll();
    });

    carousel.addEventListener("mouseleave", function () {
        paused = false;
        startAutoScroll();
    });

    carousel.addEventListener("focusin", function () {
        paused = true;
        stopAutoScroll();
    });

    carousel.addEventListener("focusout", function (event) {
        if (!carousel.contains(event.relatedTarget)) {
            paused = false;
            startAutoScroll();
        }
    });

    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            stopAutoScroll();
        } else {
            startAutoScroll();
        }
    });

    window.addEventListener("resize", function () {
        currentIndex = Math.min(currentIndex, getMaxIndex());
        updateCarousel();
        startAutoScroll();
    });

    updateCarousel();
    startAutoScroll();
});


// Business card carousel
const businessesTrack = document.getElementById("businessesTrack");
const businessesPrev = document.getElementById("businessesPrev");
const businessesNext = document.getElementById("businessesNext");

if (businessesTrack && businessesPrev && businessesNext) {

    function getScrollAmount() {
        const card = businessesTrack.querySelector(".business-card");

        if (!card) return businessesTrack.clientWidth;

        const styles = window.getComputedStyle(businessesTrack);
        const gap = parseFloat(styles.columnGap) || 0;

        return card.getBoundingClientRect().width + gap;
    }

    function updateBusinessArrows() {
        const maxScroll =
            businessesTrack.scrollWidth - businessesTrack.clientWidth;

        businessesPrev.disabled = businessesTrack.scrollLeft <= 2;
        businessesNext.disabled =
            businessesTrack.scrollLeft >= maxScroll - 2;

        businessesPrev.style.visibility =
            maxScroll <= 2 ? "hidden" : "visible";

        businessesNext.style.visibility =
            maxScroll <= 2 ? "hidden" : "visible";
    }

    businessesNext.addEventListener("click", function () {
        businessesTrack.scrollBy({
            left: getScrollAmount(),
            behavior: "smooth"
        });
    });

    businessesPrev.addEventListener("click", function () {
        businessesTrack.scrollBy({
            left: -getScrollAmount(),
            behavior: "smooth"
        });
    });

    businessesTrack.addEventListener("scroll", updateBusinessArrows, {
        passive: true
    });

    window.addEventListener("resize", updateBusinessArrows);

    // Recalculate after images load
    businessesTrack.querySelectorAll("img").forEach(function (img) {
        img.addEventListener("load", updateBusinessArrows);
    });

    updateBusinessArrows();
}


// Our innovation

const innovationData = [
    {
        image: "assets/images/innovation-baby.jpg",
        imageAlt: "Baby resting on soft cotton bedding",
        logo: "assets/images/hygrocotton-logo.png",
        logoAlt: "Hygrocotton",
        description:
            "Start every day brighter and better with our Innovative Hygrocotton® technology, which makes sheets softer and temperature regulated, and makes towels softer, fluffier, wash after wash.",
        link: "#"
    },
    {
        image: "assets/images/innovation-weltrak.jpg",
        imageAlt: "Wel-Trak textile innovation",
        logo: "assets/images/weltrak-logo.png",
        logoAlt: "Wel-Trak",
        description:
            "Discover Wel-Trak, our innovative solution designed to improve comfort, performance and everyday textile experiences.",
        link: "#"
    }
];

const innovationTabs = document.querySelectorAll(".innovation-tab");
const innovationImage = document.getElementById("innovationImage");
const innovationLogo = document.getElementById("innovationLogo");
const innovationDescription = document.getElementById("innovationDescription");
const innovationLink = document.getElementById("innovationLink");

innovationTabs.forEach((tab, index) => {
    tab.addEventListener("click", function () {
        const item = innovationData[index];

        if (!item) return;

        innovationTabs.forEach((button) => {
            button.classList.remove("active");
        });

        tab.classList.add("active");

        innovationImage.src = item.image;
        innovationImage.alt = item.imageAlt;

        innovationLogo.src = item.logo;
        innovationLogo.alt = item.logoAlt;

        innovationDescription.textContent = item.description;
        innovationLink.href = item.link;
    });
});


// BRAND PORTFOLIO

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".brand-track");
    const wrapper = document.querySelector(".brand-track-wrapper");
    const prevBtn = document.querySelector(".brand-prev");
    const nextBtn = document.querySelector(".brand-next");
    const progressContainer = document.querySelector(".brand-progress");

    if (!track || !wrapper || !prevBtn || !nextBtn || !progressContainer) {
        return;
    }

    const originalCards = Array.from(track.querySelectorAll(".brand-card"));
    if (!originalCards.length) return;

    let currentIndex = 0;
    let autoScroll = null;
    let isPaused = false;
    let isAnimating = false;

    // Create one progress bar per original card
    progressContainer.innerHTML = "";

    originalCards.forEach((card, index) => {
        const bar = document.createElement("span");
        bar.setAttribute("role", "button");
        bar.setAttribute("tabindex", "0");
        bar.setAttribute("aria-label", `Go to brand ${index + 1}`);

        bar.addEventListener("click", () => goToSlide(index));
        bar.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                goToSlide(index);
            }
        });

        progressContainer.appendChild(bar);
    });

    const indicators = Array.from(progressContainer.children);

    // Clone cards so the slider can wrap seamlessly
    track.querySelectorAll(".brand-card.clone").forEach(card => card.remove());

    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add("clone");
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
    });

    function getStep() {
        const cardWidth = originalCards[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return cardWidth + gap;
    }

    function updateBars() {
        indicators.forEach((bar, index) => {
            const active = index === currentIndex;
            bar.classList.toggle("active", active);
            bar.setAttribute("aria-current", active ? "true" : "false");
        });
    }

    function moveTrack(animate = true) {
        track.style.transition = animate ? "transform 0.5s ease" : "none";
        track.style.transform = `translateX(-${currentIndex * getStep()}px)`;
        updateBars();
    }

    function goToSlide(index) {
        if (isAnimating) return;

        currentIndex = (index + originalCards.length) % originalCards.length;
        moveTrack(true);
        restartAutoScroll();
    }

    function nextSlide() {
        if (isAnimating) return;

        isAnimating = true;
        currentIndex++;
        moveTrack(true);

        track.addEventListener("transitionend", function handleTransition() {
            track.removeEventListener("transitionend", handleTransition);

            if (currentIndex >= originalCards.length) {
                currentIndex = 0;
                moveTrack(false);
                track.offsetHeight; // Apply the reset without animation
            }

            isAnimating = false;
        }, { once: true });

        updateBarsForNext();
    }

    function updateBarsForNext() {
        const activeIndex = currentIndex % originalCards.length;

        indicators.forEach((bar, index) => {
            const active = index === activeIndex;
            bar.classList.toggle("active", active);
            bar.setAttribute("aria-current", active ? "true" : "false");
        });
    }

    function prevSlide() {
        if (isAnimating) return;

        if (currentIndex === 0) {
            currentIndex = originalCards.length;
            moveTrack(false);
            track.offsetHeight;
        }

        isAnimating = true;
        currentIndex--;
        moveTrack(true);

        track.addEventListener("transitionend", function handleTransition() {
            track.removeEventListener("transitionend", handleTransition);
            isAnimating = false;
        }, { once: true });

        updateBarsForNext();
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
        autoScroll = null;
    }

    function startAutoScroll() {
        stopAutoScroll();
        if (isPaused || originalCards.length <= 1) return;

        autoScroll = setInterval(nextSlide, 3000);
    }

    function restartAutoScroll() {
        startAutoScroll();
    }

    nextBtn.addEventListener("click", () => {
        nextSlide();
        restartAutoScroll();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        restartAutoScroll();
    });

    wrapper.addEventListener("mouseenter", () => {
        isPaused = true;
        stopAutoScroll();
    });

    wrapper.addEventListener("mouseleave", () => {
        isPaused = false;
        startAutoScroll();
    });

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopAutoScroll();
        } else {
            startAutoScroll();
        }
    });

    window.addEventListener("resize", () => {
        moveTrack(false);
    });

    moveTrack(false);
    startAutoScroll();
});




document.addEventListener("DOMContentLoaded", () => {
    const image = document.getElementById("sustainable-image");
    const title = document.getElementById("sustainable-title");
    const titleIcon = document.getElementById("sustainable-title-icon");
    const logosContainer = document.getElementById("sustainable-logos");
    const nodes = Array.from(
        document.querySelectorAll(".circle-node[data-project]")
    );

    if (!image || !title || !logosContainer || !nodes.length) return;

    // Replace image and logo paths with your actual project assets.
    const projects = [
        {
            title: "Title 1",
            image: "assets/images/banner-1.jpg",
            alt: "Sustainable manufacturing operations",
            icon: "♧",
            logos: [
                {
                    src: "assets/images/manufacturing-logo-1.png",
                    alt: "logo"
                },
                {
                    src: "assets/images/manufacturing-logo-2.png",
                    alt: "logo"
                }
            ]
        },
        {
            title: "Title 2",
            image: "assets/images/banner-2.jpg",
            alt: "Cargo ship carrying shipping containers",
            icon: "▤",
            logos: [
                {
                    src: "assets/images/supply-chain-logo.png",
                    alt: "logo"
                }
            ]
        },
        {
            title: "Title 3",
            image: "assets/images/banner-3.jpg",
            alt: "Woman working at a textile weaving loom",
            icon: "↻",
            logos: [
                {
                    src: "assets/images/spun-logo.png",
                    alt: "logo"
                },
                {
                    src: "assets/images/ico-logo.png",
                    alt: "logo"
                },
                {
                    src: "assets/images/fashion-for-good-logo.png",
                    alt: "logo"
                }
            ]
        },
        {
            title: "Title 4",
            image: "assets/images/banner-4.jpg",
            alt: "Cotton farming and sustainable sourcing",
            icon: "♧",
            logos: [
                {
                    src: "assets/images/cotton-logo-1.png",
                    alt: "logo"
                },
                {
                    src: "assets/images/cotton-logo-2.png",
                    alt: "logo"
                }
            ]
        }
    ];

    let currentProject = 0;
    let autoPlayTimer;
    let transitionTimer;
    let isPaused = false;
    let isChanging = false;
    const interval = 4500;

    function updateActiveNode(index) {
        nodes.forEach((node) => {
            const active = Number(node.dataset.project) === index;

            node.classList.toggle("active", active);
            node.setAttribute("aria-pressed", String(active));
        });
    }

    function updateLogos(logos) {
        logosContainer.replaceChildren();

        logos.forEach((logo) => {
            const img = document.createElement("img");
            img.src = logo.src;
            img.alt = logo.alt;
            img.loading = "eager";
            logosContainer.appendChild(img);
        });
    }

    function showProject(index, animate = true) {
        if (isChanging) return;

        currentProject = (index + projects.length) % projects.length;
        const project = projects[currentProject];

        isChanging = true;
        clearTimeout(transitionTimer);

        updateActiveNode(currentProject);

        if (animate) {
            image.classList.add("is-changing");
            title.classList.add("is-changing");

            transitionTimer = setTimeout(() => {
                applyProject(project);
            }, 250);
        } else {
            applyProject(project);
        }
    }

    function applyProject(project) {
        title.textContent = project.title;
        image.alt = project.alt;
        image.src = project.image;

        if (titleIcon) {
            titleIcon.textContent = project.icon;
        }

        updateLogos(project.logos);

        image.onload = () => {
            image.classList.remove("is-changing");
            title.classList.remove("is-changing");
            isChanging = false;
        };

        image.onerror = () => {
            image.classList.remove("is-changing");
            title.classList.remove("is-changing");
            isChanging = false;
            console.error("Could not load project image:", project.image);
        };

        // Handle an image already available in the browser cache.
        if (image.complete && image.naturalWidth > 0) {
            image.classList.remove("is-changing");
            title.classList.remove("is-changing");
            isChanging = false;
        }
    }

    function nextProject() {
        showProject(currentProject + 1);
    }

    function startAutoPlay() {
        clearInterval(autoPlayTimer);

        if (isPaused || projects.length <= 1) return;

        autoPlayTimer = setInterval(() => {
            nextProject();
        }, interval);
    }

    function restartAutoPlay() {
        startAutoPlay();
    }

    // Make each circular icon clickable.
    nodes.forEach((node) => {
        node.addEventListener("click", () => {
            showProject(Number(node.dataset.project));
            restartAutoPlay();
        });
    });

    // Pause while the user interacts with the diagram.
    const diagram = document.querySelector(".circular-diagram");

    if (diagram) {
        diagram.addEventListener("mouseenter", () => {
            isPaused = true;
            clearInterval(autoPlayTimer);
        });

        diagram.addEventListener("mouseleave", () => {
            isPaused = false;
            startAutoPlay();
        });

        diagram.addEventListener("focusin", () => {
            isPaused = true;
            clearInterval(autoPlayTimer);
        });

        diagram.addEventListener("focusout", (event) => {
            if (!diagram.contains(event.relatedTarget)) {
                isPaused = false;
                startAutoPlay();
            }
        });
    }

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            clearInterval(autoPlayTimer);
        } else {
            startAutoPlay();
        }
    });

    // Initialize on the first project.
    showProject(0, false);
    startAutoPlay();
});


// Blogs section

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".blogs-grid");
    const prevBtn = document.querySelector(".blogs-prev");
    const nextBtn = document.querySelector(".blogs-next");

    if (!carousel || !prevBtn || !nextBtn) return;

    const mobileQuery = window.matchMedia("(max-width: 850px)");

    function getStep() {
        const card = carousel.querySelector(".blog-card");
        if (!card) return carousel.clientWidth;

        const styles = getComputedStyle(carousel);
        const gap = parseFloat(styles.columnGap) || 0;

        return card.getBoundingClientRect().width + gap;
    }

    function updateButtons() {
        if (!mobileQuery.matches) {
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            return;
        }

        const maxScroll = carousel.scrollWidth - carousel.clientWidth;

        prevBtn.disabled = carousel.scrollLeft <= 2;
        nextBtn.disabled = carousel.scrollLeft >= maxScroll - 2;
    }

    prevBtn.addEventListener("click", () => {
        carousel.scrollBy({
            left: -getStep(),
            behavior: "smooth"
        });
    });

    nextBtn.addEventListener("click", () => {
        carousel.scrollBy({
            left: getStep(),
            behavior: "smooth"
        });
    });

    carousel.addEventListener("scroll", updateButtons, {
        passive: true
    });

    window.addEventListener("resize", updateButtons);
    mobileQuery.addEventListener("change", updateButtons);

    // Mouse dragging on tablet/desktop devices
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;
    let moved = false;

    carousel.addEventListener("pointerdown", (event) => {
        if (!mobileQuery.matches || event.pointerType !== "mouse") return;
        if (event.target.closest("a, button")) return;

        isDragging = true;
        moved = false;
        startX = event.clientX;
        startScrollLeft = carousel.scrollLeft;

        carousel.style.scrollBehavior = "auto";
    });

    window.addEventListener("pointermove", (event) => {
        if (!isDragging) return;

        const distance = event.clientX - startX;

        if (Math.abs(distance) > 5) moved = true;

        carousel.scrollLeft = startScrollLeft - distance;
    });

    window.addEventListener("pointerup", () => {
        if (!isDragging) return;

        isDragging = false;
        carousel.style.scrollBehavior = "smooth";
        updateButtons();
    });

    carousel.addEventListener("click", (event) => {
        if (moved) {
            event.preventDefault();
            event.stopPropagation();
            moved = false;
        }
    }, true);

    updateButtons();
});

// about us

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".business-track");
    const viewport = document.querySelector(".business-viewport");
    const prevButton = document.querySelector(".business-prev");
    const nextButton = document.querySelector(".business-next");

    if (!track || !viewport || !prevButton || !nextButton) return;

    const originalCards = Array.from(track.querySelectorAll(".business-card"));
    if (originalCards.length <= 1) return;

    // Clone cards for seamless looping
    originalCards.forEach(card => {
        track.appendChild(card.cloneNode(true));
    });

    let index = 0;
    let timer;
    let isHovered = false;

    function getGap() {
        return parseFloat(getComputedStyle(track).gap) || 0;
    }

    function getStep() {
        const card = track.querySelector(".business-card");
        return card.getBoundingClientRect().width + getGap();
    }

    function getVisibleCards() {
        return Math.max(1, Math.round(viewport.clientWidth / getStep()));
    }

    function updateCarousel(animate = true) {
        track.style.transition = animate ? "transform 0.45s ease" : "none";
        track.style.transform = `translateX(-${index * getStep()}px)`;
    }

    function nextSlide() {
        index++;
        updateCarousel();
    }

    function prevSlide() {
        if (index === 0) {
            index = originalCards.length;
            updateCarousel(false);
            track.offsetHeight;
        }

        index--;
        updateCarousel();
    }

    track.addEventListener("transitionend", () => {
        if (index >= originalCards.length) {
            index = 0;
            updateCarousel(false);
        }
    });

    function startAutoScroll() {
        clearInterval(timer);

        if (isHovered) return;

        timer = setInterval(nextSlide, 4000);
    }

    nextButton.addEventListener("click", () => {
        nextSlide();
        startAutoScroll();
    });

    prevButton.addEventListener("click", () => {
        prevSlide();
        startAutoScroll();
    });

    viewport.addEventListener("mouseenter", () => {
        isHovered = true;
        clearInterval(timer);
    });

    viewport.addEventListener("mouseleave", () => {
        isHovered = false;
        startAutoScroll();
    });

    viewport.addEventListener("focusin", () => {
        isHovered = true;
        clearInterval(timer);
    });

    viewport.addEventListener("focusout", event => {
        if (!viewport.contains(event.relatedTarget)) {
            isHovered = false;
            startAutoScroll();
        }
    });

    window.addEventListener("resize", () => updateCarousel(false));

    updateCarousel(false);
    startAutoScroll();
});


// about us page - global 
const globalLogos = document.getElementById("globalLogos");
const globalLogoPrev = document.getElementById("globalLogoPrev");
const globalLogoNext = document.getElementById("globalLogoNext");

if (globalLogos && globalLogoPrev && globalLogoNext) {
    let currentIndex = 0;

    function getLogoMetrics() {
        const cards = globalLogos.querySelectorAll(".global-logo-card");
        const visibleWidth = globalLogos.parentElement.clientWidth;

        if (!cards.length) {
            return { cards, maxIndex: 0, step: 0 };
        }

        const style = getComputedStyle(globalLogos);
        const gap = parseFloat(style.gap) || 0;
        const step = cards[0].getBoundingClientRect().width + gap;
        const maxIndex = Math.max(
            0,
            Math.ceil((globalLogos.scrollWidth - visibleWidth) / step)
        );

        return { cards, maxIndex, step };
    }

    function updateLogoCarousel() {
        const { maxIndex, step } = getLogoMetrics();

        currentIndex = Math.min(currentIndex, maxIndex);

        globalLogos.style.transform =
            `translateX(-${currentIndex * step}px)`;

        globalLogoPrev.disabled = currentIndex === 0;
        globalLogoNext.disabled = currentIndex >= maxIndex;

        globalLogoPrev.style.opacity =
            currentIndex === 0 ? "0.35" : "1";

        globalLogoNext.style.opacity =
            currentIndex >= maxIndex ? "0.35" : "1";
    }

    globalLogoNext.addEventListener("click", () => {
        const { maxIndex } = getLogoMetrics();

        if (currentIndex < maxIndex) {
            currentIndex++;
            updateLogoCarousel();
        }
    });

    globalLogoPrev.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateLogoCarousel();
        }
    });

    window.addEventListener("resize", updateLogoCarousel);

    updateLogoCarousel();
}

// About us - Awards
document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".awards-grid");
    const prev = document.querySelector(".awards-prev");
    const next = document.querySelector(".awards-next");

    if (!grid || !prev || !next) return;

    function getScrollAmount() {
        const card = grid.querySelector(".award-card");
        if (!card) return 0;

        const gap = parseFloat(getComputedStyle(grid).gap) || 0;
        return card.getBoundingClientRect().width + gap;
    }

    prev.addEventListener("click", function () {
        grid.scrollBy({
            left: -getScrollAmount(),
            behavior: "smooth"
        });
    });

    next.addEventListener("click", function () {
        grid.scrollBy({
            left: getScrollAmount(),
            behavior: "smooth"
        });
    });
});

// About page - Team section

document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".team-track");
    const viewport = document.querySelector(".team-viewport");
    const prevBtn = document.querySelector(".team-prev");
    const nextBtn = document.querySelector(".team-next");

    const modal = document.getElementById("teamModal");
    const modalName = document.getElementById("teamModalName");
    const modalRole = document.getElementById("teamModalRole");
    const modalBio = document.getElementById("teamModalBio");

    if (!track || !viewport || !prevBtn || !nextBtn || !modal) return;

    // Keep your existing teamMembers array here.
    const teamMembers = [
        {
            name: "Name",
            role: "role",
            bio: `<ul>
            <li>details</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet 
            consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur 
            adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor 
            sit amet consectetur adipisicing elit. </br>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </li>
            </ul>`
        },
        {
            name: "Name",
            role: "role",
            bio: `<ul><li>details</li><li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li></ul>`
        },
        {
            name: "Name",
            role: "role",
            bio: `<ul><li>details</li><li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li></ul>`
        },
        {
            name: "Name",
            role: "role",
            bio: `<ul><li>details</li><li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li></ul>`
        },
        {
            name: "Name",
            role: "role",
            bio: `<ul><li>details</li><li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li></ul>`
        },
        {
            name: "Name",
            role: "role",
            bio: `<ul><li>details</li><li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li></ul>`
        },
        {
            name: "Name",
            role: "role",
            bio: `<ul><li>details</li><li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li></ul>`
        },
        {
            name: "Name",
            role: "role",
            bio: `<ul>
            <li>details</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet 
            consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur 
            adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor 
            sit amet consectetur adipisicing elit </br>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </li>
            </ul>`
        }
    ];

    let activeIndex = 0;

    function getCards() {
        return Array.from(track.querySelectorAll(".team-card"));
    }

    function getStep() {
        const card = getCards()[0];
        if (!card) return 0;

        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        return card.getBoundingClientRect().width + gap;
    }

    function getMaxIndex() {
        const cards = getCards();
        const step = getStep();

        if (!cards.length || !step) return 0;

        const visibleCards = Math.max(
            1,
            Math.floor((viewport.clientWidth + 1) / step)
        );

        return Math.max(0, cards.length - visibleCards);
    }

    function updateCarousel() {
        const cards = getCards();
        if (!cards.length) return;

        activeIndex = (activeIndex + cards.length) % cards.length;

        cards.forEach((card, index) => {
            card.classList.toggle("active", index === activeIndex);

            if (index === activeIndex) {
                card.setAttribute("aria-current", "true");
            } else {
                card.removeAttribute("aria-current");
            }
        });

        const step = getStep();
        const maxIndex = getMaxIndex();

        // Scroll one card at a time while keeping the active card visible.
        let position = Math.min(activeIndex, maxIndex);

        // Wrap the visual position back to the beginning after the last card.
        if (activeIndex === 0) {
            position = 0;
        }

        track.style.transform = `translateX(-${position * step}px)`;
    }

    nextBtn.addEventListener("click", function () {
        activeIndex++;
        updateCarousel();
    });

    prevBtn.addEventListener("click", function () {
        activeIndex--;
        updateCarousel();
    });

    // Clicking a card makes it active.
    track.addEventListener("click", function (event) {
        if (event.target.closest(".team-details-btn")) return;

        const card = event.target.closest(".team-card");
        if (!card) return;

        activeIndex = getCards().indexOf(card);
        updateCarousel();
    });

    // Open member details popup.
    track.addEventListener("click", function (event) {
        const button = event.target.closest(".team-details-btn");
        if (!button) return;

        event.stopPropagation();

        const member = teamMembers[Number(button.dataset.member)];
        if (!member) return;

        modalName.textContent = member.name;
        modalRole.textContent = member.role;
        modalBio.innerHTML = member.bio;

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    });

    function closeModal() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    modal.querySelectorAll("[data-close-modal]").forEach(function (element) {
        element.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal.classList.contains("open")) {
            closeModal();
        }
    });

    window.addEventListener("resize", updateCarousel);

    updateCarousel();
});


// capabilities- products section 
const productData = {
    bedding: {
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
            "Sed do eiusmod tempor incididunt ut labore et dolore magna " +
            "aliqua. Ut enim ad minim veniam, quis nostrud exercitation " +
            "ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "assets/images/banner-1.jpg",
        alt: "Bedding Solutions",
        link: "#bedding-solutions"
    },

    bath: {
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
            "Explore our collection of comfortable and luxurious bath " +
            "textiles, thoughtfully designed to bring softness, style, " +
            "and everyday comfort into your home.",
        image: "assets/images/banner-2.jpg",
        alt: "Bath Solutions",
        link: "#bath-solutions"
    },

    flooring: {
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
            "Discover versatile flooring solutions that combine style, " +
            "durability, and functionality. Our thoughtfully designed " +
            "products bring a refined look to a variety of spaces.",
        image: "assets/images/banner-3.jpg",
        alt: "Flooring Solutions",
        link: "#flooring-solutions"
    }
};

const productTabs = document.querySelectorAll(".product-tab");
const productDescription = document.getElementById("product-description");
const productImage = document.getElementById("product-image");
const productLink = document.getElementById("product-link");

productTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const selectedProduct = tab.dataset.product;
        const product = productData[selectedProduct];

        if (!product) return;

        // Update active card
        productTabs.forEach((item) => {
            item.classList.remove("active");
            item.setAttribute("aria-pressed", "false");
        });

        tab.classList.add("active");
        tab.setAttribute("aria-pressed", "true");

        // Update description
        productDescription.textContent = product.description;

        // Update image
        productImage.src = product.image;
        productImage.alt = product.alt;

        // Update button destination
        productLink.href = product.link;
    });
});

// Set initial accessibility state
productTabs.forEach((tab) => {
    tab.setAttribute(
        "aria-pressed",
        tab.classList.contains("active") ? "true" : "false"
    );
});