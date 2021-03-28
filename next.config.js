const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        withPWA({
            pwa: {
              dest: 'public',
              runtimeCaching,
            },
        })
    
        return config;
    }
};