export default function UmamiAnalytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const scriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;

  if (!websiteId || !scriptUrl) {
    return null;
  }

  return (
    <script
      defer
      src={scriptUrl}
      data-website-id={websiteId}
    />
  );
}
