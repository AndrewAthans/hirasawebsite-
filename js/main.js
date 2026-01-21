// Mobile menu toggle and dropdown interactions
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');

    // Donate modal elements
    const donateBtn = document.getElementById('donate-btn');
    const donateModal = document.getElementById('donate-modal');
    const donateClose = document.getElementById('donate-close');
    const donateCancel = document.getElementById('donate-cancel');
    const donateConfirm = document.getElementById('donate-confirm');
    const donateError = document.getElementById('donate-error');
    const donateCustomAmount = document.getElementById('donate-custom-amount');
    const donateAmountButtons = document.querySelectorAll('.donate-amount-btn');

    let selectedDonateAmount = 50; // default preset

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

        // (Resources card overlay has its own backdrop click handler; we don't close it here)
    });

    function openResourcesCard() {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('block');
        const icon = mobileMenuBtn && mobileMenuBtn.querySelector('svg');
        if (icon) {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
        }
    }

    function closeResourcesCard() {
        if (!mobileMenu) return;
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('block');
        const icon = mobileMenuBtn && mobileMenuBtn.querySelector('svg');
        if (icon) {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        }
    }

    // Mobile menu toggle (Resources card)
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (mobileMenu.classList.contains('hidden')) {
                openResourcesCard();
            } else {
                closeResourcesCard();
            }
        });

        // Close button in card header
        const resourcesCloseBtn = document.getElementById('resources-close-btn');
        if (resourcesCloseBtn) {
            resourcesCloseBtn.addEventListener('click', function () {
                closeResourcesCard();
            });
        }
    }

    // Close Resources card on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            closeResourcesCard();
        }
    });

    // Smooth scrolling for anchor links and close menu
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
                }
            }
            
            // Close resources card when a nav link is clicked
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                closeResourcesCard();
            }
        });
    });

    // Search button toggle
    if (searchBtn && searchOverlay) {
        searchBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            searchOverlay.classList.toggle('hidden');
            if (!searchOverlay.classList.contains('hidden') && searchInput) {
                // Focus input when search opens
                setTimeout(() => searchInput.focus(), 100);
            }
        });
    }

    // Close search overlay when clicking outside
    if (searchOverlay) {
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                searchOverlay.classList.add('hidden');
            }
        });
    }

    // Close search overlay on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay && !searchOverlay.classList.contains('hidden')) {
            searchOverlay.classList.add('hidden');
        }
    });

    // Prevent search input clicks from closing overlay
    if (searchInput) {
        searchInput.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Donate modal helpers
    function openDonateModal() {
        if (!donateModal) return;
        donateModal.classList.remove('hidden');
        donateModal.classList.add('flex');
        if (donateCustomAmount) {
            donateCustomAmount.value = '';
        }
        if (donateError) {
            donateError.classList.add('hidden');
            donateError.textContent = '';
        }
    }

    function closeDonateModal() {
        if (!donateModal) return;
        donateModal.classList.add('hidden');
        donateModal.classList.remove('flex');
    }

    // Wire donate button
    if (donateBtn && donateModal) {
        donateBtn.addEventListener('click', function () {
            openDonateModal();
        });
    }

    // Close actions
    if (donateClose) {
        donateClose.addEventListener('click', closeDonateModal);
    }
    if (donateCancel) {
        donateCancel.addEventListener('click', closeDonateModal);
    }
    if (donateModal) {
        donateModal.addEventListener('click', function (e) {
            if (e.target === donateModal) {
                closeDonateModal();
            }
        });
    }

    // Close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && donateModal && !donateModal.classList.contains('hidden')) {
            closeDonateModal();
        }
    });

    // Preset amount selection
    if (donateAmountButtons && donateAmountButtons.length > 0) {
        donateAmountButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                const amount = parseInt(this.getAttribute('data-donate-amount') || '0', 10);
                if (amount > 0) {
                    selectedDonateAmount = amount;
                    // Visual selection state
                    donateAmountButtons.forEach(b => {
                        b.classList.remove('border-gray-900', 'bg-gray-900', 'text-white');
                        b.classList.add('border-gray-300', 'text-gray-800');
                    });
                    this.classList.remove('border-gray-300', 'text-gray-800');
                    this.classList.add('border-gray-900', 'bg-gray-900', 'text-white');
                    if (donateCustomAmount) {
                        donateCustomAmount.value = '';
                    }
                    if (donateError) {
                        donateError.classList.add('hidden');
                        donateError.textContent = '';
                    }
                }
            });
        });
    }

    function getFinalDonateAmount() {
        let amount = selectedDonateAmount;
        if (donateCustomAmount && donateCustomAmount.value) {
            const custom = parseFloat(donateCustomAmount.value);
            if (!isNaN(custom) && custom > 0) {
                amount = Math.round(custom);
            }
        }
        return amount;
    }

    function validateDonateAmount(amount) {
        if (!amount || amount <= 0) {
            if (donateError) {
                donateError.textContent = 'Please enter a valid donation amount.';
                donateError.classList.remove('hidden');
            }
            return false;
        }
        if (amount > 10000) {
            if (donateError) {
                donateError.textContent = 'For donations over $10,000, please contact us directly.';
                donateError.classList.remove('hidden');
            }
            return false;
        }
        if (donateError) {
            donateError.classList.add('hidden');
            donateError.textContent = '';
        }
        return true;
    }

    // Replace this with your real Stripe Payment Link or backend endpoint.
    const STRIPE_PAYMENT_LINK = ''; // e.g. 'https://donate.stripe.com/your_payment_link'

    async function handleDonateConfirm() {
        const amount = getFinalDonateAmount();
        if (!validateDonateAmount(amount)) return;

        // If a Stripe Payment Link is configured, redirect with amount as query param
        if (STRIPE_PAYMENT_LINK && typeof STRIPE_PAYMENT_LINK === 'string' && STRIPE_PAYMENT_LINK.length > 0) {
            const url = `${STRIPE_PAYMENT_LINK}?amount=${encodeURIComponent(amount)}`;
            window.location.href = url;
            return;
        }

        // Fallback: show an informative message for now
        alert(`Donate $${amount} – Configure STRIPE_PAYMENT_LINK in js/main.js to connect to your real Stripe donation page.`);
        closeDonateModal();
    }

    if (donateConfirm) {
        donateConfirm.addEventListener('click', handleDonateConfirm);
    }

    // Video Slideshow Logic - Three videos in order: Islamic class (school) → Black guys → Talking guy (white guy on stage)
    const talkingGuyVideo = document.getElementById('talking-guy-video');
    const blackGuysVideo = document.getElementById('black-guys-video');
    const islamicClassVideo = document.getElementById('islamic-class-video');
    
    if (talkingGuyVideo && blackGuysVideo && islamicClassVideo) {
        let currentVideo = 'islamic-class'; // Start with Islamic class video (school classroom)
        let blackGuysDuration = 0;
        let blackGuysHalfDuration = 5; // Default to 5 seconds if duration not loaded
        let transitionInProgress = false; // Prevent multiple transitions
        let talkingGuyVideoFailed = false; // Track if talking guy video failed to load
        
        console.log('Video slideshow initialized');
        
        // Add error handlers for all videos
        [islamicClassVideo, talkingGuyVideo, blackGuysVideo].forEach((video, index) => {
            const names = ['islamic-class', 'talking-guy', 'black-guys'];
            video.addEventListener('error', function(e) {
                console.error(`Error loading ${names[index]} video:`, e);
                console.error('Video error details:', video.error);
                // If talking guy video fails, mark it as failed and skip it in transitions
                if (names[index] === 'talking-guy') {
                    talkingGuyVideoFailed = true;
                    console.warn('Talking guy video failed to load, will skip it in slideshow');
                }
            });
            video.addEventListener('loadeddata', function() {
                console.log(`${names[index]} video loaded, duration:`, video.duration);
            });
        });
        
        // Preload all videos
        talkingGuyVideo.load();
        blackGuysVideo.load();
        islamicClassVideo.load();
        
        // Get black guys video duration when metadata loads
        blackGuysVideo.addEventListener('loadedmetadata', function() {
            if (this.duration && this.duration !== Infinity) {
                blackGuysDuration = this.duration;
                blackGuysHalfDuration = Math.min(blackGuysDuration / 2, 10); // Cap at 10 seconds
                console.log('Black guys video duration:', blackGuysDuration, 'Half duration:', blackGuysHalfDuration);
            } else {
                blackGuysHalfDuration = 5; // Fallback to 5 seconds
                console.log('Black guys video duration not available, using 5 seconds');
            }
        });
        
        // Start with Islamic class video (school classroom)
        islamicClassVideo.addEventListener('loadedmetadata', function() {
            islamicClassVideo.play().catch(function(error) {
                console.error('Islamic class video play failed:', error);
            });
        });
        
        // Ensure video plays when it becomes visible
        islamicClassVideo.addEventListener('canplay', function() {
            if (currentVideo === 'islamic-class' && this.paused) {
                this.play().catch(function(error) {
                    console.error('Video play failed:', error);
                });
            }
        });
        
        // Force play attempt after a short delay if video hasn't started
        setTimeout(() => {
            if (islamicClassVideo.paused && currentVideo === 'islamic-class') {
                islamicClassVideo.play().catch(function(error) {
                    console.error('Force play failed:', error);
                });
            }
        }, 500);
        
        // Islamic class video (school classroom): Play for 8 seconds, then fade to black guys
        islamicClassVideo.addEventListener('timeupdate', function() {
            if (this.currentTime >= 8 && currentVideo === 'islamic-class' && !transitionInProgress) {
                console.log('Transitioning from Islamic class to Black guys');
                transitionInProgress = true;
                currentVideo = 'black-guys';
                // Pause and fade out Islamic class, fade in black guys
                islamicClassVideo.pause();
                islamicClassVideo.classList.remove('opacity-100');
                islamicClassVideo.classList.add('opacity-0');
                blackGuysVideo.classList.remove('opacity-0');
                blackGuysVideo.classList.add('opacity-100');
                blackGuysVideo.currentTime = 0;
                blackGuysVideo.play().catch(function(error) {
                    console.error('Black guys video play failed:', error);
                });
                // Fallback: if black guys video doesn't transition after 6 seconds, force transition
                setTimeout(() => {
                    if (currentVideo === 'black-guys' && !transitionInProgress) {
                        console.log('Fallback: Forcing transition from Black guys to Talking guy');
                        transitionInProgress = true;
                        currentVideo = 'talking-guy';
                        blackGuysVideo.pause();
                        blackGuysVideo.classList.remove('opacity-100');
                        blackGuysVideo.classList.add('opacity-0');
                        talkingGuyVideo.classList.remove('opacity-0');
                        talkingGuyVideo.classList.add('opacity-100');
                        talkingGuyVideo.currentTime = 0;
                        if (talkingGuyVideo.readyState >= 2) {
                            talkingGuyVideo.play().catch(function(error) {
                                console.error('Talking guy video play failed (fallback):', error);
                            });
                        } else {
                            talkingGuyVideo.addEventListener('canplay', function playWhenReady() {
                                talkingGuyVideo.removeEventListener('canplay', playWhenReady);
                                talkingGuyVideo.play().catch(function(error) {
                                    console.error('Talking guy video play failed after canplay (fallback):', error);
                                });
                            }, { once: true });
                            talkingGuyVideo.load();
                        }
                        setTimeout(() => { transitionInProgress = false; }, 1000);
                    }
                }, 6000);
                setTimeout(() => { transitionInProgress = false; }, 1000);
            }
        });
        
        // Black guys video: Play for 5 seconds, then fade to talking guy (white guy on stage) OR skip to Islamic class if talking guy failed
        blackGuysVideo.addEventListener('timeupdate', function() {
            // Use fixed 5 seconds instead of half duration for reliability
            const transitionTime = 5;
            if (this.currentTime >= transitionTime && currentVideo === 'black-guys' && !transitionInProgress) {
                transitionInProgress = true;
                
                // If talking guy video failed to load, skip it and go directly back to Islamic class
                // But first ensure black guys video stays visible to avoid gray screen
                if (talkingGuyVideoFailed || talkingGuyVideo.error) {
                    console.log('Skipping talking guy video (failed to load), transitioning directly to Islamic class');
                    // Keep black guys video visible during transition to prevent gray screen
                    currentVideo = 'islamic-class';
                    blackGuysVideo.pause();
                    // Fade transition instead of immediate switch
                    blackGuysVideo.classList.add('opacity-0');
                    setTimeout(() => {
                        blackGuysVideo.classList.remove('opacity-100');
                    }, 500);
                    islamicClassVideo.classList.remove('opacity-0');
                    islamicClassVideo.classList.add('opacity-100');
                    islamicClassVideo.currentTime = 0;
                    if (islamicClassVideo.readyState >= 2) {
                        islamicClassVideo.play().catch(function(error) {
                            console.error('Islamic class video play failed:', error);
                        });
                    } else {
                        islamicClassVideo.addEventListener('canplay', function playWhenReady() {
                            islamicClassVideo.removeEventListener('canplay', playWhenReady);
                            islamicClassVideo.play().catch(function(error) {
                                console.error('Islamic class video play failed after canplay:', error);
                            });
                        }, { once: true });
                        islamicClassVideo.load();
                    }
                    setTimeout(() => { transitionInProgress = false; }, 1000);
                    return;
                }
                
                // Normal transition to talking guy video
                console.log('Transitioning from Black guys to Talking guy at', this.currentTime, 'seconds');
                currentVideo = 'talking-guy';
                // Pause and fade out black guys, fade in talking guy
                blackGuysVideo.pause();
                blackGuysVideo.classList.remove('opacity-100');
                blackGuysVideo.classList.add('opacity-0');
                talkingGuyVideo.classList.remove('opacity-0');
                talkingGuyVideo.classList.add('opacity-100');
                talkingGuyVideo.currentTime = 0;
                // Ensure talking guy video is ready before playing
                if (talkingGuyVideo.readyState >= 2) { // HAVE_CURRENT_DATA or better
                    talkingGuyVideo.play().catch(function(error) {
                        console.error('Talking guy video play failed:', error);
                        // If play fails, mark as failed and transition to Islamic class
                        talkingGuyVideoFailed = true;
                        setTimeout(() => {
                            if (currentVideo === 'talking-guy' && !transitionInProgress) {
                                currentVideo = 'islamic-class';
                                talkingGuyVideo.pause();
                                talkingGuyVideo.classList.remove('opacity-100');
                                talkingGuyVideo.classList.add('opacity-0');
                                islamicClassVideo.classList.remove('opacity-0');
                                islamicClassVideo.classList.add('opacity-100');
                                islamicClassVideo.currentTime = 0;
                                islamicClassVideo.play().catch(function(err) {
                                    console.error('Islamic class video play failed:', err);
                                });
                                transitionInProgress = false;
                            }
                        }, 500);
                    });
                } else {
                    // Wait for video to be ready
                    talkingGuyVideo.addEventListener('canplay', function playWhenReady() {
                        talkingGuyVideo.removeEventListener('canplay', playWhenReady);
                        talkingGuyVideo.play().catch(function(error) {
                            console.error('Talking guy video play failed after canplay:', error);
                            // If play fails, mark as failed and transition to Islamic class
                            talkingGuyVideoFailed = true;
                            setTimeout(() => {
                                if (currentVideo === 'talking-guy' && !transitionInProgress) {
                                    currentVideo = 'islamic-class';
                                    talkingGuyVideo.pause();
                                    talkingGuyVideo.classList.remove('opacity-100');
                                    talkingGuyVideo.classList.add('opacity-0');
                                    islamicClassVideo.classList.remove('opacity-0');
                                    islamicClassVideo.classList.add('opacity-100');
                                    islamicClassVideo.currentTime = 0;
                                    islamicClassVideo.play().catch(function(err) {
                                        console.error('Islamic class video play failed:', err);
                                    });
                                    transitionInProgress = false;
                                }
                            }, 500);
                        });
                    }, { once: true });
                    talkingGuyVideo.load();
                }
                // Fallback: if talking guy video doesn't transition after 6 seconds, force transition back to Islamic class
                setTimeout(() => {
                    if (currentVideo === 'talking-guy' && !transitionInProgress) {
                        console.log('Fallback: Forcing transition from Talking guy to Islamic class');
                        transitionInProgress = true;
                        currentVideo = 'islamic-class';
                        talkingGuyVideo.pause();
                        talkingGuyVideo.classList.remove('opacity-100');
                        talkingGuyVideo.classList.add('opacity-0');
                        islamicClassVideo.classList.remove('opacity-0');
                        islamicClassVideo.classList.add('opacity-100');
                        islamicClassVideo.currentTime = 0;
                        if (islamicClassVideo.readyState >= 2) {
                            islamicClassVideo.play().catch(function(error) {
                                console.error('Islamic class video play failed (fallback):', error);
                            });
                        } else {
                            islamicClassVideo.addEventListener('canplay', function playWhenReady() {
                                islamicClassVideo.removeEventListener('canplay', playWhenReady);
                                islamicClassVideo.play().catch(function(error) {
                                    console.error('Islamic class video play failed after canplay (fallback):', error);
                                });
                            }, { once: true });
                            islamicClassVideo.load();
                        }
                        setTimeout(() => { transitionInProgress = false; }, 1000);
                    }
                }, 6000);
                setTimeout(() => { transitionInProgress = false; }, 1000);
            }
        });
        
        // Talking guy video (white guy on stage): Play for 5 seconds, then fade back to Islamic class
        talkingGuyVideo.addEventListener('timeupdate', function() {
            if (this.currentTime >= 5 && currentVideo === 'talking-guy' && !transitionInProgress) {
                console.log('Transitioning from Talking guy to Islamic class at', this.currentTime, 'seconds');
                transitionInProgress = true;
                currentVideo = 'islamic-class';
                // Pause and fade out talking guy, fade in Islamic class
                talkingGuyVideo.pause();
                talkingGuyVideo.classList.remove('opacity-100');
                talkingGuyVideo.classList.add('opacity-0');
                islamicClassVideo.classList.remove('opacity-0');
                islamicClassVideo.classList.add('opacity-100');
                islamicClassVideo.currentTime = 0;
                // Ensure Islamic class video is ready before playing
                if (islamicClassVideo.readyState >= 2) {
                    islamicClassVideo.play().catch(function(error) {
                        console.error('Islamic class video play failed:', error);
                    });
                } else {
                    islamicClassVideo.addEventListener('canplay', function playWhenReady() {
                        islamicClassVideo.removeEventListener('canplay', playWhenReady);
                        islamicClassVideo.play().catch(function(error) {
                            console.error('Islamic class video play failed after canplay:', error);
                        });
                    }, { once: true });
                    islamicClassVideo.load();
                }
                setTimeout(() => { transitionInProgress = false; }, 1000);
            }
        });
        
        // Handle video end events as fallback
        islamicClassVideo.addEventListener('ended', function() {
            if (currentVideo === 'islamic-class' && !transitionInProgress) {
                console.log('Islamic class video ended, transitioning to Black guys');
                transitionInProgress = true;
                currentVideo = 'black-guys';
                islamicClassVideo.pause();
                islamicClassVideo.classList.remove('opacity-100');
                islamicClassVideo.classList.add('opacity-0');
                blackGuysVideo.classList.remove('opacity-0');
                blackGuysVideo.classList.add('opacity-100');
                blackGuysVideo.currentTime = 0;
                blackGuysVideo.play().catch(function(error) {
                    console.error('Black guys video play failed:', error);
                });
                setTimeout(() => { transitionInProgress = false; }, 1000);
            }
        });
        
        blackGuysVideo.addEventListener('ended', function() {
            if (currentVideo === 'black-guys' && !transitionInProgress) {
                transitionInProgress = true;
                
                // If talking guy video failed to load, skip it and go directly back to Islamic class
                if (talkingGuyVideoFailed || talkingGuyVideo.error) {
                    console.log('Black guys video ended, skipping talking guy (failed to load), transitioning to Islamic class');
                    currentVideo = 'islamic-class';
                    blackGuysVideo.pause();
                    blackGuysVideo.classList.remove('opacity-100');
                    blackGuysVideo.classList.add('opacity-0');
                    islamicClassVideo.classList.remove('opacity-0');
                    islamicClassVideo.classList.add('opacity-100');
                    islamicClassVideo.currentTime = 0;
                    if (islamicClassVideo.readyState >= 2) {
                        islamicClassVideo.play().catch(function(error) {
                            console.error('Islamic class video play failed:', error);
                        });
                    } else {
                        islamicClassVideo.addEventListener('canplay', function playWhenReady() {
                            islamicClassVideo.removeEventListener('canplay', playWhenReady);
                            islamicClassVideo.play().catch(function(error) {
                                console.error('Islamic class video play failed after canplay:', error);
                            });
                        }, { once: true });
                        islamicClassVideo.load();
                    }
                    setTimeout(() => { transitionInProgress = false; }, 1000);
                    return;
                }
                
                console.log('Black guys video ended, transitioning to Talking guy');
                currentVideo = 'talking-guy';
                blackGuysVideo.pause();
                blackGuysVideo.classList.remove('opacity-100');
                blackGuysVideo.classList.add('opacity-0');
                talkingGuyVideo.classList.remove('opacity-0');
                talkingGuyVideo.classList.add('opacity-100');
                talkingGuyVideo.currentTime = 0;
                // Ensure talking guy video is ready before playing
                if (talkingGuyVideo.readyState >= 2) {
                    talkingGuyVideo.play().catch(function(error) {
                        console.error('Talking guy video play failed:', error);
                        // If play fails, mark as failed and transition to Islamic class
                        talkingGuyVideoFailed = true;
                        setTimeout(() => {
                            if (currentVideo === 'talking-guy' && !transitionInProgress) {
                                currentVideo = 'islamic-class';
                                talkingGuyVideo.pause();
                                talkingGuyVideo.classList.remove('opacity-100');
                                talkingGuyVideo.classList.add('opacity-0');
                                islamicClassVideo.classList.remove('opacity-0');
                                islamicClassVideo.classList.add('opacity-100');
                                islamicClassVideo.currentTime = 0;
                                islamicClassVideo.play().catch(function(err) {
                                    console.error('Islamic class video play failed:', err);
                                });
                                transitionInProgress = false;
                            }
                        }, 500);
                    });
                } else {
                    talkingGuyVideo.addEventListener('canplay', function playWhenReady() {
                        talkingGuyVideo.removeEventListener('canplay', playWhenReady);
                        talkingGuyVideo.play().catch(function(error) {
                            console.error('Talking guy video play failed after canplay:', error);
                            // If play fails, mark as failed and transition to Islamic class
                            talkingGuyVideoFailed = true;
                            setTimeout(() => {
                                if (currentVideo === 'talking-guy' && !transitionInProgress) {
                                    currentVideo = 'islamic-class';
                                    talkingGuyVideo.pause();
                                    talkingGuyVideo.classList.remove('opacity-100');
                                    talkingGuyVideo.classList.add('opacity-0');
                                    islamicClassVideo.classList.remove('opacity-0');
                                    islamicClassVideo.classList.add('opacity-100');
                                    islamicClassVideo.currentTime = 0;
                                    islamicClassVideo.play().catch(function(err) {
                                        console.error('Islamic class video play failed:', err);
                                    });
                                    transitionInProgress = false;
                                }
                            }, 500);
                        });
                    }, { once: true });
                    talkingGuyVideo.load();
                }
                setTimeout(() => { transitionInProgress = false; }, 1000);
            }
        });
        
        talkingGuyVideo.addEventListener('ended', function() {
            if (currentVideo === 'talking-guy' && !transitionInProgress) {
                console.log('Talking guy video ended, transitioning to Islamic class');
                transitionInProgress = true;
                currentVideo = 'islamic-class';
                talkingGuyVideo.pause();
                talkingGuyVideo.classList.remove('opacity-100');
                talkingGuyVideo.classList.add('opacity-0');
                islamicClassVideo.classList.remove('opacity-0');
                islamicClassVideo.classList.add('opacity-100');
                islamicClassVideo.currentTime = 0;
                // Ensure Islamic class video is ready before playing
                if (islamicClassVideo.readyState >= 2) {
                    islamicClassVideo.play().catch(function(error) {
                        console.error('Islamic class video play failed:', error);
                    });
                } else {
                    islamicClassVideo.addEventListener('canplay', function playWhenReady() {
                        islamicClassVideo.removeEventListener('canplay', playWhenReady);
                        islamicClassVideo.play().catch(function(error) {
                            console.error('Islamic class video play failed after canplay:', error);
                        });
                    }, { once: true });
                    islamicClassVideo.load();
                }
                setTimeout(() => { transitionInProgress = false; }, 1000);
            }
        });
        
        // Ensure videos keep playing if they pause unexpectedly
        [islamicClassVideo, talkingGuyVideo, blackGuysVideo].forEach(video => {
            video.addEventListener('pause', function() {
                if (this.classList.contains('opacity-100') && !this.ended) {
                    this.play().catch(function(error) {
                        console.log('Video play failed:', error);
                    });
                }
            });
        });
    }
});

