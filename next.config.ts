export default {
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


