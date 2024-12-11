export const capturePageView = (url: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture('$pageview', {
      current_url: url,
      ...properties,
    });
  }
};
