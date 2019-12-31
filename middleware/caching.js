import { createClient } from "redis";
const REDIS_HOST = process.env.REDIS_HOST;

const client = createClient(6379, REDIS_HOST);

const cacheAllSongs = (req, res, next) => {
  let api = req.path;
  client.get(api, (err, data) => {
    if (data != null) {
      res.json({ result: JSON.parse(data) });
    } else {
      next();
    }
  });
};

export { cacheAllSongs };
