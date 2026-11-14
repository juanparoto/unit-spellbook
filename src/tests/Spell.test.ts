import { beforeEach, expect, test, describe } from "vitest";
import Spell, { type FirstAppearance } from "../domain/Spell";
import Spellbook from "../domain/Spellbook";

describe("Spell", () => {
  let maxLength: number = 121;
  let lumos: Spell;
  beforeEach(() => {
    lumos = new Spell("Lumos", "Ilumina la punta de la varita", "book");
  });

  test("La primera aparicion esta bien si", () => {
    expect(lumos.getOriginLabel()).toBe("Libro");
  });

  test("A spell from a book is original", () => {
    expect(lumos.isOriginal()).toBeTruthy();
  });

  test("Deberia devolver toda su información", () => {
    expect(lumos.describe()).toBe(
      "Lumos (Libro): Ilumina la punta de la varita",
    );
  });

  test("No se permiten nombres vacios", () => {
    expect(() => new Spell("", "Descripcion", "book")).toThrow();
  });

  test("No se permiten desc vacios", () => {
    expect(() => new Spell("Pepe", "", "book")).toThrow();
  });

  test("No se permiten desc de mas de 120 caracteres", () => {
    expect(() => new Spell("Pepe", "a".repeat(maxLength), "book")).toThrow();
  });

  test("No se permite no indicar el tipo", () => {
    expect(() => new Spell("Pepe", "hola", "" as FirstAppearance)).toThrow();
  });
});

describe("Spellbook", ()=>{
  let speelbook: Spellbook;
  let lumos: Spell;
  let acio: Spell;

  beforeEach(()=>{
    speelbook = new Spellbook();
    lumos = new Spell("Lumos", "Ilumina la punta de la varita", "book");
    acio = new Spell("acio", "Te tira toda la leche bien rica", "movie");
  })

  test("No se puede añadir el mismo hechizo dos veces", ()=>{
      speelbook.addspell(lumos);
      expect(()=>speelbook.addspell(lumos)).toThrow();
  });

  test("Retorna una copia de los hechizos",()=>{
    speelbook.addspell(lumos);
    speelbook.addspell(acio);

    const spells = speelbook.getSpells();

    expect(speelbook.getSpells()).toEqual([lumos,acio]);
    expect(spells).not.toBe(speelbook.getSpells());
  });

  test("Te deuvelve solo los del tipo que queres", ()=>{
      speelbook.addspell(lumos);
      speelbook.addspell(acio);
      expect(speelbook.findByOrigin("book")).toEqual([lumos]);
  });

  test("Cuenta los hechizos por origen", () => {
    speelbook.addspell(lumos);
    speelbook.addspell(acio);

    expect(speelbook.countByOrigin()).toEqual({
        book: 1,
        movie: 1,
        videogame: 0,
        serie : 0
    });
});





});