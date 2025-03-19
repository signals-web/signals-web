import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-19',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  perspective: 'published'
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper function to fetch all projects
export async function getProjects() {
  return client.fetch(`*[_type == "project"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    type,
    featured,
    publishedAt,
    backgroundColor,
    mainImage {
      asset->{
        url,
        metadata {
          dimensions
        }
      }
    }
  }`)
}

// Helper function to fetch filtered projects
export async function getFilteredProjects(filter: string) {
  let query = '*[_type == "project"]'
  
  if (filter === 'featured') {
    query += ' && featured == true'
  } else if (filter === 'recent') {
    // Get projects from the last 3 months
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
    query += ` && publishedAt >= "${threeMonthsAgo.toISOString()}"`
  } else if (filter !== 'all') {
    query += ` && type == "${filter}"`
  }

  // Add deduplication by slug
  query += ' | unique(slug.current)'

  return client.fetch(`${query} | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    type,
    featured,
    publishedAt,
    backgroundColor,
    mainImage {
      asset->{
        url,
        metadata {
          dimensions
        }
      }
    }
  }`)
}

// Helper function to fetch a single project by slug
export async function getProject(slug: string) {
  const project = await client.fetch(`*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    type,
    featured,
    publishedAt,
    backgroundColor,
    description,
    mainImage {
      asset->{
        url,
        metadata {
          dimensions
        }
      }
    },
    images[] {
      asset->{
        url,
        metadata {
          dimensions
        }
      },
      caption,
      alt
    },
    "prev": *[_type == "project" && ^.title > title] | order(title desc)[0] {
      title,
      "slug": slug.current
    },
    "next": *[_type == "project" && ^.title < title] | order(title asc)[0] {
      title,
      "slug": slug.current
    }
  }`, { slug });

  return project;
} 