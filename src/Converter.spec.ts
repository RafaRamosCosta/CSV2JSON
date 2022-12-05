import Converter from "./Converter";
import fs from "fs";

const dirPath = fs.mkdtempSync("test");

const MOCKCSVCONTENT =
  "Nome,Stack\nJosé,FRONT\nMaria,BACK\nLucas,FRONT\nSilvia,FRONT\nAdriana,BACK\n";

const FORMATTEDCSV = [
  "Nome,Stack",
  "José,FRONT",
  "Maria,BACK",
  "Lucas,FRONT",
  "Silvia,FRONT",
  "Adriana,BACK",
];
fs.writeFileSync(dirPath + "/test.csv", MOCKCSVCONTENT);

const converter = new Converter(dirPath, "test.csv", "test");
const converterErrTest = new Converter(dirPath, "Errtest.txt", "Errtest");

describe("checkFileExistence", () => {
  it("should return true if file exists", () => {
    expect(converter.checkFileExistence()).toBe(true);
  });
  it("should return false if file does not exist", () => {
    expect(converterErrTest.checkFileExistence()).toBe(false);
  });
});

describe("isFileCsv", () => {
  it("should return true if file extension is equal to .csv", () => {
    expect(converter.isFileCsv()).toBe(true);
  });
  it("should throw an error if file is not a csv", () => {
    expect(converterErrTest.isFileCsv()).toBe(false);
  });
});

describe("readCsv", () => {
  it("should return the data of the csv file as a string", () => {
    expect(converter.readCsv()).toEqual(
      fs.readFileSync("./data/exemplo.csv", "utf8")
    );
  });
  it("should throw an error if file does not exist", () => {
    expect(() => converterErrTest.readCsv()).toThrow("File does not exist");
  });
});

describe("formatCsv", () => {
  it("should return an array of strings containing the csv headers and data", () => {
    const formattedCsv: string[] = converter.formatCsv(MOCKCSVCONTENT);

    expect(formattedCsv).toEqual(FORMATTEDCSV);
  });
});

describe("getHeaders", () => {
  it("should return an array of strings containing only the csv headers", () => {
    expect(converter.getHeaders(FORMATTEDCSV)).toEqual(["Nome", "Stack"]);
  });
});

describe("getCsvData", () => {
  it("should return an array of strings containing only the csv data", () => {
    expect(converter.getCsvData(FORMATTEDCSV)).toEqual([
      ["José", "FRONT"],
      ["Maria", "BACK"],
      ["Lucas", "FRONT"],
      ["Silvia", "FRONT"],
    ]);
  });
});

describe("convertToJSON", () => {
  it("should return an array of objects containing the csv headers as keys and the csv data as values", () => {
    expect(converter.convertToJSON()).toEqual([
      { Nome: "José", Stack: "FRONT" },
      { Nome: "Maria", Stack: "BACK" },
      { Nome: "Lucas", Stack: "FRONT" },
      { Nome: "Silvia", Stack: "FRONT" },
    ]);
  });
  it("should throw an error if the file does not exist", () => {
    expect(() => converterErrTest.convertToJSON()).toThrow("File does not exist!");
  })
});

describe("writeJsonFile", () => {
  it("should write the converted data of one csv file to a json file", () => {
    converter.writeJsonFile();
    expect(fs.existsSync("./test/test.json")).toBe(true);
  });
  it("shouldn't write a json file if the csv file doesn't exist or doesn't have any content", () => {
    expect(() => converterErrTest.writeJsonFile()).toThrow(
      "File does not exist!"
    );
  });
});

describe("writeManyJSON", () => {
  it("should write the converted data of multiple csv files to json files", () => {
    Converter.writeManyJSON();
    const dir = fs.readdirSync(dirPath);
    const outputDir = fs.readdirSync("test");

    expect(dir.length === outputDir.length).toBe(true);
  });
});
