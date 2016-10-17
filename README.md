# webpack-config-plugin
Configuration plugin (using [node-config](https://github.com/lorenwest/node-config)) for webpack.

## Install

```
npm install --save-dev Signiant/webpack-config-plugin
```

## Configuration

The environment variables used to load a given node-config configuration
can be overridden in the plugin configuration under the `environment`
property.

```js
// webpack.config.js
var path = require("path");
var ConfigPlugin = require("webpack-node-config-plugin");

module.exports = {
  // [...]
  plugins: [
    // [...]
    new ConfigPlugin({
        // Optionally override node-config enviornment variables
        environment: {
          NODE_CONFIG_DIR: path.join(__dirname, "config"),
          NODE_ENV: "development",
          HOSTNAME: "myStage",
          NODE_APP_INSTANCE: "a"
        }
    })
  ]
}
```

Values specified in the plugin config will take precedence over any
existing environment variables.
Environment will be restored to original values after the plugin has
finished loading the config.

## Usage

When the plugin has been configured it enables a faux-module `config` which
uses `node-config` to load a merged configuration file based on environment variables,
as described [here](https://github.com/lorenwest/node-config/wiki/Configuration-Files)
