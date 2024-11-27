// src/utils/github.ts

export async function fetchGithubContent(url: string): Promise<Response> {
  // Configure global fetch for Node.js
  if (import.meta.env.DEV) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  }

  const headers: Record<string, string> = {
    'User-Agent': 'Node.js',
    Accept: 'application/vnd.github.v3+json',
  };

  // Add authorization header only if GITHUB_TOKEN exists
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(url, { headers });

  // Log rate limit information
  console.log('Rate Limit:', {
    remaining: response.headers.get('x-ratelimit-remaining'),
    limit: response.headers.get('x-ratelimit-limit'),
    reset: new Date(Number(response.headers.get('x-ratelimit-reset')) * 1000),
  });

  if (response.status === 403) {
    console.error('Rate limit details:', {
      data: await response.text(),
      headers: Object.fromEntries(response.headers.entries()),
    });
    throw new Error('GitHub API rate limit exceeded');
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}, body: ${await response.text()}`);
  }

  return response;
}
