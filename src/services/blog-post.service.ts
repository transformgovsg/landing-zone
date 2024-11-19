import { marked } from 'marked';
import { parse as parseYaml } from 'yaml';
import { fetchGithubContent } from '../utils/github';
import { generateSlug } from '../utils/string';
import type { BlogPost, BlogHeading } from '../types/blog';

const BLOG_API_URL =
  'https://api.github.com/repos/transformgovsg/landing-zone/contents/src/content/blog?ref=feat/add-blogging-capabilities';

export class BlogPostService {
  private static getHeadingText(heading: any): string {
    if (!heading) return '';
    if (typeof heading === 'string') return heading;
    if (typeof heading === 'object') {
      if (heading.text) return String(heading.text);
      if (heading.raw) return String(heading.raw);
    }
    return String(heading);
  }

  private static parseFrontmatter(content: string) {
    const frontmatterRegex = /---\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);
    const frontmatter = match ? parseYaml(match[1]) : {};

    if (frontmatter.pubDate) {
      frontmatter.pubDate = new Date(frontmatter.pubDate);
    }

    return frontmatter;
  }

  private static extractContent(content: string): string {
    const frontmatterRegex = /---\n([\s\S]*?)\n---/;
    return content.replace(frontmatterRegex, '').trim();
  }

  private static processHeadings(tokens: marked.Token[]): BlogHeading[] {
    return tokens
      .filter((token) => token.type === 'heading')
      .map((heading: any) => ({
        depth: heading.depth,
        text: this.getHeadingText(heading.text),
        slug: generateSlug(this.getHeadingText(heading.text)),
      }));
  }

  private static renderContent(tokens: marked.Token[]): string {
    let renderedContent = '';

    for (const token of tokens) {
      if (token.type === 'heading') {
        const headingText = this.getHeadingText(token.text);
        const slug = generateSlug(headingText);
        renderedContent += `<h${token.depth} id="${slug}" class="group relative">
          <span>${headingText}</span>
          <a href="#${slug}" class="heading-anchor" aria-label="Link to this section"></a>
        </h${token.depth}>\n`;
      } else {
        renderedContent += marked.parser([token]);
      }
    }

    return renderedContent;
  }

  static async getPost(slug: string) {
    try {
      const response = await fetchGithubContent(BLOG_API_URL);
      const files = await response.json();
      const file = files.find((f: any) => f.name === `${slug}.md`);

      if (!file) {
        return null;
      }

      const contentResponse = await fetchGithubContent(file.download_url);
      const content = await contentResponse.text();

      const frontmatter = this.parseFrontmatter(content);
      const rawContent = this.extractContent(content);
      const tokens = marked.lexer(rawContent);
      const headings = this.processHeadings(tokens);
      const renderedContent = this.renderContent(tokens);

      return {
        content: renderedContent,
        frontmatter,
        headings,
      };
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  }
}
