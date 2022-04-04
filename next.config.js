/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    BASE_URL: 'http://localhost:3000',
    MONGO_URL:
      'mongodb+srv://admin:admin@cluster0.dyw74.mongodb.net/ecommerce?retryWrites=true&w=majority',
    ACCESS_TOKEN_SECRET: 'token_secret',
    REFRESH_TOKEN_SECRET: 'refresh_token_secret',
  },
}
