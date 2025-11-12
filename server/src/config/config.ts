import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

export class Config {
  private static instance: Config;
  private config: Record<string, string> = {};

  private constructor() {
    this.loadConfig();
  }

  /**
   * Singleton instance
   */
  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  /**
   * Load configuration based on NODE_ENV
   */
  private loadConfig(): void {
    const env = process.env.NODE_ENV?.trim() || 'development';
    const basePath = process.cwd();

    // Determine which env file to load
    const envFilePath = path.resolve(basePath, `.env.${env}`);
    const defaultEnvPath = path.resolve(basePath, '.env');

    // If environment-specific file exists, use it
    if (fs.existsSync(envFilePath)) {
      dotenv.config({ path: envFilePath, override: true });
      console.log(`Loaded environment file: ${envFilePath}`);
    } else if (fs.existsSync(defaultEnvPath)) {
      dotenv.config({ path: defaultEnvPath, override: true });
      console.log(`No .env.${env} found, loaded fallback: ${defaultEnvPath}`);
    } else {
      console.warn(`No environment file found for NODE_ENV=${env}`);
    }

    // Store merged config (dotenv + existing process.env)
    this.config = Object.keys(process.env).reduce<Record<string, string>>((acc, key) => {
      const val = process.env[key];
      if (val !== undefined) acc[key] = val;
      return acc;
    }, {});
  }

  /**
   * Get a config value with optional default
   */
  public get<T = string>(key: string, defaultValue?: T): T {
    const value = this.config[key];
    if (value === undefined) {
      if (defaultValue !== undefined) return defaultValue;
      throw new Error(`Configuration key "${key}" not found`);
    }
    return value as T;
  }

  /**
   * Typed getters
   */
  public getString(key: string, defaultValue?: string): string {
    return this.get(key, defaultValue);
  }

  public getNumber(key: string, defaultValue?: number): number {
    const value = this.get<string>(key, defaultValue?.toString());
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) throw new Error(`Invalid number for key "${key}"`);
    return parsed;
  }

  public getBoolean(key: string, defaultValue?: boolean): boolean {
    const value = this.get<string>(key, defaultValue?.toString());
    return value === 'true' || value === '1';
  }

  /**
   * Check if config key exists
   */
  public has(key: string): boolean {
    return key in this.config;
  }

  /**
   * Override a value at runtime
   */
  public set(key: string, value: any): void {
    this.config[key] = String(value);
    process.env[key] = String(value);
  }

  /**
   * Dump all config (useful for debugging, but not in production logs)
   */
  public getAll(): Record<string, string> {
    return { ...this.config };
  }
}

export const config = Config.getInstance();