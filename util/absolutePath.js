const prod = process.env.NEXT_PUBLIC_VERCEL_ENV == "production";

export const absolutePath = prod ? process.env.NEXT_PUBLIC_VERCEL_URL : 'http://localhost:3001';