# webpack-config-plugin
Configuration plugin (using [node-config](https://github.com/lorenwest/node-config)) for webpack.

## Install

```
npm install --save-dev Signiant/webpack-config-plugin
```

## Configuration

```js
// webpack.config.js
var path = require("path")
var ConfigPlugin = require("webpack-config-plugin")

module.exports = {
  // [...]
  plugins: [
    // [...]
    new ConfigPlugin({
    })
  ]
}
```

## Usage

When the plugin has been configured it enables a faux-module `config` which
uses `node-config` to load a merged configuration file based on environment variables,
as described [here](https://github.com/lorenwest/node-config/wiki/Configuration-Files)
