const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
    pwa: {
        disable: process.env.NODE_ENV === 'development',
        dest: 'public',
        runtimeCaching,
    },
    images: {
        domains: ['cdn.articles.media'],
    },
    webpack: (config) => {
        config.module.rules.push({
          test: /\.html$/,
          loader: 'html-loader',
        });
        return config
    },
    eslint: {
        // Warning: Dangerously allow production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
})