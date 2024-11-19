import { parse as parseYaml } from 'yaml';
import { fetchGithubContent } from '../utils/github';
import type { BlogPostPreview } from '../types/blog';

const BLOG_API_URL =
  'https://api.github.com/repos/transformgovsg/landing-zone/contents/src/content/blog?ref=feat/add-blogging-capabilities';

export class BlogListService {
  private static async processPost(file: any): Promise<BlogPostPreview> {
    const content = await fetchGithubContent(file.download_url).then((res) => res.text());
    const frontmatter = this.extractFrontmatter(content);

    return {
      slug: file.name.replace('.md', ''),
      data: {
        title: frontmatter.title || 'Untitled',
        description: frontmatter.description || '',
        pubDate: frontmatter.pubDate ? new Date(frontmatter.pubDate) : new Date(),
      },
    };
  }

  private static extractFrontmatter(content: string) {
    const frontmatterRegex = /---\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);
    return match ? parseYaml(match[1]) : {};
  }

  static async getAllPosts(): Promise<BlogPostPreview[]> {
    const response = await fetchGithubContent(BLOG_API_URL);
    const files = await response.json();

    const posts = await Promise.all(
      files
        .filter((file: any) => file.name.endsWith('.md'))
        .map((file: any) => this.processPost(file)),
    );

    return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
  }
}
