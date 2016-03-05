<<<<<<< HEAD
var webpack = require('webpack');

module.exports = {
    entry: "./app/components/Main.js",
    output: {
      filename: "public/bundle.js"
    },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
      },
    ],
  }
//  externals: {
//    'jade': 'jade',
//  },
//  plugins: [
//    // new webpack.DefinePlugin({
//    //   // Force HTMLtoJSX to use the in-browser `document` object rather than
//    //   // require the Node-only "jsdom" package.
//    //   IN_BROWSER: true,
//    // })
//  ],
};

/*
module.exports = {
    entry: "./app/components/Main.js",
    output: {
      filename: "public/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
}
*/          
            
=======
var webpack = require('webpack');

module.exports = {
    entry: "./app/components/Main.js",
    output: {
      filename: "public/bundle.js"
    },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
      },
    ],
  }
//  externals: {
//    'jade': 'jade',
//  },
//  plugins: [
//    // new webpack.DefinePlugin({
//    //   // Force HTMLtoJSX to use the in-browser `document` object rather than
//    //   // require the Node-only "jsdom" package.
//    //   IN_BROWSER: true,
//    // })
//  ],
};

/*
module.exports = {
    entry: "./app/components/Main.js",
    output: {
      filename: "public/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
}
*/          
            
>>>>>>> fc6a34967c28d2fe6e238873b869f438fdd09110
