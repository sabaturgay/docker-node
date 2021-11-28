module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      [
        'module-resolver',
        {
          extensions: [
            '.js',
            '.jsx',
            '.es',
            '.es6',
            '.mjs',
            '.ts',
            '.tsx',
          ],
          alias: {
            '@server': './src/server',
            '@utils': './src/utils',
            '@root': './src',
            '@context': './src/context',
            '@constants': './src/constants',
            '@type': './src/type',
            '@assets': './src/assets',
            'colay/ramda': 'colay/lib/ramda'
          },
        },
      ],
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
    ],
  }
}
