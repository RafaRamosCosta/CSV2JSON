const fs = require("fs");

export default class Converter {
  private filePath: string;
  constructor(private fileName: string, private outputFileName: string) {
    this.filePath = `./data/${this.fileName}`;
  }

  checkFileExistence(): boolean {
    try {
      if (!fs.existsSync(this.filePath))
        throw new Error("File does not exist!");
      return true;
    } catch (error: any) {
      throw error.message;
    }
  }

  isFileCsv(): boolean {
    try {
      if (this.filePath.includes(".csv")) return true;
      throw new Error("File must be a csv!");
    } catch (error: any) {
      throw error.message;
    }
  }

  readCsv(): string {
    const existence = this.checkFileExistence();
    const isCsv = this.isFileCsv();
    if (existence && isCsv) return fs.readFileSync(this.filePath);
    else return "";
  }

  formatCsv(): string[] {
    const formattedCsv = this.readCsv().toString().split("\n");
    formattedCsv.pop();
    if (formattedCsv.length > 0) return formattedCsv;
    else return [];
  }

  getHeaders(): string[] {
    const headers = this.formatCsv()[0]?.split(",");
    return headers;
  }

  getCsvData(): string[][] {
    let csvData = this.formatCsv()
      .slice(1)
      .map((row) => row.split(","));
    csvData.pop();

    return csvData;
  }

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
