import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "parentName",
      title: "Parent Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "studentInfo",
      title: "Student Info (e.g. 'Grade 11 student, Istanbul')",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
});
