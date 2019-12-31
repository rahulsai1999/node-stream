## Song-Streamer

[![Build Status](https://travis-ci.com/rahulsai1999/node-stream.svg?branch=master)](https://travis-ci.com/rahulsai1999/node-stream)

- Clone the repository and build the image

```console
git clone https://github.com/rahulsai1999/node-stream
docker build -t noneuser2183/songstreamer .
```

- Create a .env file 
```
DB_URL=mongodb_url 
REDIS_HOST=redis
```
- Deployment phase

```console
docker-compose up --build
```

- Read the API docs
  [Postman Docs](https://documenter.getpostman.com/view/5649815/SWLcc8gV?version=latest)
