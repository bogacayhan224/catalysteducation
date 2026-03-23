import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";

export type Faq = {
  _id: string;
  question: string;
  answer: PortableTextBlock[];
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

export type Testimonial = {
  _id: string;
  parentName: string;
  quote: string;
  studentInfo?: string;
  language: string;
  order?: number;
};

export async function getTestimonials(locale: string): Promise<Testimonial[]> {
  return client.fetch(
    groq`*[_type == "testimonial" && published == true && language == $locale] | order(order asc) {
      _id,
      parentName,
      quote,
      studentInfo,
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
