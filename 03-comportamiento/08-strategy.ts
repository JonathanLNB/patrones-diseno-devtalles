/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

import {COLORS} from "../helpers/index.ts";

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */

interface MovementStrategy {
  move(): void;
}

class SwimFast implements MovementStrategy {
  move(): void {
    console.log("%cEl pato nada rápidamente sobre el agua\n", COLORS.blue);
  }
}

class FlyOverWater implements MovementStrategy {
  move(): void {
    console.log("%cEl pato vuela elegantemente sobre el agua\n", COLORS.brown);
  }
}

class WalkClumsily implements MovementStrategy {
  move(): void {
    console.log("%cEl pato camina torpemente por la orilla\n", COLORS.green);
  }
}

class Duck {
  private name: string;
  private movementStrategy: MovementStrategy;

  constructor(name: string, movementStrategy: MovementStrategy) {
    this.name = name;
    this.movementStrategy = movementStrategy;

    console.log(`%c${name} %clisto para competir`, COLORS.green, COLORS.white);
  }

  performMove() {
    console.log(`%c${this.name} se prepara para moverse...`, COLORS.blue);
    this.movementStrategy.move();
  }

  setMovementStrategy(movementStrategy: MovementStrategy) {
    this.movementStrategy = movementStrategy;
    console.log(`%c${this.name} cambió de estrategia`, COLORS.brown);
  }
}

function main() {
  const juan = new Duck("Patito Juan", new SwimFast());
  const pedro = new Duck("Patito Pedro", new FlyOverWater());
  const martin = new Duck("Patito Martinillo", new WalkClumsily());

  console.log("%cComienza la carrera de patos", COLORS.red);

  juan.performMove();
  pedro.performMove();
  martin.performMove();

  martin.setMovementStrategy(new FlyOverWater());
  martin.performMove();

  martin.setMovementStrategy(new SwimFast());
  martin.performMove();
}
main();
