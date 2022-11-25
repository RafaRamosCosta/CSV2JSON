const fs = require("fs");

/**
 * The Converter class provides methods that can convert csv data into json!
 * 
 * ---
 * @author RafaelRamosCosta
 */
export default class Converter {
  private filePath: string;
  constructor(private fileName: string, private outputFileName: string) {
    this.filePath = `./data/${this.fileName}`;
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
    try {
      if (!fs.existsSync(this.filePath))
        throw new Error("File does not exist!");
      return true;
    } catch (error: any) {
      throw error.message;
    }
  }

  /**
   * The isFileCsv method is used to protect the process in case the file is not a csv
   * @returns true if the file is a csv  
   * @throws  Error if the file is not a csv
   * ---
   * @author RafaelRamosCosta
   */
  isFileCsv(): boolean {
    try {
      if (this.filePath.includes(".csv")) return true;
      throw new Error("File must be a csv!");
    } catch (error: any) {
      throw error.message;
    }
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
    const existence = this.checkFileExistence();
    const isCsv = this.isFileCsv();
    if (existence && isCsv) return fs.readFileSync(this.filePath);
    else return "";
  }

  /**
   * The formatCsv method is used to format the return of the readCsv method in an array of strings
   * @returns
   *    - success: formattedCsv -> an array of strings containing the csv headers and data
   *    - error: an empty array
   * ---
   * @author RafaelRamosCosta
   */
  formatCsv(): string[] {
    const formattedCsv = this.readCsv().toString().split("\n");
    formattedCsv.pop();
    if (formattedCsv.length > 0) return formattedCsv;
    else return [];
  }

  /**
   * The getHeaders method is used get the headers of the csv file and return them into an array.
   * @returns - headers: an array of strings containing the csv headers
   * ---
   * @author RafaelRamosCosta
   */
  getHeaders(): string[] {
    const headers = this.formatCsv()[0]?.split(",");
    return headers;
  }

  /**
   * The getCsvData method is used get the data of the csv file and return them into an array.
   * @returns - csvData: an array of strings containing the csv data
   * ---
   * @author RafaelRamosCosta
   */
  getCsvData(): string[][] {
    let csvData = this.formatCsv()
      .slice(1)
      .map((row) => row.split(","));
    csvData.pop();

    return csvData;
  }

  /**
   * The convertToJson method is used to convert the whole csv data into an array of Objects.
   * @returns - jsonArr: Array of Objects
   * ---
   * @author RafaelRamosCosta
   */
  convertToJSON(): Object[] {
    const headers = this.getHeaders();
    const data = this.getCsvData();
    const jsonArr: Object[] = [];

    for (const row of data) {
      const jsonObj: any = {};
      for (const col in row) {
        jsonObj[headers[col]] = row[col];
      }
      jsonArr.push(jsonObj);
    }

    return jsonArr;
  }

  /**
   * The writeJsonFile method is used write the array of objects into a .json file.
   * 
   * ---
   * @author RafaelRamosCosta
   */
  writeJsonFile(): void {
    const jsonArr = this.convertToJSON();

    if (jsonArr.length) {
      if (fs.existsSync("./output")) {
        fs.writeFileSync(
          `./output/${this.outputFileName}.json`,
          JSON.stringify(jsonArr, null, 2)
        );
      } else {
        fs.mkdirSync("./output");
        fs.writeFileSync(
          `./output/${this.outputFileName}.json`,
          JSON.stringify(jsonArr, null, 2)
        );
      }
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
      if (dataDir.length < 1)
        throw new Error("Directory does not have any archives!");
      dataDir.forEach((file: string) => {
        const converter = new Converter(file, file.replace(".csv", ""));
        converter.writeJsonFile();
      });
    } catch (e) {
      throw e;
    }
  }
}

// const converter = new Converter("exemplo.csv", "exemplo");
Converter.writeManyJSON();
