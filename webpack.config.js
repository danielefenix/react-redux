var distFolderPath = "dist",
    devFolderPath = "dev",
    webpack = require('webpack'),
    packageJson = require("./package.json"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    Path = require('path'),
    sections = getSections();

module.exports = sections.map(function (section) {

    var entry = {};
    entry[section] = toBeTranspiled() ? ["./src/js/" + section + ".jsx"] : ["./src/js/" + section + ".js"];

    return {

        debug: isProduction(false, true),

        devtool: isProduction('source-map', 'eval'),

        entry: entry,

        output: getOutput(),

        resolve: {
            root: Path.resolve(__dirname),
            alias: {
                'jquery': Path.join(__dirname, 'node_modules/jquery/dist/jquery')
            }
        },

        module: {
            loaders: [
                isProduction(
                    {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
                    {test: /\.css$/, loader: "style-loader!css-loader"}
                ),
                {test: /\.jsx$/, loader: 'babel'},
                {test: /\.hbs$/, loader: "handlebars-loader"},
                {test: /\.json/, loader: "json-loader"},
                {test: /\.png$/, loader: "url-loader?limit=100000"},
                {test: /\.jpg$/, loader: "file-loader?name=[name].[ext]&limit=100000"},
                {test: /\.svg/, loader: "file-loader?name=[name].[ext]&limit=100000"},
                {test: /\.gif/, loader: "file-loader?name=[name].[ext]&limit=100000"},

                {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff"},
                {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff"},
                {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/octet-stream"},
                {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"}
            ]
        },

        plugins: clearArray([
            new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery"}),
            isProduction(new CleanWebpackPlugin([distFolderPath]), undefined),
            isProduction(new webpack.optimize.UglifyJsPlugin({
                compress: {warnings: false},
                output: {comments: false}
            })),
            isProduction(new ExtractTextPlugin(section + "/" + packageJson.name + "." + section + '.min.css')),
            isDevelop(new HtmlWebpackPlugin({
                inject: "body",
                chunks: [section],
                template: devFolderPath + "/" + section + ".template.html"
            }))
        ]),

        devServer:  {
            contentBase: devFolderPath,
            colors: true,
            progress: true,
            inline: true,
            historyApiFallback: true
        }
    }
});

function getOutput() {

    var output;

    switch (getEnvironment()) {
        case "production" :
            output = {
                path: Path.join(__dirname, distFolderPath),
                publicPath: 'http://fenixrepo.fao.org/dad-is/',
                filename: "[name]/" + packageJson.name + '.[name].min.js',
                chunkFilename: "[name]/" + 'chunk-[id].' + packageJson.name + '.[name].min.js'
            };
            break;
        case "develop" :
            output = {
                path: Path.join(__dirname, devFolderPath),
                filename: toBeTranspiled() ? "[name].jsx" : "[name].js"
            };
            break;
        default :
            output = {
                path: Path.join(__dirname, distFolderPath),
                filename: "index.js"
            };
            break;
    }

    return output;
}

// utils

function clearArray(array) {

    var result = [];

    array.forEach(function (s) {
        s ? result.push(s) : null;
    });

    return result;

}

function isProduction(valid, invalid) {

    return isEnvironment('production') ? valid : invalid;
}

function isDevelop(valid, invalid) {

    return isEnvironment('develop') ? valid : invalid;
}

function isEnvironment(env) {
    return getEnvironment() === env;
}

function getEnvironment() {
    return process.env.NODE_ENV;
}

function toBeTranspiled() {
    return process.env.TRANSPILED;
}

// sections

function getSections() {
    return (typeof process.env.SECTIONS != "undefined") ? process.env.SECTIONS.split(",") : undefined;
}