// Types for analytics events and properties
type AnalyticsEvent =
  | '$pageview'
  | 'time_on_page'
  | 'scroll_depth'
  | 'element_click'
  | 'blog_engagement';

interface BaseProperties {
  page_url: string;
}

interface PageViewProperties extends BaseProperties {
  current_url: string;
}

interface TimeOnPageProperties extends BaseProperties {
  duration_seconds: number;
}

interface ScrollDepthProperties extends BaseProperties {
  depth_percentage: number;
  is_milestone: boolean;
}

interface ClickProperties extends BaseProperties {
  element_id: string;
}

interface BlogEngagementProperties extends BaseProperties {
  post_title: string;
  post_author: string;
  post_date: string;
  post_word_count: number;
  post_read_time: number;
}

// Helper function to check if PostHog is available
const isPostHogAvailable = () => typeof window !== 'undefined' && window.posthog;

// Base analytics capture function with centralized error handling
const captureAnalytics = <T extends BaseProperties>(
  eventName: AnalyticsEvent,
  properties: Omit<T, 'page_url'> & Partial<BaseProperties>,
) => {
  try {
    if (isPostHogAvailable()) {
      window.posthog.capture(eventName, {
        page_url: window.location.href,
        ...properties,
      });
    }
  } catch (error) {
    console.error(`Error capturing ${eventName} event:`, error);
  }
};

export const capturePageView = (url: string, properties?: Partial<PageViewProperties>) => {
  captureAnalytics<PageViewProperties>('$pageview', { current_url: url, ...properties });
};

export const captureTimeOnPage = (startTime: number) => {
  captureAnalytics<TimeOnPageProperties>('time_on_page', {
    duration_seconds: Math.floor((Date.now() - startTime) / 1000),
  });
};

export const captureScrollDepth = (depth: number) => {
  const quarterReached = Math.floor(depth / 25) * 25;
  captureAnalytics<ScrollDepthProperties>('scroll_depth', {
    depth_percentage: quarterReached,
    is_milestone: [25, 50, 75, 100].includes(quarterReached),
  });
};

export const captureClick = (elementId: string, properties?: Partial<ClickProperties>) => {
  captureAnalytics<ClickProperties>('element_click', {
    element_id: elementId,
    ...properties,
  });
};

export const captureBlogEngagement = (postData: {
  title: string;
  author: string;
  pubDate: string;
  content: string;
}) => {
  if (isPostHogAvailable()) {
    const wordCount = postData.content.trim().split(/\s+/).length;
    captureAnalytics<BlogEngagementProperties>('blog_engagement', {
      post_title: postData.title,
      post_author: postData.author,
      post_date: postData.pubDate,
      post_word_count: wordCount,
      post_read_time: Math.ceil(wordCount / 200),
    });
  }
};
