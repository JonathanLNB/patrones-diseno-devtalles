/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 */

interface FileSystemComponent {
  showDetails(ident?: string): void;
}

class File implements FileSystemComponent {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  showDetails(ident?: string) {
    console.log(`${ident}- Archivo: ${this.name}`);
  }
}

class Folder implements FileSystemComponent {
  private name: string;
  private contets: FileSystemComponent[] = [];

  constructor(name: string) {
    this.name = name;
  }
  add(fileSystemComponent: FileSystemComponent) {
    this.contets.push(fileSystemComponent);
  }
  showDetails(ident: string = "") {
    console.log(`${ident}+ Carpeta: ${this.name}`);
    this.contets.forEach((component) => component.showDetails(ident + " "));
  }
}

function main() {
  const file1 = new File("archivo1.txt");
  const file2 = new File("archivo2.txt");
  const file3 = new File("archivo3.txt");
  const file4 = new File("archivo4.txt");
  const file5 = new File("archivo5.txt");

  const folder = new Folder("Carpeta 1");
  const folder4 = new Folder("Carpeta 4");
  folder.add(file1);
  folder.add(file2);

  const folder2 = new Folder("Carpeta 2");
  folder2.add(file3);

  const folder3 = new Folder("Carpeta 3");
  folder3.add(file4);
  folder3.add(folder4);
  folder2.add(folder3);

  const rootFolder = new Folder("Carpeta Root");
  rootFolder.add(folder);
  rootFolder.add(folder2);
  rootFolder.add(file5);

  rootFolder.showDetails();
}
main();
