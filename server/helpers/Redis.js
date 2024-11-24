const Valkey = require("ioredis");
const serviceUri = process.env.REDIS_URL;
const valkey = new Valkey(serviceUri);

module.exports = { valkey };
