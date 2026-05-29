export interface HeroData {
  title: string;
  subtitle: string;
  tagline: string;
}

export interface Book {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  downloadUrl: string;
  date: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
}

export interface Comment {
  id: string;
  articleId: string;
  name: string;
  text: string;
  date: string;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  date: string;
}

export interface SiteData {
  books: Book[];
  articles: Article[];
  podcasts: Podcast[];
  comments: Comment[];
  admin_pw: string;
  hero: HeroData;
  about: string;
}
