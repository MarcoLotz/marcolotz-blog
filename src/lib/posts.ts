import { readFileSync } from 'node:fs';
import path from 'node:path';

export interface Post {
  /**
   * Original Firestore document ID, preserved so legacy permalinks of the
   * form /?pageIndex=N&postId=<id> keep resolving.
   */
  id: string;
  slug: string;
  title: string;
  author: string;
  category: string;
  createdAt: string;
  /** Sanitized HTML, produced by scripts/extract-posts.mjs. */
  body: string;
  /** Uppercased title tokens used by the client-side search. */
  search: string[];
}

type PostMeta = Omit<Post, 'body'>;

const contentDir = path.join(process.cwd(), 'content');

/**
 * Loads every post at build time, newest first. Only callable from
 * getStaticProps (relies on node:fs).
 */
export function getAllPosts(): Post[] {
  const raw = readFileSync(path.join(contentDir, 'posts.json'), 'utf8');
  const index = JSON.parse(raw) as PostMeta[];

  return index.map((meta) => ({
    ...meta,
    body: readFileSync(path.join(contentDir, 'posts', `${meta.slug}.html`), 'utf8'),
  }));
}
