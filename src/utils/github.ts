// src/utils/github.ts

const GITHUB_API_BASE = 'https://api.github.com';

interface GithubContentResponse {
  content?: string;
  sha?: string;
  message?: string;
}

interface GithubUpdateResponse {
  content: {
    sha: string;
  };
}

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

// Functions to support analytics features

export async function getGithubFile(
  owner: string,
  repo: string,
  path: string,
): Promise<{ content: string; sha: string }> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`;
  const response = await fetchGithubContent(url);
  const data: GithubContentResponse = await response.json();

  if (!data.content || !data.sha) {
    throw new Error('Invalid GitHub response format');
  }

  return {
    content: Buffer.from(data.content, 'base64').toString('utf8'),
    sha: data.sha,
  };
}

export async function updateGithubFile(
  owner: string,
  repo: string,
  path: string,
  content: string,
  sha: string,
): Promise<{ sha: string }> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`;

  const headers: Record<string, string> = {
    'User-Agent': 'Node.js',
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: 'Update analytics data',
      content: Buffer.from(content).toString('base64'),
      sha,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update file: ${await response.text()}`);
  }

  const data = (await response.json()) as GithubUpdateResponse;

  if (!data.content?.sha) {
    throw new Error('Invalid GitHub response format after update');
  }

  return { sha: data.content.sha };
}
