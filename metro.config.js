const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
    // Adds support for `.db` files for SQLite databases
    'glb'
);


// metro.config.js
//const config = {
//    resolver: {
//        //resolverMainFields: ['module', 'browser', 'main'],
//        sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs'],
//        assetExts: ['glb', 'gltf', 'png', 'jpg', 'ttf', 'obj', 'mtl'],
//    },
//}
module.exports = config;