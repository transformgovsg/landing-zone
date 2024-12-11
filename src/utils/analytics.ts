export const capturePageView = (url: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture('$pageview', {
      current_url: url,
      ...properties,
    });
  }
};

// Track time spent on page
export const captureTimeOnPage = (startTime: number) => {
  if (typeof window !== 'undefined' && window.posthog) {
    const timeSpentMs = Date.now() - startTime;
    window.posthog.capture('time_on_page', {
      duration_seconds: Math.floor(timeSpentMs / 1000),
      page_url: window.location.href,
    });
  }
};

// Track scroll depth
export const captureScrollDepth = (depth: number) => {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture('scroll_depth', {
      depth_percentage: depth,
      page_url: window.location.href,
    });
  }
};

// Track click events
export const captureClick = (elementId: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture('element_click', {
      element_id: elementId,
      page_url: window.location.href,
      ...properties,
    });
  }
};

// Track blog post engagement
export const captureBlogEngagement = (postData: {
  title: string;
  author: string;
  pubDate: string;
  content: string;
}) => {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture('blog_engagement', {
      post_title: postData.title,
      post_author: postData.author,
      post_date: postData.pubDate,
      post_word_count: postData.content.split(' ').length,
      post_read_time: Math.ceil(postData.content.split(' ').length / 200), // Assuming 200 words per minute
      page_url: window.location.href,
    });
  }
};
