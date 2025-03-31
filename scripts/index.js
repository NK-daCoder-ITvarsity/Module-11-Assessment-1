import { galleryData } from "../constants/constants.js";

// Function to generate gallery HTML
function generateGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    galleryGrid.innerHTML = ''; // Clear existing content

    galleryData.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col-sm-6 col-lg-4 mb-4 grid-item';
        col.setAttribute('data-category', item.category);

        col.innerHTML = `
            <div class="card gallery-img h-100">
                <div class="p-2">
                    <img src="${item.imageUrl}" class="img-fluid rounded w-100" alt="${item.title}" loading="lazy">
                </div>
                <div class="card-body p-3 bg-light">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text text-muted">${item.description}</p>
                </div>
            </div>
        `;

        galleryGrid.appendChild(col);
    });

    // Initialize Masonry after items are loaded
    initMasonry();
}

// Initialize Masonry
function initMasonry() {
    if (typeof Masonry !== 'undefined') {
        const msnry = new Masonry('#gallery-grid', {
            itemSelector: '.grid-item',
            percentPosition: true,
            transitionDuration: '0.4s'
        });
        
        // Wait for images to load
        imagesLoaded('#gallery-grid', function() {
            msnry.layout();
        });
    }
}

// Filter functionality
function setupFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'btn-primary');
                btn.classList.add('btn-outline-primary');
            });
            this.classList.add('active', 'btn-primary');
            this.classList.remove('btn-outline-primary');
            
            const filterValue = this.getAttribute('data-filter');
            const galleryItems = document.querySelectorAll('.grid-item');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Trigger masonry layout update after a slight delay
            setTimeout(() => {
                if (typeof Masonry !== 'undefined') {
                    const msnry = new Masonry('#gallery-grid');
                    msnry.layout();
                }
            }, 50);
        });
    });
}

// Initialize the gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    generateGallery();
    setupFilters();
});

// Handle window resize events
window.addEventListener('resize', function() {
    if (typeof Masonry !== 'undefined') {
        const msnry = new Masonry('#gallery-grid');
        msnry.layout();
    }
});