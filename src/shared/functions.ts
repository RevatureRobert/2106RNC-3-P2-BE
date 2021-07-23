import logger from './Logger';
import bcrypt from "bcrypt";

export const pErr = (err: Error) => {
    if (err) {
        logger.err(err);
    }
};

export const getRandomInt = () => {
    return Math.floor(Math.random() * 1_000_000_000_000);
};

export async function createHash(x: string) {
    logger.info("Starting hashing function...");
    const saltRounds = 10;
    const password = x;
    const hash = await bcrypt.hash(password, saltRounds);
    logger.info("Finished hashing function");
    return String(hash);
  }
