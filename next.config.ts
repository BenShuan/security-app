export default {
  publicRuntimeConfig: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://securety-app.vercel.app',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        search: ''
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        search: ''
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        search: ''
      },
      {
        protocol: 'https',
        hostname: 'rl7baiycfw9vwyyi.public.blob.vercel-storage.com',
        search: ''
      }
      
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};


