// src/services/base-blog.service.ts

import { parse as parseYaml } from 'yaml';
import { fetchGithubContent } from '../utils/github';
import fs from 'node:fs/promises';
import path from 'node:path';

export abstract class BaseBlogService {
  protected static readonly BLOG_API_URL =
    'https://api.github.com/repos/transformgovsg/landing-zone/contents/src/content/blog';
  protected static readonly LOCAL_BLOG_PATH = 'src/content/blog';

  protected static async fetchBlogFiles() {
    if (import.meta.env.DEV) {
      const files = await fs.readdir(this.LOCAL_BLOG_PATH);
      return files.map((name) => ({
        name,
        download_url: path.join(this.LOCAL_BLOG_PATH, name),
      }));
    }

    const response = await fetchGithubContent(this.BLOG_API_URL);
    return response.json();
  }

  protected static async fetchFileContent(downloadUrl: string): Promise<string> {
    if (import.meta.env.DEV) {
      return fs.readFile(downloadUrl, 'utf-8');
    }

    return fetchGithubContent(downloadUrl).then((res) => res.text());
  }

  protected static extractFrontmatter(content: string) {
    const frontmatterRegex = /---\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);
    const frontmatter = match ? parseYaml(match[1]) : {};

    if (frontmatter.pubDate) {
      frontmatter.pubDate = new Date(frontmatter.pubDate);
    }

    return frontmatter;
  }

  protected static extractContent(content: string): string {
    const frontmatterRegex = /---\n([\s\S]*?)\n---/;
    return content.replace(frontmatterRegex, '').trim();
  }
}
