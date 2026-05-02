/**
 * ! Patrón Iterator
 * Este patrón permite recorrer los elementos de una colección sin exponer
 * la estructura interna de la colección.
 *
 * * Es útil cuando se necesita recorrer una colección de elementos sin importar
 * * cómo se almacenan los elementos.
 *
 * https://refactoring.guru/es/design-patterns/iterator
 */

// Clase que representa una Carta de la baraja
class Card {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

// Clase que representa la colección de Cartas
class CardCollection {
  private cards: Card[] = [];

  addCard(card: Card): void {
    this.cards.push(card);
  }

  getCardAt(index: number) {
    if (index >= 0 && index < this.cards.length) {
      return this.cards[index];
    }

    return null;
  }

  getLenght() {
    return this.cards.length;
  }

  createIterator(): CardIterator {
    return new CardIterator(this);
  }

  //TODO: Implementación del iterador usando Symbol.iterator
  // Symbol.iterator (): IterableIterator<Card>
  *[Symbol.iterator](): IterableIterator<Card> {
    yield* this.cards;
  }
  // TODO: Implementación del iterador usando Generadores
  // *getCard(): IterableIterator<Card>
  *getCards(): IterableIterator<Card> {
    for (const card of this.cards) {
      yield card;
    }
  }
}

class CardIterator implements Iterator<Card> {
  private cardCollection: CardCollection;
  private position: number = 0;

  constructor(cardCollection: CardCollection) {
    this.cardCollection = cardCollection;
  }

  current(): Card | null {
    return this.cardCollection.getCardAt(this.position);
  }
  hasNext(): boolean {
    return this.position < this.cardCollection.getLenght();
  }
  next(): Card | null {
    if (this.hasNext()) {
      return this.cardCollection.getCardAt(this.position++);
    }
    return null;
  }
}

// Código Cliente para probar el iterador
interface Iterator<T> {
  current(): T | null;
  hasNext(): boolean;
  next(): T | null;
}

function main(): void {
  const deck = new CardCollection();
  const iterator = deck.createIterator();

  // Agregar algunas cartas a la colección
  deck.addCard(new Card("As de Corazones", 1));
  deck.addCard(new Card("Rey de Corazones", 13));
  deck.addCard(new Card("Reina de Corazones", 12));
  deck.addCard(new Card("Jota de Corazones", 11));

  // Recorrer la colección en orden usando for...of
  console.log("Recorriendo la colección de cartas:");
  for (const card of deck) {
    console.log(`Carta: ${card.name}, Valor: ${card.value}`);
  }
  console.log("\n");
  //Código del iterador propio
  while (iterator.hasNext()) {
    const card = iterator.next();

    if (card) {
      console.log(`Carta: ${card.name}, Valor: ${card.value}`);
    }
  }
}

main();
