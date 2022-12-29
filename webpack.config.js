const path = require("path")

module.exports = {
    entry: {
        DataTable: "./client_side/DataTable.ts",
        navbar: "./client_side/navbar.ts",
        login: "./client_side/login.ts",
        checkForToken: "./client_side/checkForToken.ts",
        home: "./client_side/home.ts",
        warnings: "./client_side/warnings.ts",
        signup: "./client_side/signup.ts"
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
    },

    mode: 'development'
}