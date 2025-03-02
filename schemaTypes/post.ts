import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'
import { format, parseISO } from 'date-fns';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: "A slug is required for the post to show up in the preview",
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context)
      },
      validation: (rule) => rule.required()
    }),
    defineField({
			name: "excerpt",
			title: "Excerpt",
			type: "text",
		}),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      validation: (rule)  => rule.required()
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
				{
					name: "alt",
					type: "string",
					title: "Alternative text",
					description: "Important for SEO and accessiblity.",
					validation: (rule) => {
						return rule.custom((alt, context) => {
							if ((context.document?.coverImage as any)?.asset?._ref && !alt) {
								return "Required";
							}
							return true;
						});
					},
				},
			],
			validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],

  preview: {
		select: {
			title: "title",
			author: "author.name",
			date: "date",
			media: "coverImage",
		},
		prepare({ title, media, author, date }) {
			const subtitles = [
				author && `by ${author}`,
				date && `on ${format(parseISO(date), "LLL d, yyyy")}`,
			].filter(Boolean);

			return { title, media, subtitle: subtitles.join(" ") };
		},
	},
})
