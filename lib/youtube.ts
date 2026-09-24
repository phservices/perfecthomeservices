/**
 * Extracts the 11-character video ID from any common YouTube link
 * (watch?v=, youtu.be/, shorts/, embed/, live/). Returns null if it isn't one.
 */
export function getYouTubeId(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url.trim());
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^(www\.|m\.|music\.)/, "");
  let id: string | null = null;

  if (host === "youtu.be") {
    id = parsed.pathname.split("/")[1] ?? null;
  } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    if (parsed.pathname === "/watch") {
      id = parsed.searchParams.get("v");
    } else {
      const [, kind, value] = parsed.pathname.split("/");
      if (["shorts", "embed", "live", "v"].includes(kind)) id = value ?? null;
    }
  }

  return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
}
