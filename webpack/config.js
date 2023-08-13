import path from "path";
import { fileURLToPath } from 'url';
import CopyPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: "development",
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../docs/js'),
        library: {
            type: "module"
        }
    },
    experiments: {
        outputModule: true
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./src/bootstrap.css", to: "../css/bootstrap.css" }
            ],
        }),
    ],
};
