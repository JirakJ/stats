import fs from 'fs';
import {dateStringToDate} from "../utils";
import {MatchResult} from "../MatchResultsEnum";
import {MatchData} from "../MatchData";

export class CsvFileReader {
    data: MatchData[] = [];

    constructor(public filename:string) {}

    read(): void {
        this.data = fs.readFileSync(this.filename,{encoding: "utf-8"})
                      .split('\n')
                      .map((line:string): string[] => line.split(','))
                      .map((row: string[]): MatchData => {
                          return [
                              dateStringToDate(row[0]),
                              row[1],
                              row[2],
                              parseInt(row[3]),
                              parseInt(row[4]),
                              row[5] as MatchResult,
                              row[6]
                          ]
                      });
    }
}
