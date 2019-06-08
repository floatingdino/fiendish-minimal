const path = require("path");

const resolve = {
  extensions: [".js", ".jsx", ".json", ".css"],
  alias: {
    posts: path.resolve(__dirname, "src/posts"),
    routes: path.resolve(__dirname, "src/routes"),
    functions: path.resolve(__dirname, "src/functions"),
    components: path.resolve(__dirname, "src/components"),
    classes: path.resolve(__dirname, "src/classes")
  }
};

module.exports = {
  resolve
};
