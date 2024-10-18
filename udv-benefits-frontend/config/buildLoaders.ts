import webpack from 'webpack';
import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions) : webpack.RuleSetRule[] {

    const cssLoader = {
        test: /\.css$/, // поменять регулярку
        use: [
            'style-loader', 

            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                  localIdentName: options.isDev 
                    ? '[path][name]__[local]--[hash:base64:5]'
                    : '[hash:base64:8]',
                  namedExport: false 
                }
              }
            }   

            // добавить sass loader
        ]
    };

    const typeScriptLoader = {
        test:  /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
    };


    return [
        cssLoader,
        typeScriptLoader
    ];
}