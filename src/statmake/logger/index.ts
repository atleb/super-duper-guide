export default class Logger {
  private static instance: Logger;
  private logLevel: number;

  private constructor() {
    this.logLevel = 0; // Default log level
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public setLogLevel(level: number): void {
    this.logLevel = level;
  }

  public info(message: string): void {
    if (this.logLevel >= 1) {
      console.log(`INFO: ${message}`);
    }
  }

  public warn(message: string): void {
    if (this.logLevel >= 2) {
      console.warn(`WARN: ${message}`);
    }
  }

  public error(message: string, error: Error): void {
    if (this.logLevel >= 3) {
      console.error(`ERROR: ${message}`, error);
    }
  }
}
