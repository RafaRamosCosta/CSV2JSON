import { stringify } from "querystring";
import Converter from "./Converter";
const fs = require("fs");

const converter = new Converter("exemplo.csv", "exemplo");

describe("checkFileExistence", () => {
  it("should return true if file exists", () => {
    expect(converter.checkFileExistence()).toBe(true);
  });
});

describe("isFileCsv", () => {
  it("should return true if file extension is equal to .csv", () => {
    expect(converter.isFileCsv()).toBe(true);
  });
});

describe("readCsv", () => {
  it("should return the data of the csv file as a string", () => {
    expect(converter.readCsv()).toEqual(fs.readFileSync("./data/exemplo.csv"));
  });
});

describe("formatCsv", () => {
  it("should return an array of strings containing the csv headers and data", () => {
    const formattedCsv: string[] = converter.formatCsv();

    expect(formattedCsv.length > 0).toBe(true);
  });
});

describe("getHeaders", () => {
  it("should return an array of strings containing only the csv headers", () => {
    expect(converter.getHeaders().length > 0).toBe(true);
  });
});

describe("getCsvData", () => {
  it("should return an array of strings containing only the csv data", () => {
    expect(converter.getCsvData().length > 0).toBe(true);
  });
});

describe("convertToJSON", () => {
  it("should return an array of json objects containing the csv headers as keys and the csv data as values", () => {
    expect(converter.convertToJSON().every(Object)).toBe(true);
  });
});

describe("writeJsonFile", () => {
  it("should write the converted data of one csv file to a json file", () => {
    converter.writeJsonFile();
    expect(fs.existsSync("./output/exemplo.json")).toBe(true);
  });
});

describe("writeManyJSON", () => {
  it("should write the converted data of multiple csv files to json files", () => {
    Converter.writeManyJSON();
    const dataDir = fs.readdirSync("data");
    const outputDir = fs.readdirSync("output");

    expect(dataDir.length === outputDir.length).toBe(true);
  });
});
