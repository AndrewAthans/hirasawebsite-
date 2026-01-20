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
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/8941d077-9b25-4251-ad0e-d8175bee18e5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:199',message:'Video error event',data:{videoName:names[index],errorCode:video.error?.code,errorMessage:video.error?.message,networkState:video.networkState,readyState:video.readyState},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:index==1?'A':'E'})}).catch(()=>{});
                // #endregion
                // If talking guy video fails, mark it as failed and skip it in transitions
                if (names[index] === 'talking-guy') {
                    talkingGuyVideoFailed = true;
                    console.warn('Talking guy video failed to load, will skip it in slideshow');
                    // #region agent log
                    fetch('http://127.0.0.1:7242/ingest/8941d077-9b25-4251-ad0e-d8175bee18e5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:204',message:'Talking guy video marked as failed',data:{talkingGuyVideoFailed:true,errorCode:video.error?.code},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
                    // #endregion
                }
            });
            video.addEventListener('loadeddata', function() {
                console.log(`${names[index]} video loaded, duration:`, video.duration);
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/8941d077-9b25-4251-ad0e-d8175bee18e5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:209',message:'Video loadeddata event',data:{videoName:names[index],duration:video.duration,readyState:video.readyState},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:index==1?'B':'E'})}).catch(()=>{});
                // #endregion
            });
            if (names[index] === 'talking-guy') {
                video.addEventListener('loadedmetadata', function() {
                    // #region agent log
                    fetch('http://127.0.0.1:7242/ingest/8941d077-9b25-4251-ad0e-d8175bee18e5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:214',message:'Talking guy video loadedmetadata',data:{duration:video.duration,readyState:video.readyState,networkState:video.networkState},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
                    // #endregion
                });
                video.addEventListener('canplay', function() {
                    // #region agent log
                    fetch('http://127.0.0.1:7242/ingest/8941d077-9b25-4251-ad0e-d8175bee18e5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:220',message:'Talking guy video canplay event',data:{readyState:video.readyState},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
                    // #endregion
                });
            }
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
            console.log('Islamic class video ready, starting playback');
            console.log('Islamic class video duration:', this.duration);
            console.log('Islamic class video readyState:', this.readyState);
            islamicClassVideo.play().catch(function(error) {
                console.error('Islamic class video play failed:', error);
            });
        });
        
        // Ensure video plays when it becomes visible
        islamicClassVideo.addEventListener('canplay', function() {
            console.log('Islamic class video can play');
            if (currentVideo === 'islamic-class' && this.paused) {
                console.log('Islamic class video can play, resuming');
                this.play().catch(function(error) {
                    console.error('Video play failed:', error);
                });
            }
        });
        
        // Add loadeddata event to ensure video is ready
        islamicClassVideo.addEventListener('loadeddata', function() {
            console.log('Islamic class video loadeddata event fired');
            if (currentVideo === 'islamic-class' && this.paused) {
                this.play().catch(function(error) {
                    console.error('Video play failed on loadeddata:', error);
                });
            }
        });
        
        // Force play attempt after a short delay if video hasn't started
        setTimeout(() => {
            if (islamicClassVideo.paused && currentVideo === 'islamic-class') {
                console.log('Force attempting to play Islamic class video');
                islamicClassVideo.play().catch(function(error) {
                    console.error('Force play failed:', error);
                });
            }
        }, 1000);
        
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
            // #region agent log
            if (this.currentTime >= transitionTime - 0.5 && this.currentTime < transitionTime + 0.5 && currentVideo === 'black-guys') {
                fetch('http://127.0.0.1:7242/ingest/8941d077-9b25-4251-ad0e-d8175bee18e5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:323',message:'Black guys video near transition time',data:{currentTime:this.currentTime,transitionTime:transitionTime,currentVideo:currentVideo,transitionInProgress:transitionInProgress,talkingGuyVideoFailed:talkingGuyVideoFailed,talkingGuyError:talkingGuyVideo.error,talkingGuyReadyState:talkingGuyVideo.readyState},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
            }
            // #endregion
            if (this.currentTime >= transitionTime && currentVideo === 'black-guys' && !transitionInProgress) {
                transitionInProgress = true;
                
                // If talking guy video failed to load, skip it and go directly back to Islamic class
                if (talkingGuyVideoFailed || talkingGuyVideo.error) {
                    console.log('Skipping talking guy video (failed to load), transitioning directly to Islamic class');
                    // #region agent log
                    fetch('http://127.0.0.1:7242/ingest/8941d077-9b25-4251-ad0e-d8175bee18e5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:328',message:'Skipping talking guy video due to failure',data:{talkingGuyVideoFailed:talkingGuyVideoFailed,talkingGuyError:talkingGuyVideo.error?.code},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
                    // #endregion
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
                
                // Normal transition to talking guy video
                console.log('Transitioning from Black guys to Talking guy at', this.currentTime, 'seconds');
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/8941d077-9b25-4251-ad0e-d8175bee18e5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:354',message:'Starting transition to talking guy video',data:{talkingGuyReadyState:talkingGuyVideo.readyState,talkingGuyNetworkState:talkingGuyVideo.networkState,talkingGuyError:talkingGuyVideo.error},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
                // #endregion
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
                    // #region agent log
                    fetch('http://127.0.0.1:7242/ingest/8941d077-9b25-4251-ad0e-d8175bee18e5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:365',message:'Talking guy readyState >= 2, attempting play',data:{readyState:talkingGuyVideo.readyState},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
                    // #endregion
                    talkingGuyVideo.play().then(function() {
                        // #region agent log
                        fetch('http://127.0.0.1:7242/ingest/8941d077-9b25-4251-ad0e-d8175bee18e5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:368',message:'Talking guy video play() succeeded',data:{paused:talkingGuyVideo.paused},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
                        // #endregion
                    }).catch(function(error) {
                        console.error('Talking guy video play failed:', error);
                        // #region agent log
                        fetch('http://127.0.0.1:7242/ingest/8941d077-9b25-4251-ad0e-d8175bee18e5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:372',message:'Talking guy video play() rejected',data:{errorName:error?.name,errorMessage:error?.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
                        // #endregion
                        // If play fails, mark as failed and transition to Islamic class
                        talkingGuyVideoFailed = true;
                        // #region agent log
                        fetch('http://127.0.0.1:7242/ingest/8941d077-9b25-4251-ad0e-d8175bee18e5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:375',message:'Talking guy video marked as failed after play rejection',data:{talkingGuyVideoFailed:true},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
                        // #endregion
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
                    // #region agent log
                    fetch('http://127.0.0.1:7242/ingest/8941d077-9b25-4251-ad0e-d8175bee18e5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:384',message:'Talking guy readyState < 2, waiting for canplay',data:{readyState:talkingGuyVideo.readyState},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
                    // #endregion
                    // Wait for video to be ready
                    talkingGuyVideo.addEventListener('canplay', function playWhenReady() {
                        talkingGuyVideo.removeEventListener('canplay', playWhenReady);
                        // #region agent log
                        fetch('http://127.0.0.1:7242/ingest/8941d077-9b25-4251-ad0e-d8175bee18e5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:388',message:'Talking guy canplay event fired, attempting play',data:{readyState:talkingGuyVideo.readyState},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
                        // #endregion
                        talkingGuyVideo.play().then(function() {
                            // #region agent log
                            fetch('http://127.0.0.1:7242/ingest/8941d077-9b25-4251-ad0e-d8175bee18e5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:391',message:'Talking guy video play() succeeded after canplay',data:{paused:talkingGuyVideo.paused},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
                            // #endregion
                        }).catch(function(error) {
                            console.error('Talking guy video play failed after canplay:', error);
                            // #region agent log
                            fetch('http://127.0.0.1:7242/ingest/8941d077-9b25-4251-ad0e-d8175bee18e5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:395',message:'Talking guy video play() rejected after canplay',data:{errorName:error?.name,errorMessage:error?.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
                            // #endregion
                            // If play fails, mark as failed and transition to Islamic class
                            talkingGuyVideoFailed = true;
                            // #region agent log
                            fetch('http://127.0.0.1:7242/ingest/8941d077-9b25-4251-ad0e-d8175bee18e5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:398',message:'Talking guy video marked as failed after canplay play rejection',data:{talkingGuyVideoFailed:true},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
                            // #endregion
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

