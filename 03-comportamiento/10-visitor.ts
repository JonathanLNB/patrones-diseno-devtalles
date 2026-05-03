/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

import {COLORS} from "../helpers/index.ts";

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */

interface Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void;
  visitHauntedHouse(hauntedHouse: HauntedHouse): void;
  visitFerrisWheel(ferrisWheel: FerrisWheel): void;
}

interface Attraction {
  accept(visitor: Visitor): void;
  getPrice(): number;
}

class RollerCoaster implements Attraction {
  private price: number = 50;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitRollerCoaster(this);
  }
}

class HauntedHouse implements Attraction {
  private price: number = 40;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitHauntedHouse(this);
  }
}

class FerrisWheel implements Attraction {
  private price: number = 30;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitFerrisWheel(this);
  }
}

class ChildVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `%cNiño en Montaña Rusa: %cPrecio con descuento %c$${
        rollerCoaster.getPrice() * 0.5
      }`,
      COLORS.green,
      COLORS.white,
      COLORS.yellow,
    );
  }
  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `%cNiño en Casa del Terror: %cPrecio con descuento %c$${
        hauntedHouse.getPrice() * 0.7
      }`,
      COLORS.green,
      COLORS.white,
      COLORS.yellow,
    );
  }
  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `%cNiño en la Rueda de la fortuna: %cPrecio con descuento %c$${
        ferrisWheel.getPrice() * 0.6
      }`,
      COLORS.green,
      COLORS.white,
      COLORS.yellow,
    );
  }
}

class AdultVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `%cAdulto en Montaña Rusa: %cPrecio con descuento %c$${rollerCoaster.getPrice()}`,
      COLORS.blue,
      COLORS.white,
      COLORS.yellow,
    );
  }
  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `%cAdulto en Casa del Terror: %cPrecio con descuento %c$${hauntedHouse.getPrice()}`,
      COLORS.blue,
      COLORS.white,
      COLORS.yellow,
    );
  }
  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `%cAdulto en la Rueda de la fortuna: %cPrecio con descuento %c$${ferrisWheel.getPrice()}`,
      COLORS.blue,
      COLORS.white,
      COLORS.yellow,
    );
  }
}

class SeniorVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `%cAdulto mayor en Montaña Rusa: %cPrecio con descuento %c$${
        rollerCoaster.getPrice() * 0.85
      }`,
      COLORS.brown,
      COLORS.white,
      COLORS.yellow,
    );
  }
  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `%cAdulto mayor en Casa del Terror: %cPrecio con descuento %c$${
        hauntedHouse.getPrice() * 0.85
      }`,
      COLORS.brown,
      COLORS.white,
      COLORS.yellow,
    );
  }
  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `%cAdulto mayor en la Rueda de la fortuna: %cPrecio con descuento %c$${
        ferrisWheel.getPrice() * 0.85
      }`,
      COLORS.brown,
      COLORS.white,
      COLORS.yellow,
    );
  }
}

function main() {
  const attractions = [
    new RollerCoaster(),
    new HauntedHouse(),
    new FerrisWheel(),
  ];

  console.log("\n%cPrecios atracciones", COLORS.pink);
  console.log(
    `%cMontaña Rusa: $${new RollerCoaster().getPrice()}`,
    COLORS.purple,
  );
  console.log(
    `%cCasa del Terror: $${new HauntedHouse().getPrice()}`,
    COLORS.purple,
  );
  console.log(
    `%cRueda de la fortuna: $${new FerrisWheel().getPrice()}`,
    COLORS.purple,
  );

  console.log("\n\n%cVisitante Niño", COLORS.green);

  const childVisitor = new ChildVisitor();
  const adultVisitor = new AdultVisitor();
  const seniorVisitor = new SeniorVisitor();

  attractions.forEach((attraction) => {
    attraction.accept(childVisitor);
  });

  console.log("\n\n");
  attractions.forEach((attraction) => {
    attraction.accept(adultVisitor);
  });

  console.log("\n\n");
  attractions.forEach((attraction) => {
    attraction.accept(seniorVisitor);
  });

  console.log("\n\n");
}
main();
