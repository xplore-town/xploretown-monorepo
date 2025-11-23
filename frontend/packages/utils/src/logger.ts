import log from "loglevel";

// Vite sets import.meta.env.PROD to true in production builds
// We use a safe check in case this is run in a non-Vite environment (like Jest)
const isProduction = import.meta.env ? import.meta.env.PROD : false;

if (isProduction) {
  log.setLevel("WARN");
} else {
  log.setLevel("TRACE");
}

export const logger = {
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
