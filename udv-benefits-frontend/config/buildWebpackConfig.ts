import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { buildLoaders } from './buildLoaders';
import { buildDevServer } from './buildDevServer';


export function buildWebpackConfig (options: BuildOptions) : webpack.Configuration {
  const { mode, paths, isDev } = options;

  return {
    mode: mode,
    entry: paths.entry,
    output: {
        filename: '[name].[contenthash].js',
        path: paths.build,
        clean: true
    },
    plugins: buildPlugins(options), // buildPlugins
    module: {
        rules: buildLoaders(options)
    },
    resolve: buildResolvers(), // buildResolvers
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined
  };
};