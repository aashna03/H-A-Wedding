(function() {
    const container = document.querySelector('.prewedding-section');
    if (!container) return;

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '♥';
        
        // Random positioning and sizing
        const startLeft = Math.random() * 100;
        const size = Math.random() * 20 + 15; // 15px to 35px
        const duration = Math.random() * 15 + 15; // 10s to 20s
        
        heart.style.left = startLeft + '%';
        heart.style.fontSize = size + 'px';
        heart.style.animation = `floatUp ${duration}s linear forwards`;
        
        // Click interaction
        heart.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering other clicks
            heart.classList.add('heart-pop');
            // Remove after pop animation
            setTimeout(() => {
                if (heart.parentNode) heart.parentNode.removeChild(heart);
            }, 300);
        });

        // Cleanup after animation ends
        heart.addEventListener('animationend', function() {
            if (heart.parentNode) heart.parentNode.removeChild(heart);
        });

        container.appendChild(heart);
    }

    // Spawn hearts periodically
    setInterval(createHeart, 800); // Create a new heart every 800ms
    
    // Initial batch
    for(let i=0; i<5; i++) {
        setTimeout(createHeart, Math.random() * 2000);
    }
})();
