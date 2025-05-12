import fs from "fs";
import path from "path";
import PromptTracker from "./promptTracker.js";

import Logger from "./logger/index.js";
const logger = Logger.getInstance();

async function processArticleFile(filePath: string): Promise<void> {
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const entries = JSON.parse(fileContent);

    const tracker = new PromptTracker();
    tracker.processEntries(entries);

    logger.info("Article data processed successfully");

    // Display some stats
    const promptStats = tracker.getPromptStats();
    logger.info(`Total unique prompts: ${promptStats.length}`);

    const modelStats = tracker.getModelStats();
    logger.info("Model statistics:");
    modelStats.forEach((model) => {
      logger.info(
        `- ${model.name}: ${model.usageCount} uses, ${model.accurateCount} accurate predictions`
      );
    });
  } catch (error) {
    logger.error("Error processing article file:", error as Error);
  }
}

// Example usage - you can adapt this for your specific needs
const filePath = path.resolve(process.cwd(), "article-data.json");
processArticleFile(filePath);
