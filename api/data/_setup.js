const tsConfigPaths = require("tsconfig-paths");

// Loading our tsconfig.json file
const baseUrl = require("path").join(__dirname, ".."); // Set the base URL for your project

const registerPathAliases = () => {
  tsConfigPaths.register({
    baseUrl,
    paths: require("../tsconfig.json").compilerOptions.paths,
  });
};

module.exports = { registerPathAliases };
