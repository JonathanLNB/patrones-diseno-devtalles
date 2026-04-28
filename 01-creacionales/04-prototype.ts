class Document {
  public title: string;
  public content: string;
  public author: string;

  constructor(title: string, content: string, author: string) {
    this.title = title;
    this.content = content;
    this.author = author;
  }

  displayInfo() {
    console.log(`
    Title: ${this.title}
    Content: ${this.content}
    Author: ${this.author}
    `);
  }

  clone(): Document {
    return new Document(this.title, this.content, this.author);
  }
}

function main() {
  const document1 = new Document("Cotización", "500 dólares", "Fernando");
  console.log({ document1 });
  document1.displayInfo();

  /*
    //Se pierde el tipo de dato al realiza un clon de su información.
    const document2Error = structuredClone(document1);
    console.log({ document2Error });
    //Nos tira un error ya que no es un objeto de la clase Document
    document2Error.displayInfo();
  */

  //No pierde el tipo de dato y mantiene la accesibilidad a todas sus propiedades.
  const document2 = document1.clone();
  console.log({ document2 });
  document2.title = "Nueva cotización";
  document2.displayInfo();
  console.log({ document2 });

}

main();
