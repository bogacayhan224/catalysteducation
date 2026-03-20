import { type SchemaTypeDefinition } from 'sanity'
import { faqType } from './faqType'
import { testimonialType } from './testimonialType'
import { postType } from './postType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [faqType, testimonialType, postType],
}
