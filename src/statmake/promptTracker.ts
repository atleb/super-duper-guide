import fs from "fs";
import path from "path";
// import { v4 as uuidv4 } from "uuid";

import Logger from "./logger/index.js";
const logger = Logger.getInstance();

// Define interfaces for our data structures
interface ArticleEntry {
  id: number;
  brand: string;
  article_id: string;
  prompt: string;
  article: string;
  summary: string;
  hallucination_score: string;
  gpt4_predicted_accurate: boolean;
  model: string;
  candidate: string;
  created_at: string;
}

interface PromptEntry {
  id: string;
  prompt: string;
  timesUsed: number;
  firstUsed: string;
  lastUsed: string;
}

interface ModelStats {
  name: string;
  usageCount: number;
  accurateCount: number;
  inaccurateCount: number;
  hallucinationScores: {
    aboveZero: number;
    equalZero: number;
  };
}

interface DatabaseStructure {
  prompts: Record<string, PromptEntry>;
  models: Record<string, ModelStats>;
}

class PromptTracker {
  private dbPath: string;
  private db: DatabaseStructure;

  constructor(dbFilePath: string = "raw/db.json") {
    this.dbPath = path.resolve(process.cwd(), dbFilePath);
    this.db = this.loadDb();
  }

  private loadDb(): DatabaseStructure {
    try {
      if (fs.existsSync(this.dbPath)) {
        const data = fs.readFileSync(this.dbPath, "utf-8");
        return JSON.parse(data);
      }
      logger.info("No existing database found. Creating new database.");
      return { prompts: {}, models: {} };
    } catch (error) {
      logger.error("Error loading database:", error as Error);
      logger.info("Creating new database.");
      return { prompts: {}, models: {} };
    }
  }

  private saveDb(): void {
    try {
      fs.writeFileSync(this.dbPath, JSON.stringify(this.db, null, 2));
      logger.info("Database saved");
    } catch (error) {
      logger.error("Error saving database:", error as Error);
    }
  }

  private generatePromptId(prompt: string): string {
    // Check if we already have this prompt
    const existingId = Object.values(this.db.prompts).find(
      (p) => p.prompt === prompt
    )?.id;
    if (existingId) return existingId;

    // Generate a new UUID if not found
    // return uuidv4();
    return this.db.prompts.length.toString();
  }

  private updatePrompt(entry: ArticleEntry): void {
    const promptText = entry.prompt;
    const promptId = this.generatePromptId(promptText);
    const now = new Date().toISOString();

    if (!this.db.prompts[promptId]) {
      // New prompt
      this.db.prompts[promptId] = {
        id: promptId,
        prompt: promptText,
        timesUsed: 1,
        firstUsed: now,
        lastUsed: now,
      };
    } else {
      // Existing prompt
      this.db.prompts[promptId].timesUsed++;
      this.db.prompts[promptId].lastUsed = now;
    }
  }

  private updateModelStats(entry: ArticleEntry): void {
    const { model, gpt4_predicted_accurate, hallucination_score } = entry;

    if (!this.db.models[model]) {
      // Initialize model stats
      this.db.models[model] = {
        name: model,
        usageCount: 0,
        accurateCount: 0,
        inaccurateCount: 0,
        hallucinationScores: {
          aboveZero: 0,
          equalZero: 0,
        },
      };
    }

    // Update model stats
    this.db.models[model].usageCount++;

    if (gpt4_predicted_accurate) {
      this.db.models[model].accurateCount++;
    } else {
      this.db.models[model].inaccurateCount++;
    }

    // Update hallucination score counts
    const score = parseFloat(hallucination_score);
    if (score > 0) {
      this.db.models[model].hallucinationScores.aboveZero++;
    } else {
      this.db.models[model].hallucinationScores.equalZero++;
    }
  }

  public processEntries(entries: ArticleEntry[]): void {
    if (!Array.isArray(entries) || entries.length === 0) {
      logger.warn("No valid entries to process");
      return;
    }

    logger.info(`Processing ${entries.length} entries`);

    // Process each entry
    entries.forEach((entry) => {
      this.updatePrompt(entry);
      this.updateModelStats(entry);
    });

    // Save changes
    this.saveDb();
  }

  public getPromptStats(): PromptEntry[] {
    return Object.values(this.db.prompts);
  }

  public getModelStats(): ModelStats[] {
    return Object.values(this.db.models);
  }
}

export default PromptTracker;
