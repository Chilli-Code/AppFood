module.exports = function (api) {
  api.cache(true);
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
      
    ],

    plugins: [["module-resolver", {
      root: ["./"],
      plugins: ['react-native-reanimated/plugin'],
      

      alias: {
        "@": "./",
        "tailwind.config": "./tailwind.config.js"
      }
    }]]
  };
};