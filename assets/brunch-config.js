let glob = require("glob")

exports.config = {
  files: {
    javascripts: {
      joinTo: {
        "js/app.js": /^(js)/,
        "js/vendor.js": /^node_modules/
      }
    },
    stylesheets: {
      joinTo: "css/app.css"
    },
    templates: {
      joinTo: "js/app.js"
    }
  },

  conventions: {
    assets: [/^(static)/]
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
      presets: ["env", "react"],
      ignore: [/^node_modules/],
      plugins: ["transform-object-rest-spread"]
    },
    copycat: {
      fonts: "node_modules/semantic-ui-css/themes/default/assets/fonts"
    },
    swPrecache: {
      swFileName: "js/service-worker.js",
      directoryIndex: "/",
      options: {
        stripPrefix: "/priv/static",
        staticFileGlobs: ["priv/static/**/*.*"],
        dynamicUrlToDependencies: {
          "/": [
            ...glob.sync("priv/static/js/*.js"),
            ...glob.sync("priv/static/css/*.css"),
            ...glob.sync("priv/static/fonts/*"),
            ...glob.sync("lib/hearthdecks_web/templates/**/*.eex")
          ]
        }
      }
    }
  },

  modules: {
    autoRequire: {
      "js/app.js": ["js/index"]
    }
  },

  npm: {
    enabled: true,
    globals: {
      $: "jquery",
      jQuery: "jquery"
    },
    styles: {
      "semantic-ui-css": ["semantic.min.css"]
    },
    whitelist: ["react", "react-dom"]
  }
}
