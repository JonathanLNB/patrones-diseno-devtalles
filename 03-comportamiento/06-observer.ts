/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */
import {COLORS} from "../helpers/colors.ts";

interface Observer {
  notify(videoTitle: string): void;
}

class YoutubeChannel {
  private subscribers: Observer[] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  subscribe(observer: Observer) {
    this.subscribers.push(observer);
    console.log(`Nuevo suscriptor al canal %c${this.name}`, COLORS.red);
  }

  unsubscribe(observer: Observer) {
    this.subscribers = this.subscribers.filter((sub) => sub !== observer);
    console.log(
      `Un suscriptor se ha dado de baja %c"${this.name}"`,
      COLORS.red,
    );
  }

  uploadVideo(videoTitle: string) {
    console.log(
      `Canal %c${this.name} %cha subido un nuevo video %c${videoTitle}`,
      COLORS.green,
      COLORS.white,
      COLORS.blue,
    );
    for (const subscriber of this.subscribers) {
      subscriber.notify(videoTitle);
    }
  }
}

class Subscriber implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  notify(videoTitle: string) {
    console.log(
      `%c${this.name} %cha sido notificado: %cNuevo video ${videoTitle}`,
      COLORS.blue,
      COLORS.white,
      COLORS.yellow,
    );
  }
}

function main() {
  const channel = new YoutubeChannel("Cocinando con el Jona");

  const ana = new Subscriber("Ana");
  const sofia = new Subscriber("Sofía");
  const luca = new Subscriber("Luca");
  const max = new Subscriber("Max");

  channel.subscribe(ana);
  channel.subscribe(max);

  channel.uploadVideo("Receta de tamales de Angular");

  channel.subscribe(sofia);

  channel.uploadVideo("Receta de React al pastor");

  channel.unsubscribe(ana);
  channel.subscribe(luca);

  channel.uploadVideo("Receta de Vue de maíz");

  channel.unsubscribe(luca);
  channel.unsubscribe(max);
  channel.unsubscribe(sofia);

  channel.uploadVideo("Docker a la parrilla");
}
main();
