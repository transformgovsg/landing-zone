// src/scripts/toc.ts

export function initializeTOC() {
  function handleTOCClick() {
    document.querySelectorAll('aside a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (!href) return;

        const targetId = href.slice(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
            history.pushState(null, '', href);
          }, 0);
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
        const id = entry.target.getAttribute('id');
        if (!id) return;

        const tocLink = document.querySelector(`aside a[href="#${id}"]`);

        if (entry.isIntersecting) {
          document.querySelectorAll('aside a').forEach((link) => {
            link.classList.remove('active');
          });

          tocLink?.classList.add('active');

          if (tocLink) {
            const tocNav = document.querySelector('nav.toc-scrollbar');
            if (tocNav) {
              const linkRect = tocLink.getBoundingClientRect();
              const navRect = tocNav.getBoundingClientRect();

              if (linkRect.top < navRect.top || linkRect.bottom > navRect.bottom) {
                tocLink.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                });
              }
            }
          }
        }
      });
    }, observerOptions);

    document
      .querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')
      .forEach((heading) => {
        observer.observe(heading);
      });
  }

  handleTOCClick();
  setupIntersectionObserver();
}
