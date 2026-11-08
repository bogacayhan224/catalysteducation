export type ArticleSection = {
  id: string;
  title: string;
  blocks: (
    | { kind: "paragraph"; text: string }
    | { kind: "list"; items: string[] }
  )[];
};
