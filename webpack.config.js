const path = require("path")

module.exports = {
    entry: {
        index: "./client_side/index.ts",
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist/public/client_side")
    },
    module: {
        rules: [
            {
                test: /\.ts(x)?$/,
                use: [
                    "ts-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    }
}