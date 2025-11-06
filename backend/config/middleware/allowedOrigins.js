const whitelistOrigins = require("../whiteListOrigins");

module.exports = function allowedOriginOptions() {
  return {
    origin: (origin, callback) => {
      //origin: the domain from which the request is coming
      if (!origin || whitelistOrigins.includes(origin)) {
        callback(null, true); //first parameter of callBack fn is error
      } else {
        callback(new Error("Cors Error"));
      }
    },
  };
};
