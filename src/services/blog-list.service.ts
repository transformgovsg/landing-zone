// src/services/blog-list.service.ts

import type { BlogPostPreview } from '../types/blog';
import { BaseBlogService } from './base-blog.service';

export class BlogListService extends BaseBlogService {
  private static async processPost(file: any): Promise<BlogPostPreview> {
    const content = await this.fetchFileContent(file.download_url);
    const frontmatter = this.extractFrontmatter(content);

    return {
      slug: file.name.replace('.md', ''),
      data: {
        title: frontmatter.title || 'Untitled',
        description: frontmatter.description || '',
        pubDate: frontmatter.pubDate ? new Date(frontmatter.pubDate) : new Date(),
        pinned: frontmatter.pinned || false,
      },
    };
  }

  static async getAllPosts(): Promise<BlogPostPreview[]> {
    try {
      const files = await this.fetchBlogFiles();
      const posts = await Promise.all(
        files
          .filter((file: any) => file.name.endsWith('.md'))
          .map((file: any) => this.processPost(file)),
      );

      return posts.sort((a, b) => {
        // Sort pinned posts first
        if (a.data.pinned && !b.data.pinned) return -1;
        if (!a.data.pinned && b.data.pinned) return 1;

        // Then sort by date
        return b.data.pubDate.getTime() - a.data.pubDate.getTime();
      });
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }
}
