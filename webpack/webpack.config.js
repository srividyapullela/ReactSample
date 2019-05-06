const merge = require("webpack-merge");
const baseConfig = require("./base.config.js");
const Dotenv = require('dotenv-webpack');
var commonConfig = require('./common.config.js');

const configBasedOnMode = mode => {
    var environmentFile = commonConfig.getEnvironmentFile(mode);
    
    return merge([
                {
                    plugins: [
                        new Dotenv({
                            path: environmentFile, // Path to .env file (this is the default)
                            safe: false // load .env.example (defaults to "false" which does not use dotenv-safe)
                        })
                    ],
                },
            ]);
}
 

module.exports = mode => {
    console.log("Building for the environment::::"+mode)
    return merge(baseConfig,configBasedOnMode(mode))
}

