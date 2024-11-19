const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require('path');
const fs = require('fs');

const getDynamicEntries = (baseDir) => {
    const entries = {};
    const directories = fs.readdirSync(baseDir, { withFileTypes: true });

    directories.forEach((dir) => {
        if (dir.isDirectory()) {
            const entryPath = path.resolve(baseDir, dir.name, 'index.js');
            if (fs.existsSync(entryPath)) {
                entries[`${baseDir.split('src/')[1]}/${dir.name}/index`] = entryPath;
            }
        }
    });

    return entries;
};

module.exports = {
    ...defaultConfig,
    entry: {
        ...getDynamicEntries(path.resolve(__dirname, 'src/blocks')),
        ...getDynamicEntries(path.resolve(__dirname, 'src/sidebars')),
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js', // Outputs to build/blocks/block-name/index.js and build/sidebars/sidebar-name/index.js
    },
    plugins: [
        ...defaultConfig.plugins,
        new defaultConfig.plugins[0].constructor({
            filename: ({ chunk }) => {
                // Ensure CSS files go to their corresponding folder
                const pathParts = chunk.name.split('/');
                const lastPart = pathParts.pop();
                return `${pathParts.join('/')}/${lastPart}.css`;
            },
        }),
    ],
};
