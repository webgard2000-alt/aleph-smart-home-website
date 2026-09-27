/**
 * ALEPH SMART HOME - Main JavaScript
 * Hero Video system with real loading progress & random selection
 */

(function () {
  'use strict';

  // ========== HERO VIDEO SYSTEM ==========
  const HERO_VIDEOS = [
    'assets/videos/hero-villa-1.mp4',
    'assets/videos/hero-villa-2.mp4',
    'assets/videos/hero-villa-3.mp4',
    'assets/videos/hero-villa-4.mp4',
    'assets/videos/hero-villa-5.mp4'
  ];

  const STORAGE_KEY = 'aleph_last_hero_video';
  const FALLBACK_TIMEOUT = 12000; // 12s max wait

  function getRandomVideo() {
    let last = null;
    try {
      last = localStorage.getItem(STORAGE_KEY);
    } catch (e) {}

    let candidates = HERO_VIDEOS.filter(v => v !== last);
    if (candidates.length === 0) candidates = HERO_VIDEOS;

    const selected = candidates[Math.floor(Math.random() * candidates.length)];
    try {
      localStorage.setItem(STORAGE_KEY, selected);
    } catch (e) {}
    return selected;
  }

  function initHeroVideo() {
    const loader = document.getElementById('page-loader');
    const progressBar = document.getElementById('loader-progress');
    const progressPercent = document.getElementById('loader-percent');
    const video = document.getElementById('hero-video');
    const poster = document.getElementById('hero-poster');

    if (!loader || !video) return;

    let progress = 0;
    let hasPlayed = false;
    let fallbackTriggered = false;

    function updateProgress(value) {
      progress = Math.min(100, Math.max(progress, value));
      if (progressBar) progressBar.style.width = progress + '%';
      if (progressPercent) progressPercent.textContent = Math.round(progress) + '%';
    }

    function hideLoader() {
      if (hasPlayed) return;
      hasPlayed = true;
      updateProgress(100);
      setTimeout(() => {
        loader.classList.add('hidden');
        video.classList.add('ready');
      }, 350);
    }

    function showFallback() {
      if (fallbackTriggered || hasPlayed) return;
      fallbackTriggered = true;
      if (poster) poster.style.display = 'block';
      video.style.display = 'none';
      hideLoader();
    }

    // Select and set video source
    const src = getRandomVideo();
    video.src = src;
    video.poster = 'assets/images/hero-poster.jpg';

    // Timeout fallback
    const timeoutId = setTimeout(showFallback, FALLBACK_TIMEOUT);

    // Video events for real progress
    video.addEventListener('loadstart', () => updateProgress(5));
    video.addEventListener('loadedmetadata', () => updateProgress(20));
    video.addEventListener('loadeddata', () => updateProgress(40));
    video.addEventListener('canplay', () => updateProgress(70));
    video.addEventListener('canplaythrough', () => updateProgress(90));

    video.addEventListener('progress', () => {
      if (video.buffered.length > 0 && video.duration > 0) {
        const buffered = video.buffered.end(video.buffered.length - 1);
        const pct = (buffered / video.duration) * 80 + 10;
        updateProgress(pct);
      }
    });

    // Critical: hide loader only when actually playing
    video.addEventListener('playing', () => {
      clearTimeout(timeoutId);
      hideLoader();
    });

    video.addEventListener('play', () => {
      // Some browsers fire play before playing
      updateProgress(95);
    });

    video.addEventListener('error', () => {
      clearTimeout(timeoutId);
      showFallback();
    });

    video.addEventListener('stalled', () => {
      // Optional: could show a subtle message
    });

    // Start loading & attempt play
    video.load();
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked - still try to show after short delay if canplay
        video.addEventListener('canplay', () => {
          setTimeout(() => {
            if (!hasPlayed) {
              // User interaction may be needed, but hide loader so site is usable
              hideLoader();
            }
          }, 800);
        }, { once: true });
      });
    }
  }

  // ========== NAVIGATION ==========
  function initNav() {
    const nav = document.getElementById('main-nav');
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');

    if (nav) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }, { passive: true });
    }

    if (toggle && links) {
      toggle.addEventListener('click', () => {
        links.classList.toggle('open');
        toggle.classList.toggle('active');
      });

      // Close on link click (mobile)
      links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          links.classList.remove('open');
          toggle.classList.remove('active');
        });
      });
    }
  }

  // ========== REVEAL ON SCROLL (subtle) ==========
  function initReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => observer.observe(el));
  }

  // ========== INIT ==========
  document.addEventListener('DOMContentLoaded', () => {
    initHeroVideo();
    initNav();
    initReveal();
  });
})();
