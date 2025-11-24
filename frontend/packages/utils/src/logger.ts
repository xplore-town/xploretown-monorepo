import log from "loglevel";

// Default to development mode
// Applications using this logger can call logger.setLevel() to override
// based on their own environment detection (e.g., import.meta.env.PROD in Vite apps)
log.setLevel("TRACE");

export const logger = {
  /**
   * Set the logging level programmatically
   * @param level - "trace" | "debug" | "info" | "warn" | "error" | "silent"
   */
  setLevel: (level: log.LogLevelDesc) => {
    log.setLevel(level);
  },
  trace: (...msg: unknown[]) => {
    log.trace(...msg);
  },
  debug: (...msg: unknown[]) => {
    log.debug(...msg);
  },
  info: (...msg: unknown[]) => {
    log.info(...msg);
  },
  warn: (...msg: unknown[]) => {
    log.warn(...msg);
  },
  error: (...msg: unknown[]) => {
    log.error(...msg);
  },
};
