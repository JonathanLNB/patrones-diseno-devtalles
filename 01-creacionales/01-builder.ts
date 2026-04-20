/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */
import { COLORS } from "../helpers/colors.ts";

class Computer {
  public cpu: string = "CPU - not defined";
  public ram: string = "RAM - not defined";
  public storage: string = "Storage - not defined";
  public gpu?: string;

  displayingConfiguration() {
    console.log(`Configuración de la computadora
        CPU: ${this.cpu}
        RAM: ${this.ram}
        Almacenamiento: ${this.storage}
        GPU: ${this.gpu ?? "No tiene GPU"}`);
  }
}

class ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  setCPU(cpu: string): ComputerBuilder {
    this.computer.cpu = cpu;
    return this;
  }

  setRAM(ram: string): ComputerBuilder {
    this.computer.ram = ram;
    return this;
  }

  setStorage(storage: string): ComputerBuilder {
    this.computer.storage = storage;
    return this;
  }

  setGPU(gpu: string): ComputerBuilder {
    this.computer.gpu = gpu;
    return this;
  }

  build() {
    return this.computer;
  }
}

function main() {
  const basicComputer = new ComputerBuilder()
    .setCPU("Intel Core 2 Dúo")
    .setRAM("4GB")
    .setStorage("256GB")
    .build();

  console.log("%cComputadora básica: ", COLORS.blue);
  basicComputer.displayingConfiguration();

  const computer = new ComputerBuilder()
    .setCPU("Intel i9")
    .setRAM("32GB")
    .setStorage("8TB SSD")
    .setGPU("Nvidia RTX 5070")
    .build();

  console.log("%cComputadora: ", COLORS.red);
  computer.displayingConfiguration();
}

main();
