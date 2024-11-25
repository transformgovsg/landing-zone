// src/services/blog-post.service.ts

import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { generateSlug } from '../utils/string';
import type { BlogPost, BlogHeading } from '../types/blog';
import { BaseBlogService } from './base-blog.service';
import type { Token, Tokens } from 'marked';

interface SanitizeTransformer {
  tagName: string;
  attribs: Record<string, string>;
}

export class BlogPostService extends BaseBlogService {
  private static readonly ALLOWED_IFRAME_HOSTS = [
    'www.youtube-nocookie.com',
    'www.youtube.com',
    'youtube.com',
  ];

  private static readonly ALLOWED_IFRAME_FEATURES = [
    'accelerometer',
    'autoplay',
    'clipboard-write',
    'encrypted-media',
    'gyroscope',
    'picture-in-picture',
    'web-share',
  ];

  private static readonly ALLOWED_CLASSES = {
    div: [
      // For iframes
      'relative',
      'mt-8',
      'aspect-video',
      // For image alignment
      'flex',
      'justify-start',
      'justify-center',
      'justify-end',
      'items-center',
      'w-full',
    ],
    iframe: ['h-full', 'w-full', 'rounded-lg'],
    img: ['rounded-lg', 'h-auto'],
  };

  private static readonly ALLOWED_IFRAME_ATTRIBUTES = [
    'src',
    'title',
    'allow',
    'allowfullscreen',
    'referrerpolicy',
    'class',
  ];

  private static readonly ALLOWED_IMG_ATTRIBUTES = [
    'src',
    'alt',
    'title',
    'class',
    'loading',
    'width',
    'height',
    'align',
  ];

  private static preprocessMarkdown(content: string): string {
    // Handle all image alignments
    return content.replace(
      /<img([^>]+?)align="(left|center|right)"([^>]*?)>/g,
      (match, before, alignment, after) => {
        const justifyClass =
          alignment === 'left'
            ? 'justify-start'
            : alignment === 'right'
              ? 'justify-end'
              : 'justify-center';
        return `<div class="flex ${justifyClass}"><img${before}${after}></div>`;
      },
    );
  }

  private static sanitizeContent(html: string): string {
    return sanitizeHtml(html, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['iframe', 'div', 'img']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        iframe: this.ALLOWED_IFRAME_ATTRIBUTES,
        div: ['class'],
        img: this.ALLOWED_IMG_ATTRIBUTES,
      },
      allowedClasses: this.ALLOWED_CLASSES,
      transformTags: {
        iframe: this.transformIframeTag.bind(this),
        img: this.transformImageTag.bind(this),
      },
      allowedIframeHostnames: this.ALLOWED_IFRAME_HOSTS,
    });
  }

  private static transformIframeTag(
    tagName: string,
    attribs: Record<string, string>,
  ): SanitizeTransformer {
    // Validate iframe source
    try {
      const url = new URL(attribs.src);
      if (!this.ALLOWED_IFRAME_HOSTS.includes(url.hostname)) {
        return {
          tagName: 'p',
          attribs: { class: 'error-message' },
        };
      }
    } catch {
      return {
        tagName: 'p',
        attribs: { class: 'error-message' },
      };
    }

    // Process allowed features
    let allowAttribute = '';
    if (attribs.allow) {
      allowAttribute = attribs.allow
        .split(';')
        .map((feature) => feature.trim())
        .filter((feature) => this.ALLOWED_IFRAME_FEATURES.includes(feature))
        .join('; ');
    }

    return {
      tagName,
      attribs: {
        ...attribs,
        allow: allowAttribute,
        referrerpolicy: 'strict-origin-when-cross-origin',
      },
    };
  }

  private static transformImageTag(
    tagName: string,
    attribs: Record<string, string>,
  ): SanitizeTransformer {
    const baseClasses = ['rounded-lg', 'h-auto'];
    if (!attribs.width) {
      baseClasses.push('w-full');
    }

    return {
      tagName,
      attribs: {
        ...attribs,
        loading: 'lazy',
        class: baseClasses.join(' '),
        alt: attribs.alt || '',
      },
    };
  }

  private static getHeadingText(heading: any): string {
    if (!heading) return '';
    if (typeof heading === 'string') return heading;
    if (typeof heading === 'object') {
      if (heading.text) return String(heading.text);
      if (heading.raw) return String(heading.raw);
    }
    return String(heading);
  }

  private static processHeadings(tokens: Token[]): BlogHeading[] {
    return tokens
      .filter((token): token is Tokens.Heading => token.type === 'heading')
      .map((heading) => ({
        depth: heading.depth,
        text: this.getHeadingText(heading.text),
        slug: generateSlug(this.getHeadingText(heading.text)),
      }));
  }

  private static renderContent(tokens: Token[]): string {
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

    return this.sanitizeContent(renderedContent);
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
      const preprocessedContent = this.preprocessMarkdown(rawContent);
      const tokens = marked.lexer(preprocessedContent);
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
