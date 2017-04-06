var path = require("path");
var loadFileConfigs = require('config').util.loadFileConfigs;

module.exports = Config;

function Config(options) {
  this.options = options;
  this._config = null;
  this.envCache = {};
}

Config.prototype.getConfig = function () {
  if (!this._config) {
    this.setEnvVariables();
    this._config = loadFileConfigs();
    this.restoreEnvVariables();
  }
  return this._config
}

Config.prototype.setEnvVariables = function () {
  if (this.options.environment) {
    for (var key in this.options.environment) {
      var value = this.options.environment[key];
      if (value) {
        this.envCache[key] = process.env[key];
        process.env[key] = value;
      }
    }
  }
}

Config.prototype.restoreEnvVariables = function () {
  for (var key in this.envCache) {
    var val = this.envCache[key];
    if (val) {
      process.env[key] = val;
    } else {
      delete process.env[key];
    }
  }
  this.envCache = {};
}

Config.prototype.apply = function(compiler) {
  // Build the configuration object
  var config = this.getConfig()

  compiler.plugin('compilation', (compilation) => {
      // Setup a resolver to faux-resolve a request for "config"
      compiler.resolvers.normal.plugin("module", function(request, next) {
          if (request.request !== "config") {
              // This plugin only resolves for the explicit module "config"
              return next()
          }

          return next(null, {
              // No actual source is needed here
              path: '',
              resolved: true
          })
      })
  })

  // Setup a module-factory to direct the flow to the loader (
  // which outputs the configuration JSON)
  compiler.plugin("normal-module-factory", function(nmf) {
    nmf.plugin("after-resolve", function(data, next) {
      if (data.rawRequest !== "config") {
        // This plugin only resolves for the explicit module "config"
        return next(null, data)
      }

      // console.log(data)
      // NOTE: Parameters are passed via query string to the loader
      //       at `this.query`
      data.loaders = [
        path.join(__dirname, "./config-loader.js") + "?" +
        JSON.stringify(config)
      ]

      return next(null, data)
    })
  })
}
