type GithubAsset = {
  name: string;
  browser_download_url: string;
  size: number;
};

type GithubRelease = {
  tag_name: string;
  published_at: string;
  assets: GithubAsset[];
};

export type WindowsRelease = {
  version: string;
  publishedAt: string;
  setup64: GithubAsset | null;
  setupArm64: GithubAsset | null;
  setup32: GithubAsset | null;
  portable64: GithubAsset | null;
  portableArm64: GithubAsset | null;
};

const RELEASES_URL =
  "https://api.github.com/repos/git-for-windows/git/releases/latest";

// Git for Windows tags look like "v2.55.0.windows.3" — surface just "2.55.0.3".
function formatVersion(tag: string): string {
  const withoutV = tag.replace(/^v/, "");
  const match = withoutV.match(/^([\d.]+)\.windows\.(\d+)$/);
  if (!match) return withoutV;
  const [, base, build] = match;
  return build === "1" ? base : `${base}.${build}`;
}

export async function getLatestWindowsRelease(): Promise<WindowsRelease | null> {
  try {
    const res = await fetch(RELEASES_URL, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const data: GithubRelease = await res.json();
    const assets = data.assets ?? [];
    const find = (pred: (name: string) => boolean) =>
      assets.find((a) => pred(a.name.toLowerCase())) ?? null;

    return {
      version: formatVersion(data.tag_name),
      publishedAt: data.published_at,
      setup64: find((n) => n.endsWith("-64-bit.exe")),
      setupArm64: find((n) => n.endsWith("-arm64.exe")),
      setup32: find((n) => n.endsWith("-32-bit.exe")),
      portable64: find((n) => n.startsWith("portablegit-") && n.includes("64-bit")),
      portableArm64: find((n) => n.startsWith("portablegit-") && n.includes("arm64")),
    };
  } catch {
    return null;
  }
}
