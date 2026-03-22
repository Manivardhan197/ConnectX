// landing.js

document.addEventListener("DOMContentLoaded", () => {
    // Select all elements that need to animate in
    const fadeElements = document.querySelectorAll('.fade-up');

    // Create an Intersection Observer setup
    const observerOptions = {
        root: null, // Use the viewport
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of the element is visible
    };

    const intersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the visible class to trigger the CSS transition
                entry.target.classList.add('visible');
                
                // Optionally unobserve if we only want it to animate once
                // observer.unobserve(entry.target);
            } else {
                // Remove this line if you only want the animation to play once
                // By keeping this, elements will fade back out when scrolled past, 
                // and animate back in when scrolled back to
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // Observe each element
    fadeElements.forEach(element => {
        intersectionObserver.observe(element);
    });

    // Optional: Add scroll listener to background orbs to create 
    // a subtle parallax effect depending on scroll container
    const scrollContainer = document.querySelector('.scroll-container');
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    const orb3 = document.querySelector('.orb-3');

    scrollContainer.addEventListener('scroll', () => {
        const scrolled = scrollContainer.scrollTop;
        
        // Very subtle parallax mapping scroll position to translateY
        if(orb1) orb1.style.transform = `translateY(${scrolled * 0.1}px)`;
        if(orb2) orb2.style.transform = `translateY(${scrolled * -0.05}px)`;
        if(orb3) orb3.style.transform = `translateY(${scrolled * 0.08}px)`;
    });
});
