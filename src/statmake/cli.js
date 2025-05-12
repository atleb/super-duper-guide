import fs from "fs";
import path from "path";
import PromptTracker from "./promptTracker.js";

import Logger from "./logger/index.js";
const logger = Logger.getInstance();

const usage = `
Usage: node cli.js [command] [options]

Commands:
  process <file>  Process an article data file
  stats           Show statistics from the database

Options:
  --db <path>     Specify database file path (default: prompt-database.json)
`;

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) {
    console.log(usage);
    return;
  }

  // Find --db option if specified
  const dbIndex = args.findIndex((arg) => arg === "--db");
  const dbPath =
    dbIndex >= 0 && args.length > dbIndex + 1
      ? args[dbIndex + 1]
      : "raw/db.json";

  const tracker = new PromptTracker(dbPath);

  switch (command) {
    case "process": {
      const filePath = args[1];
      if (!filePath) {
        logger.warn("Missing file path");
        console.log(usage);
        return;
      }

      try {
        const resolvedPath = path.resolve(process.cwd(), filePath);

        if (!fs.existsSync(resolvedPath)) {
          logger.warn(`File not found: ${resolvedPath}`);
          return;
        }

        const fileContent = fs.readFileSync(resolvedPath, "utf-8");
        const entries = JSON.parse(fileContent);

        tracker.processEntries(entries);
        logger.info("Data processed successfully");
      } catch (error) {
        logger.error("Error processing file:", error || error.message);
      }
      break;
    }

    case "stats": {
      const promptStats = tracker.getPromptStats();
      const modelStats = tracker.getModelStats();

      console.log("\n=== Prompt Statistics ===");
      console.log(`Total unique prompts: ${promptStats.length}`);

      if (promptStats.length > 0) {
        // Show top 3 most used prompts
        const topPrompts = [...promptStats]
          .sort((a, b) => b.timesUsed - a.timesUsed)
          .slice(0, 3);
        console.log("\nTop used prompts:");
        topPrompts.forEach((prompt, i) => {
          console.log(
            `${i + 1}. Used ${prompt.timesUsed} times (ID: ${prompt.id})`
          );
          console.log(
            `   First: ${new Date(prompt.firstUsed).toLocaleString()}`
          );
          console.log(`   Last: ${new Date(prompt.lastUsed).toLocaleString()}`);
        });
      }

      console.log("\n=== Model Statistics ===");
      modelStats.forEach((model) => {
        console.log(`\n${model.name}:`);
        console.log(`  Usage count: ${model.usageCount}`);
        console.log(
          `  Accurate predictions: ${model.accurateCount} (${(
            (model.accurateCount / model.usageCount) *
            100
          ).toFixed(1)}%)`
        );
        console.log(
          `  Hallucination scores > 0: ${model.hallucinationScores.aboveZero}`
        );
      });
      break;
    }

    default:
      console.log(usage);
  }
}

main().catch((error) => {
  logger.error("Unhandled error:", error);
  process.exit(1);
});
