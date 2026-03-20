import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export type Faq = {
  _id: string;
  question: string;
  answer: string;
  language: string;
  order: number;
};

export async function getFaqs(): Promise<Faq[]> {
  return client.fetch(
    groq`*[_type == "faq"] | order(order asc) {
      _id,
      question,
      answer,
      language,
      order
    }`
  );
}

export async function getFaqsByLocale(locale: string): Promise<Faq[]> {
  return client.fetch(
    groq`*[_type == "faq" && language == $locale] | order(order asc) {
      _id,
      question,
      answer,
      language,
      order
    }`,
    { locale }
  );
}

export type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
};

export async function getPosts(): Promise<Post[]> {
  return client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt
    }`
  );
}
