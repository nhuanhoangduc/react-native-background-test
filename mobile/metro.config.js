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
        },
    },
};
