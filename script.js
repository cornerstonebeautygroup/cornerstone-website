document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle Controller
    const mobileMenuToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const resetMobileToggle = () => {
        if (!mobileMenuToggle) return;
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (spans.length >= 3) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    };

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('open');
            const isOpen = mobileMenuToggle.classList.contains('open');
            mobileMenuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (spans.length >= 3) {
                if (isOpen) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
                } else {
                    resetMobileToggle();
                }
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('open');
                resetMobileToggle();
            });
        });
    }

    // 2. Smooth Scrolling
    const allInternalLinks = document.querySelectorAll('a[href^="#"]');
    allInternalLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    // 3. Reveal Animations
    const targetedRevealElements = document.querySelectorAll('.scroll-reveal');
    if ('IntersectionObserver' in window) {
        const structuralAnimationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    structuralAnimationObserver.unobserve(entry.target);
                }
            });
        }, { root: null, threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        targetedRevealElements.forEach(element => structuralAnimationObserver.observe(element));
    } else {
        targetedRevealElements.forEach(element => element.classList.add('active'));
    }

    // 4. Dynamic Header on Scroll
    const dynamicSiteHeader = document.querySelector('.site-header');
    if (dynamicSiteHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                dynamicSiteHeader.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.03)';
                dynamicSiteHeader.style.padding = '4px 0';
            } else {
                dynamicSiteHeader.style.boxShadow = 'none';
                dynamicSiteHeader.style.padding = '0';
            }
        });
    }
});

// Lightweight contact form handler.
// This opens the visitor's email client so the website can receive inquiries without a paid backend service.
function handleContactForm(event) {
    event.preventDefault();
    const form = event.target;
    const name = encodeURIComponent(form.name.value.trim());
    const email = encodeURIComponent(form.email.value.trim());
    const interest = encodeURIComponent(form.interest.value);
    const message = encodeURIComponent(form.message.value.trim());
    const subject = encodeURIComponent('Corporate Inquiry - Cornerstone Beauty Group');
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AArea of Interest: ${interest}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    window.location.href = `mailto:info@cornerstonebeautygroup.com?subject=${subject}&body=${body}`;
}
