import { fechaParseada, fechaParseadaCorta, horaParseada } from "../../utils/DateParser";

describe("testing Dateparser depends on summer or easter time", ()=>{
  const prueba1 = "2020-04-20T12:08:06.819Z";
  const prueba2 = "2020-12-20T12:08:06.819Z";
  const prueba3 = "2020-01-20T12:08:06.819Z";
  
  test("fecha parseada larga abril", ()=>{
    expect(fechaParseada(prueba1)).toBe(" 20/4/2020 14:08");
  });

  test("fecha parseada larga diciembre", ()=>{
    expect(fechaParseada(prueba2)).toBe(" 20/12/2020 13:08");
  });

  test("fecha parseada corta abril", ()=>{
    expect(fechaParseadaCorta(prueba1)).toBe("20/4/2020");
  });

  test("fecha parseada corta diciembre", ()=>{
    expect(fechaParseadaCorta(prueba2)).toBe("20/12/2020");
  });

  test("hora parseada abril", ()=>{
    expect(horaParseada(prueba1)).toBe(" 14:08");
  });

  test("hora parseada diciembre", ()=>{
    expect(horaParseada(prueba2)).toBe(" 13:08");
  });

});