type Layout = "grid" | "masonry";
type LayoutElement = "columns" | "rows";
type Template = "classic" | "hover";
type Navigation = "load-more" | "pagination";

type LayoutConfig = Record<LayoutElement, number>;
type LayoutParams = Record<Layout, LayoutConfig>;

export interface ISettings {
  layout: {
    current: Layout;
    params: LayoutParams;
  };
  template: Template;
  navigation: Navigation;
}

export interface IPost {
  id: string;
  caption: string;
  permalink: string;
  date: string;
  likes: number;
  comments: number;
  userId: string;
}

export interface IUser {
  id: string;
  username: string;
  postId: string;
}