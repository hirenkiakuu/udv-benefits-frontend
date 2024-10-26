export type BuildMode = 'production' | 'development';

export type BuildOptions = {
    mode: 'development' | 'production',
    paths: BuildPaths,
    isDev: boolean,
    port: number
};

export type BuildPaths = {
    entry: string,
    build: string,
    html: string
};

export type BuildEnv = {
    mode: BuildMode,
    port: number
};