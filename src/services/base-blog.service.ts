import { parse as parseYaml } from 'yaml';
import { fetchGithubContent } from '../utils/github';

export abstract class BaseBlogService {
  //   protected static readonly BLOG_API_URL = 'https://api.github.com/repos/transformgovsg/landing-zone/contents/src/content/blog';
  protected static readonly BLOG_API_URL =
    'https://api.github.com/repos/transformgovsg/landing-zone/contents/src/content/blog?ref=feat/add-blogging-capabilities';

  protected static async fetchBlogFiles() {
    const response = await fetchGithubContent(this.BLOG_API_URL);
    return response.json();
  }

  protected static async fetchFileContent(downloadUrl: string): Promise<string> {
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
