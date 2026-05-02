/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */
import {COLORS} from "../helpers/colors.ts";

class ChatRoom {
  private users: User[] = [];
  public title: string;

  constructor(title: string) {
    this.title = title;
  }

  addUser(user: User) {
    this.users.push(user);
  }

  sendMessage(sender: User, message: string) {
    const usersToSend = this.users.filter((user) => user !== sender);

    for (const user of usersToSend) {
      user.receiveMessage(sender, message);
    }
  }
}

class User {
  private username: string;
  private chatRoom: ChatRoom;

  constructor(username: string, chatRoom: ChatRoom) {
    this.username = username;
    this.chatRoom = chatRoom;

    chatRoom.addUser(this);
  }

  sendMessage(message: string) {
    console.log(
      `\n\n%c${this.username} envía: %c${message}`,
      COLORS.blue,
      COLORS.white,
    );
    this.chatRoom.sendMessage(this, message);
  }

  receiveMessage(sender: User, message: string) {
    console.log(
      `%c${this.username} recibe de ${sender.username}: %c${message}`,
      COLORS.blue,
      COLORS.white,
    );
  }
}

function main() {
  const chatRoom: ChatRoom = new ChatRoom("Grupo de trabajo");

  const user1 = new User("JonathanLNB", chatRoom);
  const user2 = new User("Ana", chatRoom);
  const user3 = new User("Pepe", chatRoom);

  user1.sendMessage("Hola a todos!");
  user2.sendMessage("Hola Jonathan, ¿Cómo estas?");
  user3.sendMessage("Hola a todos, ¿Cómo estan?");

  console.log("\n\n");
}
main();
