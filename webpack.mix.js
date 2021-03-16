const mix = require("laravel-mix");

mix
  .postCss("resources/css/app.css", "public/css")
  .js("resources/js/app.js", "public/js")
  .vue()
  .extend("graphql", {
    dependencies() {
      return ["graphql", "graphql-tag"];
    },
    webpackRules() {
      return {
        test: /\.(graphql|gql)$/,
        exclude: /node_moules/,
        loader: "graphql-tag/loader",
      };
    },
  })
  .override((config) => {
    config.module.rules.push(
      {
        test: /\.vue$/,
        use: ["vue-svg-inline-loader"],
      },
      {
        test: /\.postcss$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader"],
      }
    );
  })
  .graphql();
