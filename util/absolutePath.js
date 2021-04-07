const prod = process.env.NEXT_PUBLIC_VERCEL_ENV == "production";

export const absolutePath = prod ? 'https://beta.articles.media' : 'http://localhost:3001';