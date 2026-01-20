// Mobile menu toggle and dropdown interactions
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');

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

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle hamburger icon
            const icon = mobileMenuBtn.querySelector('svg');
            if (icon) {
                if (mobileMenu.classList.contains('hidden')) {
                    // Show hamburger
                    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
                } else {
                    // Show X
                    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
                }
            }
        });
    }

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
            
            // Close menu when link is clicked
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('svg');
                if (icon) {
                    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
                }
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

    // Video Slideshow Logic - Three videos in order: Islamic class (school) → Black guys → Talking guy (white guy on stage)
    const talkingGuyVideo = document.getElementById('talking-guy-video');
    const blackGuysVideo = document.getElementById('black-guys-video');
    const islamicClassVideo = document.getElementById('islamic-class-video');
    
    if (talkingGuyVideo && blackGuysVideo && islamicClassVideo) {
        let currentVideo = 'islamic-class'; // Start with Islamic class video (school classroom)
        let blackGuysDuration = 0;
        let blackGuysHalfDuration = 0;
        let transitionInProgress = false; // Prevent multiple transitions
        
        // Preload all videos
        talkingGuyVideo.load();
        blackGuysVideo.load();
        islamicClassVideo.load();
        
        // Get black guys video duration when metadata loads
        blackGuysVideo.addEventListener('loadedmetadata', function() {
            blackGuysDuration = blackGuysVideo.duration;
            blackGuysHalfDuration = blackGuysDuration / 2;
        });
        
        // Start with Islamic class video (school classroom)
        islamicClassVideo.addEventListener('loadedmetadata', function() {
            islamicClassVideo.play().catch(function(error) {
                console.log('Video play failed:', error);
            });
        });
        
        // Ensure video plays when it becomes visible
        islamicClassVideo.addEventListener('canplay', function() {
            if (currentVideo === 'islamic-class' && this.paused) {
                this.play().catch(function(error) {
                    console.log('Video play failed:', error);
                });
            }
        });
        
        // Islamic class video (school classroom): Play for 8 seconds, then fade to black guys
        islamicClassVideo.addEventListener('timeupdate', function() {
            if (this.currentTime >= 8 && currentVideo === 'islamic-class' && !transitionInProgress) {
                transitionInProgress = true;
                currentVideo = 'black-guys';
                // Fade out Islamic class, fade in black guys
                islamicClassVideo.classList.remove('opacity-100');
                islamicClassVideo.classList.add('opacity-0');
                blackGuysVideo.classList.remove('opacity-0');
                blackGuysVideo.classList.add('opacity-100');
                blackGuysVideo.currentTime = 0;
                blackGuysVideo.play().catch(function(error) {
                    console.log('Video play failed:', error);
                });
                setTimeout(() => { transitionInProgress = false; }, 1000);
            }
        });
        
        // Black guys video: Play for half duration, then fade to talking guy (white guy on stage)
        blackGuysVideo.addEventListener('timeupdate', function() {
            if (this.currentTime >= blackGuysHalfDuration && currentVideo === 'black-guys' && !transitionInProgress && blackGuysHalfDuration > 0) {
                transitionInProgress = true;
                currentVideo = 'talking-guy';
                // Fade out black guys, fade in talking guy
                blackGuysVideo.classList.remove('opacity-100');
                blackGuysVideo.classList.add('opacity-0');
                talkingGuyVideo.classList.remove('opacity-0');
                talkingGuyVideo.classList.add('opacity-100');
                talkingGuyVideo.currentTime = 0;
                talkingGuyVideo.play().catch(function(error) {
                    console.log('Video play failed:', error);
                });
                setTimeout(() => { transitionInProgress = false; }, 1000);
            }
        });
        
        // Talking guy video (white guy on stage): Play for 5 seconds, then fade back to Islamic class
        talkingGuyVideo.addEventListener('timeupdate', function() {
            if (this.currentTime >= 5 && currentVideo === 'talking-guy' && !transitionInProgress) {
                transitionInProgress = true;
                currentVideo = 'islamic-class';
                // Fade out talking guy, fade in Islamic class
                talkingGuyVideo.classList.remove('opacity-100');
                talkingGuyVideo.classList.add('opacity-0');
                islamicClassVideo.classList.remove('opacity-0');
                islamicClassVideo.classList.add('opacity-100');
                islamicClassVideo.currentTime = 0;
                islamicClassVideo.play().catch(function(error) {
                    console.log('Video play failed:', error);
                });
                setTimeout(() => { transitionInProgress = false; }, 1000);
            }
        });
        
        // Handle video end events as fallback
        islamicClassVideo.addEventListener('ended', function() {
            if (currentVideo === 'islamic-class' && !transitionInProgress) {
                transitionInProgress = true;
                currentVideo = 'black-guys';
                islamicClassVideo.classList.remove('opacity-100');
                islamicClassVideo.classList.add('opacity-0');
                blackGuysVideo.classList.remove('opacity-0');
                blackGuysVideo.classList.add('opacity-100');
                blackGuysVideo.currentTime = 0;
                blackGuysVideo.play().catch(function(error) {
                    console.log('Video play failed:', error);
                });
                setTimeout(() => { transitionInProgress = false; }, 1000);
            }
        });
        
        blackGuysVideo.addEventListener('ended', function() {
            if (currentVideo === 'black-guys' && !transitionInProgress) {
                transitionInProgress = true;
                currentVideo = 'talking-guy';
                blackGuysVideo.classList.remove('opacity-100');
                blackGuysVideo.classList.add('opacity-0');
                talkingGuyVideo.classList.remove('opacity-0');
                talkingGuyVideo.classList.add('opacity-100');
                talkingGuyVideo.currentTime = 0;
                talkingGuyVideo.play().catch(function(error) {
                    console.log('Video play failed:', error);
                });
                setTimeout(() => { transitionInProgress = false; }, 1000);
            }
        });
        
        talkingGuyVideo.addEventListener('ended', function() {
            if (currentVideo === 'talking-guy' && !transitionInProgress) {
                transitionInProgress = true;
                currentVideo = 'islamic-class';
                talkingGuyVideo.classList.remove('opacity-100');
                talkingGuyVideo.classList.add('opacity-0');
                islamicClassVideo.classList.remove('opacity-0');
                islamicClassVideo.classList.add('opacity-100');
                islamicClassVideo.currentTime = 0;
                islamicClassVideo.play().catch(function(error) {
                    console.log('Video play failed:', error);
                });
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

