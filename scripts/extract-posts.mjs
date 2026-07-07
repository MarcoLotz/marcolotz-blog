/**
 * One-time content extraction: converts the Firestore seed data
 * (src/assets/populateData.json) into committed static content under content/.
 *
 * - Post IDs are the original Firestore document IDs, captured from the live
 *   site before Firebase was decommissioned. They MUST be preserved: legacy
 *   permalinks of the form /?pageIndex=N&postId=<id> are cited elsewhere.
 * - Media URLs pointing at Firebase Storage signed URLs are rewritten to the
 *   original WordPress-era root-relative paths (/wp-content/..., /share/...),
 *   which are served from public/ and must never change (external
 *   bibliography references them).
 * - Bodies are sanitized once here (same policy the site previously applied
 *   at render time) and committed as trusted content.
 *
 * Usage: npm run extract
 */
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sanitizeHtml from 'sanitize-html';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceFile = path.join(repoRoot, 'src', 'assets', 'populateData.json');
const contentDir = path.join(repoRoot, 'content');
const postsDir = path.join(contentDir, 'posts');
const publicDir = path.join(repoRoot, 'public');

const STORAGE_URL_PATTERN =
  /https:\/\/storage\.googleapis\.com\/marcolotz-website\.appspot\.com\/([^"?]+)(?:\?[^"]*)?/g;

/**
 * Third-party images that were hotlinked over plain HTTP (blocked as mixed
 * content on HTTPS, and the Wikimedia one is gone upstream). Copies were
 * recovered (Apache docs over HTTPS; Wayback Machine for Wikimedia) and are
 * now self-hosted under public/.
 */
const HOTLINK_REWRITES = {
  'http://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/yarn_architecture.gif':
    'wp-content/uploads/2014/06/yarn_architecture.gif',
  'http://upload.wikimedia.org/wikiversity/en/thumb/1/10/Simple_directed_graph.svg/439px-Simple_directed_graph.svg.png':
    'wp-content/uploads/2014/06/439px-Simple_directed_graph.svg.png',
};

/** Firestore document IDs of the live site, keyed by post title. */
const FIRESTORE_IDS = {
  'Build a Custom Hadoop/Giraph Project with Maven': 'ACQLtZegaVrFRy2RKuje',
  'Giraph configuration details': 'ZvtCAyr22RfhfpUtHGOD',
  'Electronics for Kids': 'HigfhDPyMIaiKggRNFnc',
  'RTX RTOS Adaptation for LPC1343 and LPC1347': 'tCDF9hlrg7EO5CVVgoH8',
  'A New Dawn': 'msziw4RjwAhs26pc0U7n',
  'Graphs and Tradicional Graph Processing': '050bbrgQN69MbY3QcOjk',
  'MapReduce 2.0: Hadoop with YARN': 'Tifv2O7RhnXHQves24Zv',
  'Streaming Interface for Hadoop': 'jjJpMOeiyp4C95lgjJSe',
  'Introduction to Hadoop and MapReduce 1.0': 'AL5HIrTyT9BglCPVfXKQ',
  'Of MapReduce and Men': '2aOuuMIUDP634PwaGn6H',
  'Configure PXE Boot for CentOS 6.5 using FTP, HTTP and Kickstart': 'HI3UGn2hiKJABCN8409W',
  'And it begins!': 'jtPy6RUhtW1X53z9FIuY',
};

const slugify = (title) =>
  title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const sanitize = (html) =>
  sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedSchemes: sanitizeHtml.defaults.allowedSchemes.concat(['data']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      span: ['style'],
      p: ['style'],
    },
  });

const rewriteAssetUrls = (html, assetPaths) => {
  let result = html.replace(STORAGE_URL_PATTERN, (_match, assetPath) => {
    assetPaths.add(assetPath);
    return `/${assetPath}`;
  });
  for (const [hotlink, assetPath] of Object.entries(HOTLINK_REWRITES)) {
    if (result.includes(hotlink)) {
      assetPaths.add(assetPath);
      result = result.replaceAll(hotlink, `/${assetPath}`);
    }
  }
  return result;
};

const rawPosts = JSON.parse(await readFile(sourceFile, 'utf8'));
if (rawPosts.length !== 12) {
  throw new Error(`Expected 12 posts in ${sourceFile}, found ${rawPosts.length}`);
}

await mkdir(postsDir, { recursive: true });

const assetPaths = new Set();
const index = [];

for (const post of rawPosts) {
  const id = FIRESTORE_IDS[post.title];
  if (!id) {
    throw new Error(`No Firestore ID captured for post titled "${post.title}"`);
  }

  const slug = slugify(post.title);
  const body = rewriteAssetUrls(sanitize(post.body), assetPaths);

  if (body.includes('storage.googleapis.com')) {
    throw new Error(`Unrewritten storage URL remains in "${post.title}"`);
  }

  await writeFile(path.join(postsDir, `${slug}.html`), `${body.trim()}\n`);
  index.push({
    id,
    slug,
    title: post.title,
    author: post.author,
    category: post.category,
    createdAt: post.createdAt,
    search: post.search,
  });
}

index.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
await writeFile(path.join(contentDir, 'posts.json'), `${JSON.stringify(index, null, 2)}\n`);

const missing = [];
for (const assetPath of assetPaths) {
  try {
    await access(path.join(publicDir, assetPath));
  } catch {
    missing.push(assetPath);
  }
}
if (missing.length > 0) {
  throw new Error(`Referenced assets missing from public/:\n${missing.join('\n')}`);
}

console.log(`Extracted ${index.length} posts to ${postsDir}`);
console.log(`Verified ${assetPaths.size} local assets under public/`);
