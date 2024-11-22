export function initializeTOC() {
  function handleTOCClick() {
    // Adjust selector to match TOC links
    document.querySelectorAll('aside a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (!href) return;

        const targetId = href.replace('#', '');
        // Look for either id or href matching the target
        const targetElement = document.querySelector(`#${targetId}, a[href="#${targetId}"]`);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          history.pushState(null, '', href);
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
