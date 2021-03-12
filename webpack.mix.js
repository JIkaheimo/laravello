const mix = require("laravel-mix");

mix.postCss("resources/css/app.css", "public/css", [require("tailwindcss")]);

mix.js("resources/js/app.js", "public/js").vue();

mix.extend("graphql", {
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
});

mix.graphql();
