import type { NextConfig } from "next";

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : null;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseHost
      ? [
          {
            protocol: "https",
            hostname: supabaseHost,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },

  async redirects() {
    return [
      // Old /Listing/* routes → new /Services/* routes (301 permanent)
      {
        source: "/Listing",
        destination: "/Services",
        permanent: true,
      },
      {
        source: "/Listing/interior-design",
        destination: "/Services/interior-design-enugu",
        permanent: true,
      },
      {
        source: "/Listing/cleaning",
        destination: "/Services/cleaning-fumigation-pest-control-enugu",
        permanent: true,
      },
      {
        source: "/Listing/real-estate",
        destination: "/Services/real-estate-enugu",
        permanent: true,
      },
      {
        source: "/Listing/Our-Projects",
        destination: "/Services/Our-Projects",
        permanent: true,
      },
      {
        source: "/Listing/Our-Projects/:slug*",
        destination: "/Services/Our-Projects/:slug*",
        permanent: true,
      },
      // Old /Academy route → new /Interior-design-academy-enugu (301 permanent)
      {
        source: "/Academy",
        destination: "/Interior-design-academy-enugu",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
