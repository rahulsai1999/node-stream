import { createClient } from "redis";
const REDIS_HOST = process.env.REDIS_HOST;
const client = createClient(6379, REDIS_HOST);

const cacheReturn = (req, res, next) => {
  client.get(req.path, (err, data) => {
    if (data != null) {
      res.json({ result: JSON.parse(data) });
    } else {
      next();
    }
  });
};

const cacheEnable = (req, data) => {
  client.setex(req.path, 60, JSON.stringify(data));
};

export { cacheReturn, cacheEnable };
