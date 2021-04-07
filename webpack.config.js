const args = require("minimist")(process.argv.slice(2));

const allowedEnvs = ["dev", "dist", "test"];

let env;
if (args._.length > 0 && args._.indexOf("start") !== -1) {
  env = "test";
} else if (args.env) {
  env = args.env;
} else {
  env = "dev";
}
process.env.REACT_WEBPACK_ENV = env;

function buildConfig(wantedEnv) {
  let isValid =
    wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
  let validEnv = isValid ? wantedEnv : "dev";
  let config = require(`./configs/${validEnv}`);
  return config;
}

module.exports = buildConfig(env);
