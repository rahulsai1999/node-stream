import { createClient } from "redis";
const REDIS_PORT = 6379;

const client = createClient(REDIS_PORT);

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
