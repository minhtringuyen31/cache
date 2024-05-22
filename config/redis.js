import redis from "redis";

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient(REDIS_PORT);

redisClient.on("error", (error) => {
  console.error("Error connecting to Redis:", error);
});

redisClient.ping((error, result) => {
  if (error) {
    console.error("Error pinging Redis:", error);
  } else {
    console.log(
      "Connected to Redis on port: ",
      REDIS_PORT,
      "\nPing result:",
      result
    );
  }
});

export default redisClient;
