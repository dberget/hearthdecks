exports.config = {
  files: {
    javascripts: {
      joinTo: {
        'js/app.js': /^(js)/,
        'js/vendor.js': /^node_modules/,
      },
    },
    stylesheets: {
      joinTo: "css/app.css"
    },
    templates: {
      joinTo: "js/app.js"
    }
  },

  conventions: {
    assets: [
      /^(static)/
    ]
  },

  // Phoenix paths configuration
  paths: {
    // Dependencies and current project directories to watch
    watched: ["static", "css", "js"],
    // Where to compile files to
    public: "../priv/static"
  },

  // Configure your plugins
  plugins: {
    babel: {
      presets: ['env', 'react'],
      ignore: [/^node_modules/],
    },
  },

  modules: {
    autoRequire: {
      "js/app.js": ["js/index"]
    },
  },

  npm: {
    enabled: true,
    globals: {
      $: 'jquery',
      jQuery: 'jquery'
    },
    whitelist: [
      "react",
      "react-dom"
    ],
  },
};
