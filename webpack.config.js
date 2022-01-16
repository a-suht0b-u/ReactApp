module.exports = {
    devtool: "source-map",   // Needed for debug to work
    mode: "development",     // Needed because compilation complains if it's missing
    target: ["web", "es5"],  // Stops Webpack bundling ES5 output from loader with ES6 arrows, duh
    entry: "./app.js",
    output: {
        filename: "bundle.js",
        devtoolModuleFilenameTemplate: "[resource-path]", // Removes the webpack:/// prefix, fixes debugging in VS2017
        path: __dirname  // Puts bundle in dist by default without this
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,  // .js and .jsx files are bundled
                exclude: /node_modules/,  // ..but not in node_modules
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: [
                            // Tell Babel what to target: 'defaults' includes ES5, so IE will (usually) work
                            ["@babel/preset-env", { 
                                "targets": "defaults"
                            }],
                            "@babel/preset-react"  // Supports React
                        ]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    },
                ]
            }
        ]
    }
}
