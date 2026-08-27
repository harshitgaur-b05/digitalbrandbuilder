// @ts-nocheck
import * as __fd_glob_0 from "../src/content/blog/hello-world.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();

export const docs = await create.doc("docs", "src/content/blog", {"hello-world.mdx": __fd_glob_0, });

export const meta = await create.meta("meta", "src/content/blog", {});