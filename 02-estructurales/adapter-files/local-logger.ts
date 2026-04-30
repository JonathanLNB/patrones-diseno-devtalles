import {COLORS} from "../../helpers/colors.ts";

export class LocalLogger {
  constructor(
    private file: string,
  ) {}
  writeLog(msg: string): void {
    console.log(`[${this.file} Log] %c${msg}]`, COLORS.blue);
  }
  writeError(msg: string): void {
    console.log(`[${this.file} Error] %c${msg}]`, COLORS.red);
  }
  writeWarning(msg: string): void {
    console.log(`[${this.file} Warning] %c${msg}]`, COLORS.yellow);
  }
}
// TODO: Implementar el LocalLogger Class
