export function getTrafficSource(referrer: string): string {
  if (!referrer || referrer === "direct") return "direct";

  try {
    const hostname = new URL(referrer).hostname.toLowerCase();

    if (hostname.includes("google.")) return "google";
    if (hostname.includes("bing.com")) return "bing";
    if (hostname.includes("yahoo.com")) return "yahoo";

    if (hostname.includes("facebook.com") || hostname.includes("fb.com"))
      return "facebook";
    if (hostname.includes("instagram.com")) return "instagram";
    if (hostname.includes("twitter.com") || hostname.includes("x.com"))
      return "twitter";
    if (hostname.includes("linkedin.com")) return "linkedin";
    if (hostname.includes("t.co")) return "twitter";
    if (hostname.includes("youtube.com")) return "youtube";
    if (hostname.includes("tiktok.com")) return "tiktok";

    if (hostname.includes("yourdomain.com")) return "internal";

    return "referral";
  } catch (err) {
    return "direct";
  }
}
