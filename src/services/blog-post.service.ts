import { marked } from 'marked';
import { generateSlug } from '../utils/string';
import type { BlogPost, BlogHeading } from '../types/blog';
import { BaseBlogService } from './base-blog.service';

export class BlogPostService extends BaseBlogService {
  private static getHeadingText(heading: any): string {
    if (!heading) return '';
    if (typeof heading === 'string') return heading;
    if (typeof heading === 'object') {
      if (heading.text) return String(heading.text);
      if (heading.raw) return String(heading.raw);
    }
    return String(heading);
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

  static async getPost(slug: string): Promise<BlogPost | null> {
    try {
      const files = await this.fetchBlogFiles();
      const file = files.find((f: any) => f.name === `${slug}.md`);

      if (!file) {
        return null;
      }

      const content = await this.fetchFileContent(file.download_url);
      const frontmatter = this.extractFrontmatter(content);
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
