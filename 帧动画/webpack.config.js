module.exports = {
    entry: {
        animation: './scripts/animation.js'
    },
    output: {
        path: __dirname + '/build',
        filename: '[name].js',
        library: 'animation',
        libraryTarget: 'umd'
    }
};
