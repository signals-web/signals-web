const dotenv = require('dotenv');
const { fileURLToPath } = require('url');
const { dirname, resolve } = require('path');
const { createClient } = require('@sanity/client');
const { projects } = require('../src/data/projects');

// Load environment variables from .env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-02-20',
  useCdn: false,
});

async function migrateProjects() {
  try {
    for (const project of projects) {
      const doc = {
        _type: 'project',
        title: project.title,
        slug: {
          _type: 'slug',
          current: project.slug
        },
        type: project.type,
        featured: project.featured,
        publishedAt: project.publishedAt,
        backgroundColor: project.backgroundColor,
      };

      await client.createIfNotExists(doc);
      console.log(`✓ Project "${project.title}" migrated successfully`);
    }
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateProjects(); 