const Redis = require("ioredis");

const client = new Redis(process.env.UPSTASH_REDIS_URL);

module.exports = client;
