// Mobile menu toggle and dropdown interactions
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Dropdown elements
    const studentBtn = document.getElementById('student-leaders-btn');
    const studentDropdown = document.getElementById('student-leaders-dropdown');
    const politicalBtn = document.getElementById('political-leaders-btn');
    const politicalDropdown = document.getElementById('political-leaders-dropdown');
    const movementBtn = document.getElementById('movement-leaders-btn');
    const movementDropdown = document.getElementById('movement-leaders-dropdown');

    // Function to close all dropdowns
    function closeAllDropdowns() {
        if (studentDropdown) {
            studentDropdown.classList.add('opacity-0', 'invisible', 'pointer-events-none');
            studentDropdown.classList.remove('opacity-100', 'visible', 'pointer-events-auto');
        }
        if (politicalDropdown) {
            politicalDropdown.classList.add('opacity-0', 'invisible', 'pointer-events-none');
            politicalDropdown.classList.remove('opacity-100', 'visible', 'pointer-events-auto');
        }
        if (movementDropdown) {
            movementDropdown.classList.add('opacity-0', 'invisible', 'pointer-events-none');
            movementDropdown.classList.remove('opacity-100', 'visible', 'pointer-events-auto');
        }
    }

    // Function to toggle dropdown
    function toggleDropdown(button, dropdown) {
        const isOpen = dropdown && !dropdown.classList.contains('invisible');
        
        // Close all first
        closeAllDropdowns();
        
        // If it wasn't open, open it
        if (!isOpen && dropdown) {
            dropdown.classList.remove('opacity-0', 'invisible', 'pointer-events-none');
            dropdown.classList.add('opacity-100', 'visible', 'pointer-events-auto');
        }
    }

    // Student Leaders dropdown
    if (studentBtn && studentDropdown) {
        studentBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown(studentBtn, studentDropdown);
        });
    }

    // Political Leaders dropdown
    if (politicalBtn && politicalDropdown) {
        politicalBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown(politicalBtn, politicalDropdown);
        });
    }

    // Movement Leaders dropdown
    if (movementBtn && movementDropdown) {
        movementBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown(movementBtn, movementDropdown);
        });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideDropdown = 
            (studentDropdown && studentDropdown.contains(event.target)) ||
            (politicalDropdown && politicalDropdown.contains(event.target)) ||
            (movementDropdown && movementDropdown.contains(event.target));
        
        const isClickOnButton = 
            (studentBtn && studentBtn.contains(event.target)) ||
            (politicalBtn && politicalBtn.contains(event.target)) ||
            (movementBtn && movementBtn.contains(event.target));

        if (!isClickInsideDropdown && !isClickOnButton) {
            closeAllDropdowns();
        }

        // Mobile menu close logic
        if (mobileMenu && mobileMenuBtn) {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnMobileButton = mobileMenuBtn.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnMobileButton && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('svg');
                if (icon) {
                    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
                }
            }
        }
    });

    // Resources Card (Mobile Menu) - Updated to work without backdrop
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    
    function openResourcesCard() {
        if (mobileMenu) mobileMenu.classList.remove('hidden');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('hidden');
        const icon = mobileMenuBtn.querySelector('svg');
        if (icon) {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
        }
    }
    
    function closeResourcesCard() {
        if (mobileMenu) mobileMenu.classList.add('hidden');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('svg');
        if (icon) {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        }
    }

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (mobileMenu.classList.contains('hidden')) {
                openResourcesCard();
            } else {
                closeResourcesCard();
            }
        });
    }

    // Close Resources card when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            const isClickInsideMenu = mobileMenu.contains(e.target);
            const isClickOnButton = mobileMenuBtn && mobileMenuBtn.contains(e.target);
            
            if (!isClickInsideMenu && !isClickOnButton) {
                closeResourcesCard();
            }
        }
    });

    // Donate Modal functionality
    const donateBtn = document.getElementById('donate-btn');
    const donateModal = document.getElementById('donate-modal');
    const donateModalOverlay = document.getElementById('donate-modal-overlay');
    const donateCloseBtn = document.getElementById('donate-close-btn');
    const donateCancelBtn = document.getElementById('donate-cancel-btn');
    const donateSubmitBtn = document.getElementById('donate-submit-btn');
    const customAmountInput = document.getElementById('custom-amount');
    const donateAmountBtns = document.querySelectorAll('.donate-amount-btn');
    
    let selectedAmount = null;
    const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/your-payment-link'; // Replace with actual Stripe link

    function openDonateModal() {
        if (donateModal) donateModal.classList.remove('hidden');
        if (donateModalOverlay) donateModalOverlay.classList.remove('hidden');
    }

    function closeDonateModal() {
        if (donateModal) donateModal.classList.add('hidden');
        if (donateModalOverlay) donateModalOverlay.classList.add('hidden');
        selectedAmount = null;
        if (customAmountInput) customAmountInput.value = '';
        // Reset button styles
        donateAmountBtns.forEach(btn => {
            btn.classList.remove('bg-primary', 'text-white', 'border-primary');
            btn.classList.add('border-gray-300');
        });
    }

    if (donateBtn) {
        donateBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            openDonateModal();
        });
    }

    if (donateCloseBtn) {
        donateCloseBtn.addEventListener('click', closeDonateModal);
    }

    if (donateCancelBtn) {
        donateCancelBtn.addEventListener('click', closeDonateModal);
    }

    // Close modal when clicking outside the modal content
    document.addEventListener('click', function(e) {
        if (donateModal && !donateModal.classList.contains('hidden')) {
            const modalContent = donateModal.querySelector('.bg-white');
            const isClickInsideModal = modalContent && modalContent.contains(e.target);
            const isClickOnButton = donateBtn && donateBtn.contains(e.target);
            
            if (!isClickInsideModal && !isClickOnButton) {
                closeDonateModal();
            }
        }
    });

    // Handle preset amount selection
    donateAmountBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            selectedAmount = this.getAttribute('data-amount');
            if (customAmountInput) customAmountInput.value = '';
            // Update button styles
            donateAmountBtns.forEach(b => {
                b.classList.remove('bg-primary', 'text-white', 'border-primary');
                b.classList.add('border-gray-300');
            });
            this.classList.add('bg-primary', 'text-white', 'border-primary');
            this.classList.remove('border-gray-300');
        });
    });

    // Handle custom amount input
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            if (this.value) {
                selectedAmount = this.value;
                // Reset preset buttons
                donateAmountBtns.forEach(btn => {
                    btn.classList.remove('bg-primary', 'text-white', 'border-primary');
                    btn.classList.add('border-gray-300');
                });
            }
        });
    }

    // Handle donate submission
    if (donateSubmitBtn) {
        donateSubmitBtn.addEventListener('click', function() {
            const amount = selectedAmount || customAmountInput?.value;
            if (amount && parseFloat(amount) > 0) {
                // Redirect to Stripe payment link with amount
                const paymentUrl = `${STRIPE_PAYMENT_LINK}?amount=${amount * 100}`; // Stripe uses cents
                window.open(paymentUrl, '_blank');
                closeDonateModal();
            } else {
                alert('Please select or enter a donation amount.');
            }
        });
    }

    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeDonateModal();
            closeResourcesCard();
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close Resources card when navigating
                    closeResourcesCard();
                }
            }
        });
    });

    // Video Slideshow - switch every 5 seconds
    const videos = [
        document.getElementById('video-1'),
        document.getElementById('video-2'),
        document.getElementById('video-3')
    ];

    if (videos[0] && videos[1] && videos[2]) {
        let currentIndex = 0;
        
        // Preload all videos
        videos.forEach(video => video.load());
        
        setInterval(() => {
            const currentVideo = videos[currentIndex];
            const nextIndex = (currentIndex + 1) % videos.length;
            const nextVideo = videos[nextIndex];
            
            // Start next video before fading (prevents white gap)
            nextVideo.currentTime = 0;
            nextVideo.play().catch(e => {});
            
            // Fade in next video
            nextVideo.classList.remove('opacity-0');
            nextVideo.classList.add('opacity-100');
            
            // Fade out current video after short delay
            setTimeout(() => {
                currentVideo.classList.remove('opacity-100');
                currentVideo.classList.add('opacity-0');
            }, 500);
            
            currentIndex = nextIndex;
        }, 5000); // Switch every 5 seconds
    }
});

