export function initializeTOC() {
  // Flag to prevent auto-scroll during manual clicks
  let isManualScroll = false;
  let scrollTimeout: number | null = null;
  let tocScrollTimeout: number | null = null;

  function handleTOCClick() {
    // Adjust selector to match TOC links
    document.querySelectorAll('aside a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (!href) return;

        isManualScroll = true;
        if (scrollTimeout) {
          window.clearTimeout(scrollTimeout);
        }

        const targetId = href.replace('#', '');
        // Look for either id or href matching the target
        const targetElement = document.querySelector(`#${targetId}, a[href="#${targetId}"]`);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          history.pushState(null, '', href);

          // Reset the flag after the smooth scroll animation
          scrollTimeout = window.setTimeout(() => {
            isManualScroll = false;
          }, 1000); // 1 second should cover most smooth scroll durations
        }
      });
    });
  }

  function scrollTOCToActive(tocLink: Element) {
    if (tocScrollTimeout) {
      window.clearTimeout(tocScrollTimeout);
    }

    tocScrollTimeout = window.setTimeout(() => {
      const tocNav = document.querySelector('.toc-scrollbar');
      if (!tocNav) return;

      const tocNavRect = tocNav.getBoundingClientRect();
      const tocLinkRect = tocLink.getBoundingClientRect();

      if (tocLinkRect.top < tocNavRect.top || tocLinkRect.bottom > tocNavRect.bottom) {
        tocNav.scrollTo({
          top: tocNav.scrollTop + (tocLinkRect.top - tocNavRect.top) - tocNavRect.height / 2,
          behavior: 'smooth',
        });
      }
    }, 150); // Debounce time for scroll events
  }

  function setupIntersectionObserver() {
    const observerOptions = {
      rootMargin: '0px 0px -80% 0px',
      threshold: [0, 1.0],
    };

    const observer = new IntersectionObserver((entries) => {
      // Filter for visible headings
      const visibleHeadings = entries.filter((entry) => entry.isIntersecting);

      if (visibleHeadings.length === 0) return;

      // Get the topmost visible heading
      const topmostHeading = visibleHeadings.reduce((prev, current) => {
        const prevRect = prev.target.getBoundingClientRect();
        const currentRect = current.target.getBoundingClientRect();
        return prevRect.top <= currentRect.top ? prev : current;
      });

      // Look for the anchor tag within the heading
      const anchor = topmostHeading.target.querySelector('a[href^="#"]');
      const href = anchor?.getAttribute('href');
      if (!href) return;

      const tocLink = document.querySelector(`aside a[href="${href}"]`);

      // Remove active class from all links
      document.querySelectorAll('aside a[href^="#"]').forEach((link) => {
        link.classList.remove('active');
      });

      // Add active class to current link
      tocLink?.classList.add('active');

      // Only auto-scroll if not triggered by manual click
      if (!isManualScroll && tocLink) {
        scrollTOCToActive(tocLink);
      }
    }, observerOptions);

    // Observe the heading elements directly
    document
      .querySelectorAll('h1, h2, h3, h4, h5, h6')
      .forEach((heading) => observer.observe(heading));
  }

  function initializeMobileTOC() {
    const toggleButton = document.querySelector('.mobile-toc-toggle');
    const tocContent = document.querySelector('#mobile-toc-content');
    const chevron = toggleButton?.querySelector('svg');

    if (!toggleButton || !tocContent || !chevron) return;

    const createBackdrop = () => {
      const backdrop = document.createElement('div');
      backdrop.className = 'mobile-toc-backdrop hidden';
      document.body.appendChild(backdrop);
      return backdrop;
    };

    const backdrop = createBackdrop();

    const closeMobileTOC = () => {
      tocContent.classList.add('hidden');
      tocContent.classList.remove('show');
      backdrop.classList.add('hidden');
      toggleButton.setAttribute('aria-expanded', 'false');
      chevron.style.transform = 'rotate(0deg)';
      document.body.style.overflow = '';
    };

    const openMobileTOC = () => {
      tocContent.classList.remove('hidden');
      tocContent.classList.add('show');
      backdrop.classList.remove('hidden');
      toggleButton.setAttribute('aria-expanded', 'true');
      chevron.style.transform = 'rotate(180deg)';
      document.body.style.overflow = 'hidden';
    };

    toggleButton.addEventListener('click', () => {
      const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileTOC();
      } else {
        openMobileTOC();
      }
    });

    // Close TOC when clicking outside
    backdrop.addEventListener('click', closeMobileTOC);

    // Close TOC when clicking a link
    const tocLinks = tocContent.querySelectorAll('a');
    tocLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
          // lg breakpoint
          closeMobileTOC();
        }
      });
    });

    // Close TOC when pressing Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggleButton.getAttribute('aria-expanded') === 'true') {
        closeMobileTOC();
      }
    });
  }

  // Initialize both desktop and mobile functionality
  handleTOCClick();
  setupIntersectionObserver();
  initializeMobileTOC();
}
