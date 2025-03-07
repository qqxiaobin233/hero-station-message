const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  mode: 'development',
  // entry:path.resolve(__dirname,'./src/login/index.js'),
  entry: {
    'login': path.resolve(__dirname, 'src/login/index.js'),
    'content': path.resolve(__dirname, 'src/content/index.js'),
    'publish': path.resolve(__dirname, 'src/publish/index.js'),
    'analysis': path.resolve(__dirname, 'src/analysis/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './[name]/index.js',
    clean: true //生成打包后的内容之前，清空输出的目录
  },
  //插件
  plugins: [
    new MiniCssExtractPlugin({
      filename: './[name]/index.css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/login.html'),
      filename: path.resolve(__dirname, 'dist/login/index.html'),
      useCdn: process.env.NODE_ENV === 'production',//生产模式下使用cdn引用的地址
      chunks: ['login'] //引入哪些打包后的模块（和entry的key一致）
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/content.html'),
      filename: path.resolve(__dirname, 'dist/content/index.html'),
      useCdn: process.env.NODE_ENV === 'production',//生产模式下使用cdn引用的地址
      chunks: ['content']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/publish.html'),
      filename: path.resolve(__dirname, 'dist/publish/index.html'),
      useCdn: process.env.NODE_ENV === 'production',//生产模式下使用cdn引用的地址
      chunks: ['publish'] //引入哪些打包后的模块（和entry的key一致）
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/analysis.html'),
      filename: path.resolve(__dirname, 'dist/analysis/index.html'),
      useCdn: process.env.NODE_ENV === 'production',//生产模式下使用cdn引用的地址
      chunks: ['analysis']
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!.git'], // 排除 .git 文件夹
    }),
  ],
  //加载器
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/[hash][ext][query]'
        }
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'markdown-loader',
            options: {
              // 可以根据需要配置 Markdown 解析选项
            },
          },
        ],
      }
    ],
  },
  //优化
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      `...`,
      new CssMinimizerPlugin(),
    ],
  },

  //
  externals: {
    'wangeditor': 'window.wangEditor'
  },

  //解析
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  config.devtool = 'inline-source-map'
}

//防止import的包被异常处理
if (process.env.NODE_ENV === 'production') {
  config.externals = {
    //key:import from 语句后面的字符串
    //value:留在原地的全局变量（最好和cdn在全局暴露的变量一致）
    'bootstrap/dist/css/bootstrap.min.css': 'bootstrap',
    'axios': 'axios',
    'form-serialize': 'serialize',
    '@wangeditor/editor': 'wangEditor'
  }
}

module.exports = config