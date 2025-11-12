export function getObjectKeyFromUrl(url: string, bucketName?: string) {
  try {
    const parsed = new URL(url);
    // pathname: /<bucket>/<key...>
    const parts = parsed.pathname.split("/").filter(Boolean); // removes empty strings
    if (parts.length === 0) return "";
    // if bucketName provided, validate and slice; otherwise drop first element as bucket
    if (bucketName && parts[0] === bucketName) {
      return parts.slice(1).join("/");
    }
    // default: drop first part (bucket) and return rest as key
    return parts.length > 1 ? parts.slice(1).join("/") : "";
  } catch {
    return "";
  }
}
