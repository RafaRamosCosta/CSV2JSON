import fs from "fs";
import path from "path";
type JsonObjType = Record<string, unknown>;
/**
 * The Converter class provides methods that can convert csv data into json!
 *
 * ---
 * @author RafaelRamosCosta
 */
export default class Converter {
  private filePath: string;

  constructor(
    private dirName: string,
    private fileName: string,
    private outputDir: string
  ) {
    this.filePath = `./${this.dirName}/${this.fileName}`;
  }

  /**
   * The checkFileExistence method is used to protect the process in case the file does not exist
   * @returns true if the file exists
   *
   * @throws Error if the file doesn't exist
   * ---
   * @author RafaelRamosCosta
   */
  checkFileExistence(): boolean {
    const fileExists = fs.existsSync(this.filePath);
    return fileExists;
  }

  /**
   * The isFileCsv method is used to protect the process in case the file is not a csv
   * @returns true if the file is a csv
   * @throws  Error if the file is not a csv
   * ---
   * @author RafaelRamosCosta
   */
  isFileCsv(): boolean {
    const isCsv = path.extname(this.filePath) === ".csv";
    return isCsv;
  }

  /**
   * The readCsv method is used to read the csv file that was passed in the constructor
   * @returns
   * - sucess: the csv data as a string
   * - error: an empty string
   * ---
   * @author RafaelRamosCosta
   */
  readCsv(): string {
    try {
      const fileExists = this.checkFileExistence();
      const isCsv = this.isFileCsv();

      if (!fileExists) throw new Error("File does not exist!");
      if (!isCsv) throw new Error("File must be a csv!");

      const csvData = fs.readFileSync(this.filePath, "utf8");
      const csvHasData = csvData.length;
      if (!csvHasData) throw new Error("File doesn't have ant content!");

      return csvData;
    } catch (error: any) {
      throw error.message;
    }
  }

  /**
   * The formatCsv method is used to format the return of the readCsv method in an array of strings
   * @returns success: formattedCsv -> an array of strings containing the csv headers and data
   *
   * ---
   * @throws Error if the file doesn't have any content
   * ---
   * @author RafaelRamosCosta
   */
  formatCsv(csvContent: string): string[] {
    const formattedCsv = csvContent.split("\n");
    const lastLine = formattedCsv[formattedCsv.length - 1];
    if (lastLine === "") formattedCsv.pop();

    return formattedCsv;
  }

  /**
   * The getHeaders method is used get the headers of the csv file and return them into an array.
   * @returns - headers: an array of strings containing the csv headers
   * ---
   * @author RafaelRamosCosta
   */
  getHeaders(formattedCsv: string[]): string[] {
    const headers = formattedCsv[0].split(",");
    return headers;
  }

  /**
   * The getCsvData method is used get the data of the csv file and return them into an array.
   * @returns - csvData: an array of strings containing the csv data
   * ---
   * @author RafaelRamosCosta
   */
  getCsvData(formattedCsv: string[]): string[][] {
    let csvData = formattedCsv.slice(1).map((row) => row.split(","));
    csvData.pop();
    return csvData;
  }

  /**
   * The convertToJson method is used to convert the whole csv data into an array of Objects.
   * @returns - jsonArr: Array of Objects
   * ---
   * @author RafaelRamosCosta
   */
  convertToJSON(): JsonObjType[] {
    const csvContent = this.readCsv();
    const formattedCsv = this.formatCsv(csvContent);

    const headers = this.getHeaders(formattedCsv);
    const data = this.getCsvData(formattedCsv);

    const jsonArr = data.reduce((objArr: JsonObjType[], row) => {
      const jsonObj: JsonObjType = row.reduce(
        (obj: JsonObjType, value, index) => {
          obj[headers[index]] = value;
          return obj;
        },
        {}
      );

      return [...objArr, jsonObj];
    }, []);

    return jsonArr;
  }

  writeFile(jsonArr: JsonObjType[]): void {
    fs.writeFileSync(
      `./${this.outputDir}/${this.fileName.replace(".csv", ".json")}`,
      JSON.stringify(jsonArr, null, 2)
    );
  }

  /**
   * The writeJsonFile method is used write the array of objects into a .json file.
   *
   * ---
   * @author RafaelRamosCosta
   */
  writeJsonFile(): void {
    const jsonArr = this.convertToJSON();
    const jsonArrSize = jsonArr.length;
    const dirExists: boolean = fs.existsSync(this.outputDir);

    if (jsonArrSize) {
      if (!dirExists) {
        fs.mkdirSync(this.outputDir);

        this.writeFile(jsonArr);
      }
      this.writeFile(jsonArr);
    }
  }

  /**
   * The writeManyJSON method is used to write multiple array of objects into .json files.
   *
   * ---
   * @author RafaelRamosCosta
   */
  static writeManyJSON(): void {
    try {
      const dataDir = fs.readdirSync("data");
      const dirHasFiles = dataDir.length !== 0;
      if (!dirHasFiles)
        throw new Error("Directory does not have any archives!");
      dataDir.forEach((file: string) => {
        const converter = new Converter("data", file, "./output");
        converter.writeJsonFile();
      });
    } catch (e) {
      throw e;
    }
  }
}

// const converter = new Converter("exemplo.csv", "exemplo");
Converter.writeManyJSON();
