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
    const quarterReached = Math.floor(depth / 25) * 25;
    window.posthog.capture('scroll_depth', {
      depth_percentage: quarterReached,
      page_url: window.location.href,
      is_milestone: [25, 50, 75, 100].includes(quarterReached),
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
    const wordCount = postData.content.trim().split(/\s+/).length;
    window.posthog.capture('blog_engagement', {
      post_title: postData.title,
      post_author: postData.author,
      post_date: postData.pubDate,
      post_word_count: wordCount,
      post_read_time: Math.ceil(wordCount / 200),
      page_url: window.location.href,
    });
  }
};
