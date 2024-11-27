// src/types/blog.ts

export interface BlogHeading {
  depth: number;
  text: string;
  slug: string;
}

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  pubDate: Date;
  [key: string]: any;
}

export interface BlogPost {
  content: string;
  frontmatter: BlogPostFrontmatter;
  headings: BlogHeading[];
}

export interface BlogPostPreview {
  slug: string;
  data: {
    title: string;
    description: string;
    pubDate: Date;
    pinned?: boolean;
  };
}
