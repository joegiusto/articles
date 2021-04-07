const dev = process.env.NODE_ENV !== 'production';

export const absolutePath = dev ? 'http://localhost:3001' : 'https://beta.articles.media';