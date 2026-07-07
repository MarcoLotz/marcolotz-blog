# marcolotz.com

Source of [www.marcolotz.com](https://www.marcolotz.com) — a fully static blog built with
[Next.js](https://nextjs.org/) (static export) and [Mantine](https://mantine.dev/), deployed to
**Cloudflare Pages** by GitHub Actions on every push to `main`.

## Architecture

There is no server side. Everything is pre-rendered at build time:

- **Posts** live in the repository under [`content/`](content/):
  - [`content/posts.json`](content/posts.json) — ordered post metadata (`id`, `slug`, `title`,
    `author`, `category`, `createdAt`, `search`).
  - `content/posts/<slug>.html` — one sanitized HTML body per post.
- **Legacy asset URLs are load-bearing.** External bibliography cites documents at their original
  WordPress-era paths, so they are served verbatim from [`public/`](public/) and must never move:
  - `/wp-content/uploads/...` (images, PDFs such as `LotzReport.pdf`)
  - `/share/RTX/...` (firmware archives)
- **Legacy permalinks** of the form `/?pageIndex=N&postId=<firestore-id>` keep working: the post
  `id`s are the original Firestore document IDs, and the home page resolves them client-side
  (see [`src/pages/index.tsx`](src/pages/index.tsx)). The page size is fixed at 3 for the same
  reason.
- Pagination and search run client-side over the statically embedded post list.

`scripts/extract-posts.mjs` documents the one-time migration that produced `content/` from the old
Firestore seed data (`src/assets/populateData.json`); it is kept for provenance and can be re-run
with `npm run extract`.

## Development

Requires Node ≥ 22 (see `.nvmrc`).

```bash
npm ci
npm run dev        # dev server on http://localhost:3000
npm run build      # static export to out/
npm run preview    # serve out/ with wrangler (Cloudflare Pages emulation)
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run format     # Prettier
```

### Adding or editing a post

1. Add/edit the HTML body in `content/posts/<slug>.html`.
2. Add/update its metadata entry in `content/posts.json` (newest first). New posts need a unique
   `id` (any stable string), a `slug` matching the filename, and `search` set to the uppercased
   title tokens.
3. Static assets go under `public/` — use `/wp-content/uploads/<year>/<month>/` for continuity.
4. `npm run build` and check the result.

## Deployment

[`deploy.yml`](.github/workflows/deploy.yml) builds and deploys `main` to the Cloudflare Pages
project `marcolotz-blog` via `wrangler pages deploy`. [`ci.yml`](.github/workflows/ci.yml) runs
lint/typecheck/format/build on pull requests.

Required GitHub Actions secrets:

| Secret                  | Value                                                     |
| ----------------------- | --------------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | API token with the **Cloudflare Pages — Edit** permission |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID (dashboard → Overview)              |

One-time Cloudflare setup:

1. Create the Pages project: `npx wrangler pages project create marcolotz-blog --production-branch main`
   (or dashboard → Workers & Pages → Create → Pages → Direct Upload).
2. Add the two repository secrets above.
3. Push to `main` — the workflow deploys to `marcolotz-blog.pages.dev`.

### DNS (Google Cloud DNS is kept)

1. In the Pages project, add the custom domain `www.marcolotz.com`.
2. In Google Cloud DNS, change the `www` CNAME from `cname.vercel-dns.com` to
   `marcolotz-blog.pages.dev`.
3. Apex (`marcolotz.com`) note: with the zone outside Cloudflare there is no native apex redirect;
   either keep a redirect at the current apex host or move the zone to Cloudflare later for a
   proper `marcolotz.com → www.marcolotz.com` redirect rule.
4. After cutover, spot-check the bibliography URLs, e.g.
   `https://www.marcolotz.com/wp-content/uploads/2014/05/LotzReport.pdf` and
   `https://www.marcolotz.com/share/RTX/RTX1343.zip`.
