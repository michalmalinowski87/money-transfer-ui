module.exports = {
  stories: [
    '../src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  features: {
    interactionsDebugger: true,
  },
  staticDirs: ['../public'],
  // Add this to disable caching
  webpackFinal: async (config) => {
    // Disable cache in webpack
    config.cache = false;
    
    // Find and modify css loaders to disable caching
    config.module.rules.forEach(rule => {
      if (rule.test && rule.test.toString().includes('css')) {
        if (rule.use) {
          const cssLoader = Array.isArray(rule.use) 
            ? rule.use.find(loader => loader.loader && loader.loader.includes('css-loader'))
            : rule.use;
            
          if (cssLoader && cssLoader.options) {
            cssLoader.options.sourceMap = true; // Enable source maps
            cssLoader.options.modules = cssLoader.options.modules || {};
            cssLoader.options.modules.auto = true; // Enable CSS modules
          }
        }
      }
    });
    
    return config;
  },
  docs: {
    autodocs: true
  }
};