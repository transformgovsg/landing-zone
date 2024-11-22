export function initializeTOC() {
  // Flag to prevent auto-scroll during manual clicks
  let isManualScroll = false;
  let scrollTimeout: number | null = null;

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

  function setupIntersectionObserver() {
    const observerOptions = {
      rootMargin: '-100px 0px -40% 0px',
      threshold: [0, 1.0],
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Look for the anchor tag within the heading
        const anchor = entry.target.querySelector('a[href^="#"]');
        const href = anchor?.getAttribute('href');
        if (!href) return;

        const tocLink = document.querySelector(`aside a[href="${href}"]`);

        if (entry.isIntersecting) {
          document.querySelectorAll('aside a[href^="#"]').forEach((link) => {
            link.classList.remove('active');
          });

          tocLink?.classList.add('active');

          // Only auto-scroll if not triggered by manual click
          if (!isManualScroll && tocLink) {
            const tocNav = document.querySelector('.toc-scrollbar');
            if (tocNav) {
              const tocNavRect = tocNav.getBoundingClientRect();
              const tocLinkRect = tocLink.getBoundingClientRect();

              if (tocLinkRect.top < tocNavRect.top || tocLinkRect.bottom > tocNavRect.bottom) {
                tocLink.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                });
              }
            }
          }
        }
      });
    }, observerOptions);

    // Observe the heading elements directly
    document
      .querySelectorAll('h1, h2, h3, h4, h5, h6')
      .forEach((heading) => observer.observe(heading));
  }

  handleTOCClick();
  setupIntersectionObserver();
}
