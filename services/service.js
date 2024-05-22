import redisClient from "../config/redis.js";
import { promisify } from "util";
import dotenv from "dotenv";

dotenv.config();

const existsAsync = promisify(redisClient.exists).bind(redisClient);
const llenAsync = promisify(redisClient.llen).bind(redisClient);
const lrangeAsync = promisify(redisClient.lrange).bind(redisClient);
const lremAsync = promisify(redisClient.lrem).bind(redisClient);
const lpushAsync = promisify(redisClient.lpush).bind(redisClient);
const ltrimAsync = promisify(redisClient.ltrim).bind(redisClient);
const MAX_LENGTH = process.env.MAX_LENGTH;

const ProtoCacheService = {
  saveData: async (key, value) => {
    try {
      const [newId, newType] = value.split("-").slice(0, 2);
      const list = await lrangeAsync(key, 0, -1);
      for (let item of list) {
        const [existingId, existingType] = item.split("-").slice(0, 2);
        if (existingId === newId && existingType === newType) {
          await lremAsync(key, 0, item);
        }
      }
      const result = await lpushAsync(key, value);
      await ltrimAsync(key, 0, MAX_LENGTH - 1);
      return result;
    } catch (error) {
      console.log("Server Error:", error);
    }
  },
  getRecentActivities: async (key) => {
    try {
      const exists = await existsAsync(key);
      if (exists) {
        const count = await llenAsync(key);
        const reply = await lrangeAsync(key, 0, count - 1);
        return reply;
      }
      return [];
    } catch (error) {
      console.error("Error getting recent activities:", error);
      throw error;
    }
  },
};

export { ProtoCacheService };
