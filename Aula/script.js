const images = {
    backgrounds: document.querySelectorAll(".background"),
    theLastOfUs: [
        "./assets/imagens/the-last-of-us/tlou-1.jpg",
        "./assets/imagens/the-last-of-us/tlou-2.jpg",
        "./assets/imagens/the-last-of-us/tlou-3.jpg",
        "./assets/imagens/the-last-of-us/tlou-4.jpg",
        "./assets/imagens/the-last-of-us/tlou-5.jpg",
        "./assets/imagens/the-last-of-us/tlou-6.jpg",
    ],
};

const page = {
    modal: document.querySelector(".modal"),
    iframe: document.querySelector("iframe"),
    btnTrailer: document.querySelector(".trailer"),
    btnClose: document.querySelector(".button-close"),
    buttonsCarousel: document.querySelectorAll(".button"),
    indexOfArrayText: 0,
    intervalId: null,

    toggleDisplayModal(value) {
        this.modal.style.display = value;
    },

    buttonSelected(index) {
        this.buttonsCarousel.forEach(button => {
            button.classList.remove("selected");
        });
        this.buttonsCarousel[index].classList.add("selected");
    },

    transitionBackground(value) {
        images.backgrounds.forEach(currentBackground => {
            currentBackground.style.transform = `translateX(${value})`;
        });
    },

    nextImage(index) {
        this.transitionBackground(`-${index}00%`);
        this.buttonSelected(index);
        this.indexOfArrayText = index;
    },

    automaticBackgroundTransition() {
        let index = 0;
    
        // Clear previous interval if exists
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    
        // Start automatic carousel
        this.intervalId = setInterval(() => {
            index = (index + 1) % images.theLastOfUs.length; // Loop through images
            this.nextImage(index);
        }, 2000);
    },

    init() {
        // Modal functionality
        this.btnTrailer.addEventListener("click", () => this.toggleDisplayModal("grid"));
        this.btnClose.addEventListener("click", () => this.toggleDisplayModal("none"));
    
        // Manual carousel navigation
        this.buttonsCarousel.forEach((button, index) => {
            button.addEventListener("click", () => {
                clearInterval(this.intervalId); // Stop auto-transition on manual click
                this.nextImage(index);
            });
        });
    
        // Start automatic transition on page load
        this.automaticBackgroundTransition();
    },

};

page.init();