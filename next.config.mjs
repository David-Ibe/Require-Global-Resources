/** @type {import('next').NextConfig} */
const remotePatterns = [
  {
    protocol: "https",
    hostname: "images.unsplash.com"
  },
  {
    protocol: "https",
    hostname: "images.pexels.com"
  }
];

try {
  const u = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (u) {
    const host = new URL(u).hostname;
    remotePatterns.push({
      protocol: "https",
      hostname: host,
      pathname: "/storage/v1/object/public/**"
    });
  }
} catch {
  /* ignore invalid URL in local tooling */
}

const nextConfig = {
  images: {
    remotePatterns
  },
  async redirects() {
    return [
      {
        source: "/car-phone-holder",
        destination: "/products/magnetic-car-phone-holder",
        permanent: true
      },
      {
        source: "/blood-pressure-monitor",
        destination: "/",
        permanent: false
      }
    ];
  }
};

export default nextConfig;
