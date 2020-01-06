const path = require('path');

module.exports = {
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: false,
            },
        }),
    },
    resolver: {
        extraNodeModules: {
            '@mobile/screens': path.resolve(__dirname, 'src', 'screens'),
            "@mobile/api": path.resolve(__dirname, 'src', 'api'),
            "@mobile/configs": path.resolve(__dirname, 'src', 'configs'),
            "@mobile/store": path.resolve(__dirname, 'src', 'store'),
        },
    },
};
