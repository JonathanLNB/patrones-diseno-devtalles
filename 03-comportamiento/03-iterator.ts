import {COLORS} from "../helpers/colors.ts";

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
interface Iterator<T> {
  current(): T | null;
  hasNext(): boolean;
  next(): T | null;
}

class Pokemon {
  public name: string;
  public type: string;

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }
}

class PokemonCollection {
  private pokemons: Pokemon[] = [];

  addPokemon(pokemon: Pokemon) {
    this.pokemons.push(pokemon);
  }

  getPokemonAt(index: number) {
    if (index >= 0 && index < this.pokemons.length) {
      return this.pokemons[index];
    }

    return null;
  }

  getLenght() {
    return this.pokemons.length;
  }

  createIterator(): PokemonIterator {
    return new PokemonIterator(this);
  }
}

class PokemonIterator implements Iterator<Pokemon> {
  private pokemonCollection: PokemonCollection;
  private position: number = 0;

  constructor(pokemonCollection: PokemonCollection) {
    this.pokemonCollection = pokemonCollection;
  }

  current(): Pokemon | null {
    return this.pokemonCollection.getPokemonAt(this.position);
  }
  hasNext(): boolean {
    return this.position < this.pokemonCollection.getLenght();
  }
  next(): Pokemon | null {
    if (this.hasNext()) {
      return this.pokemonCollection.getPokemonAt(this.position++);
    }
    return null;
  }
}

function main() {
  const pokedex = new PokemonCollection();

  pokedex.addPokemon(new Pokemon("Pikachu", "Eléctrico"));
  pokedex.addPokemon(new Pokemon("Charmander", "Fuego"));
  pokedex.addPokemon(new Pokemon("Squirtle", "Agua"));
  pokedex.addPokemon(new Pokemon("Bulbasaur", "Planta"));
  pokedex.addPokemon(new Pokemon("Jigglypuff", "Normal"));
  pokedex.addPokemon(new Pokemon("Fuecoco", "Fuego"));

  const iterator = pokedex.createIterator();

  while (iterator.hasNext()) {
    const poekmon = iterator.next();

    if (poekmon) {
      console.log(
        `Pokémon %c${poekmon.name}, Tipo: %c${poekmon.type}`,
        COLORS.green,
        COLORS.green,
      );
    }
  }
}
main();
