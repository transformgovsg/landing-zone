// src/utils/github.ts
import https from 'node:https';

export async function fetchGithubContent(url: string) {
  return new Promise((resolve, reject) => {
    const headers: Record<string, string> = {
      'User-Agent': 'Node.js',
      Accept: 'application/vnd.github.v3+json',
    };

    // Add authorization header only if GITHUB_TOKEN exists
    if (import.meta.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${import.meta.env.GITHUB_TOKEN}`;
    }

    const options = {
      headers,
      rejectUnauthorized: false,
    };

    https
      .get(url, options, (res) => {
        let data = '';

        // Log rate limit information
        console.log('Rate Limit:', {
          remaining: res.headers['x-ratelimit-remaining'],
          limit: res.headers['x-ratelimit-limit'],
          reset: new Date(Number(res.headers['x-ratelimit-reset']) * 1000),
        });

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          if (res.statusCode === 403) {
            console.error('Rate limit details:', {
              data,
              headers: res.headers,
            });
            reject(new Error('GitHub API rate limit exceeded'));
            return;
          }

          if (res.statusCode !== 200) {
            reject(new Error(`HTTP error! status: ${res.statusCode}, body: ${data}`));
            return;
          }

          resolve({
            ok: true,
            json: () => Promise.resolve(JSON.parse(data)),
            text: () => Promise.resolve(data),
          });
        });
      })
      .on('error', (error) => {
        console.error('GitHub API request failed:', error);
        reject(error);
      });
  });
}
