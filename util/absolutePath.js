const prod = process.env.NEXT_PUBLIC_VERCEL_ENV == "production";

export const absolutePath = prod ? location.hostname : 'http://localhost:3001';