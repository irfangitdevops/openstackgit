import { unstable_cache } from "next/cache";

type GithubReleaseRaw = {
  tag_name: string;
  name: string | null;
  html_url: string;
  published_at: string | null;
  prerelease: boolean;
  draft: boolean;
  assets: { name: string; browser_download_url: string; size: number }[];
};

type GithubTagRaw = {
  name: string;
};

export type ToolRelease = {
  version: string;
  name: string;
  url: string;
  publishedAt: string | null;
  prerelease: boolean;
  assetCount: number;
};

// Release data changes rarely; cache for 6 hours to stay far under GitHub's
// unauthenticated rate limit (60/hr). Set GITHUB_TOKEN (runtime env) to raise
// the limit to 5000/hr — see .env.example.
const REVALIDATE_SECONDS = 21600;

function ghHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

const PRERELEASE_RE = /(-|\.|\b)(rc|alpha|beta|preview|dev|nightly|snapshot)/i;

// Some projects ship enormous changelog bodies (OpenTofu/OpenBao release payloads
// run to many MB), which blow past Next's 2MB fetch-cache limit. We fetch with
// `no-store` and cache only the small transformed result via unstable_cache.
async function fetchReleases(repo: string, limit: number): Promise<ToolRelease[] | null> {
  try {
    // 1. Prefer published GitHub Releases (they carry dates + assets).
    const relRes = await fetch(
      `https://api.github.com/repos/${repo}/releases?per_page=${limit}`,
      { headers: ghHeaders(), cache: "no-store" }
    );
    if (relRes.ok) {
      const data: GithubReleaseRaw[] = await relRes.json();
      if (Array.isArray(data)) {
        const releases = data
          .filter((r) => !r.draft)
          .map((r) => ({
            version: r.tag_name,
            name: r.name?.trim() || r.tag_name,
            url: r.html_url,
            publishedAt: r.published_at,
            prerelease: r.prerelease,
            assetCount: r.assets?.length ?? 0,
          }));
        if (releases.length > 0) return releases;
      }
    } else if (relRes.status !== 404) {
      // Hard failure (rate limit, etc.) — don't mask it with a tags call.
      return null;
    }

    // 2. Fall back to Git tags for projects that tag but don't publish Releases
    //    (e.g. Zabbix, HAProxy). Tags have no dates/assets, just version names.
    const tagRes = await fetch(
      `https://api.github.com/repos/${repo}/tags?per_page=${limit}`,
      { headers: ghHeaders(), cache: "no-store" }
    );
    if (!tagRes.ok) return null;

    const tags: GithubTagRaw[] = await tagRes.json();
    if (!Array.isArray(tags) || tags.length === 0) return null;

    return tags.map((t) => ({
      version: t.name,
      name: t.name,
      url: `https://github.com/${repo}/releases/tag/${encodeURIComponent(t.name)}`,
      publishedAt: null,
      prerelease: PRERELEASE_RE.test(t.name),
      assetCount: 0,
    }));
  } catch {
    return null;
  }
}

export async function getToolReleases(
  repo: string,
  limit = 15
): Promise<ToolRelease[] | null> {
  const cached = unstable_cache(
    () => fetchReleases(repo, limit),
    ["gh-releases", repo, String(limit)],
    { revalidate: REVALIDATE_SECONDS, tags: ["gh-releases"] }
  );
  return cached();
}
