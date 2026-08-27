import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const { docs, meta } = defineDocs({
  dir: 'src/content/blog',
});

export default defineConfig({
  mdxOptions: {
    // any mdx options
  }
});
