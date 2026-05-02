/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 */
import {COLORS} from "../helpers/colors.ts";

interface Command {
  execute(): void;
}

class Light {
  turnOn(): void {
    console.log("%cLa luz está encendida", COLORS.green);
  }
  turnOff(): void {
    console.log("%cLa luz está apagada", COLORS.brown);
  }
}

class Fan {
  on(): void {
    console.log("%cEl ventilador está encendido", COLORS.green);
  }
  off(): void {
    console.log("%cEl ventilador está apagado", COLORS.brown);
  }
}

class LightOn implements Command {
  constructor(private light: Light) {}
  execute(): void {
    this.light.turnOn();
  }
}

class LightOff implements Command {
  constructor(private light: Light) {}
  execute(): void {
    this.light.turnOff();
  }
}

class FanOn implements Command {
  constructor(private fan: Fan) {}
  execute(): void {
    this.fan.on();
  }
}

class FanOff implements Command {
  constructor(private fan: Fan) {}
  execute(): void {
    this.fan.off();
  }
}

class RemoteControl {
  private commands: Record<string, Command> = {};

  setCommand(button: string, command: Command): void {
    this.commands[button] = command;
  }

  pressButton(button: string): void {
    if (this.commands[button]) {
      this.commands[button].execute();
      return;
    }
    console.log("%cNo se ha asignado un comando a ese botón", COLORS.red);
  }
}

function main() {
  const remoteControl = new RemoteControl();
  const light = new Light();
  const fan = new Fan();

  const lightOnCommand = new LightOn(light);
  const lightOffCommand = new LightOff(light);

  const fanOnCommand = new FanOn(fan);
  const fanOffCommand = new FanOff(fan);

  remoteControl.setCommand("1", lightOnCommand);
  remoteControl.setCommand("2", lightOffCommand);
  remoteControl.setCommand("3", fanOnCommand);
  remoteControl.setCommand("4", fanOffCommand);

  let continueProgram = true;
  do {
    console.clear();

    const button = prompt(`
    Presiona un botón del control:
    1) Encender luz
    2) Apagar luz
    3) Encender ventilador
    4) Apagar ventilador
    
    Butón:`) ?? "";

    remoteControl.pressButton(button);

    let continueProgramResponse = prompt(`
    \n¿Deseas Continuar? (y/n): `)?.toLowerCase();

    continueProgram = continueProgramResponse !== "n";
  } while (continueProgram);
}

main();
