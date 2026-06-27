/* ==========================
   SWEET LAYERS JAVASCRIPT
========================== */

/* Active Navigation Link */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop) {

            current = section.getAttribute("id")

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href").includes(current)) {

            link.classList.add("active");

        }

    });

});


/* Smooth Scroll */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});

/* Navbar Toggle */

const navbar = document.querySelector(".navbar-collapse");
const toggler = document.querySelector(".navbar-toggler");

document.addEventListener("click", function (e) {

    const isClickInsideNavbar = navbar.contains(e.target);
    const isClickOnToggler = toggler.contains(e.target);

    if (
        navbar.classList.contains("show") &&
        !isClickInsideNavbar &&
        !isClickOnToggler
    ) {
        bootstrap.Collapse.getInstance(navbar).hide();
    }

});

document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {

    link.addEventListener("click", () => {

        if (window.innerWidth < 992) {
            bootstrap.Collapse.getInstance(navbar).hide();
        }

    });

});


/* Hero Image Floating Animation */

const heroImage = document.querySelector(".hero-image");

if (heroImage) {

    let position = 0;
    let direction = 1;

    setInterval(() => {

        position += direction * 0.3;

        if (position > 10) {
            direction = -1;
        }

        if (position < -10) {
            direction = 1;
        }

        heroImage.style.transform =
            `translateY(${position}px)`;

    }, 30);

}


/* Fade In Animation */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.2
});


const hiddenElements = document.querySelectorAll(
    ".cake-card, .feature-box, .review-card"
);

hiddenElements.forEach(el => {

    el.classList.add("hidden");

    observer.observe(el);

});


/* Gallery Filter */

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

// Filter
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const filterValue =
        button.getAttribute("data-filter");

        galleryItems.forEach(item => {

            if (
                filterValue === "all" ||
                item.classList.contains(filterValue)
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

});


// Open / Close Gallery
const btn = document.getElementById("viewCakesBtn");
const gallery = document.getElementById("gallery");

btn.addEventListener("click", function (e) {

    e.preventDefault();

    gallery.classList.toggle("show");

    if (gallery.classList.contains("show")) {

        btn.textContent = "Hide Gallery ↑";

        gallery.scrollIntoView({
            behavior: "smooth"
        });

    } else {

        btn.textContent = "View All Cakes →";

    }

});

// Hero Button
const viewGalleryBtn = document.getElementById("viewGalleryBtn");

// Navbar Gallery Link
const navGalleryBtn = document.getElementById("navGalleryBtn");

function openGallery(e) {

    e.preventDefault();

    gallery.classList.add("show");

    btn.textContent = "Hide Gallery ↑";

    gallery.scrollIntoView({
        behavior: "smooth"
    });

}

if (viewGalleryBtn) {
    viewGalleryBtn.addEventListener("click", openGallery);
}

if (navGalleryBtn) {
    navGalleryBtn.addEventListener("click", openGallery);
}


/* Review Slider */

const reviews = document.querySelectorAll(".review-card");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let current = 0;

function showReview(index){

    reviews.forEach(review=>{
        review.classList.remove("active");
    });

    reviews[index].classList.add("active");
}

nextBtn.addEventListener("click",()=>{

    current++;

    if(current >= reviews.length){
        current = 0;
    }

    showReview(current);

});

prevBtn.addEventListener("click",()=>{

    current--;

    if(current < 0){
        current = reviews.length - 1;
    }

    showReview(current);

});

// Auto Slide
setInterval(()=>{

    current++;

    if(current >= reviews.length){
        current = 0;
    }

    showReview(current);

},5000);

// First Review
showReview(current);



/* Contact Form */

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;
    
    // Create mailto link
    const subject = `Contact from ${name}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    const mailtoLink = `mailto:sweet0layers@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    // Prepare Formspree data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    
    // Show loading
    const submitBtn = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Try to send via Formspree
    fetch('https://formspree.io/f/mqevqnoa', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert("✅ Message sent successfully!");
            document.getElementById('contact-form').reset();
        } else {
            throw new Error('Formspree failed');
        }
    })
    .catch(error => {
        // Fallback to mailto
        console.log('Using mailto fallback');
        window.location.href = mailtoLink;
        document.getElementById('contact-form').reset();
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});



console.log("Sweet Layers Loaded Successfully 🚀");