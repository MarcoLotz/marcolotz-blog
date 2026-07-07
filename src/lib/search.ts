import type { Post } from '@/lib/posts';

/**
 * Client-side replacement for the legacy Firestore search: each
 * whitespace-separated term matches a post when it is contained in any of the
 * post's uppercased title tokens.
 */
export function filterPosts(posts: Post[], searchText: string): Post[] {
  const terms = searchText.toUpperCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) {
    return posts;
  }

  return posts.filter((post) =>
    terms.some((term) => post.search.some((token) => token.includes(term))),
  );
}
