import {Logger} from "jsr:@deno-library/logger";
import {COLORS} from "../../helpers/colors.ts";

interface ILoggerAdapter {
  file: string;

  writeLog: (msg: string) => void;
  writeError: (msg: string) => void;
  writeWarning: (msg: string) => void;
}

export class DenoLoggerAdapter implements ILoggerAdapter {
  public file: string;
  private logger = new Logger();

  constructor(file: string) {
    this.file = file;
  }

  writeLog(msg: string) {
    this.logger.info(`[${this.file} Log] ${msg}`);
  }

  writeError(msg: string): void {
    this.logger.error(`[${this.file} Error] %c${msg}]`, COLORS.red);
  }
  writeWarning(msg: string): void {
    this.logger.warn(`[${this.file} Warning] %c${msg}]`, COLORS.yellow);
  }
}

// TODO: Implementar el LoggerAdapter
