/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: 'http://localhost:3000',
    MONGO_URL:
      'mongodb+srv://admin:admin@cluster0.dyw74.mongodb.net/ecommerce?retryWrites=true&w=majority',
  },
}
