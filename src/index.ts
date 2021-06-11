import {MatchResult} from "./MatchResultsEnum";
import {MatchReader} from "./inheritance/MatchReader";
import {MatchReader as InterfacedMatchReader} from "./interface/MatchReader";
import {CsvFileReader} from "./interface/CsvFileReader";
import {ConsoleReport} from "./ConsoleReport";
import {WinsAnalysis} from "./analyzers/WinsAnalysis";
import {Summary} from "./Summary";
import {HtmlReport} from "./HtmlReport";

const reader = new MatchReader('football.csv');
reader.read();

let manUnitedWins = 0;
for(let match of reader.data){
   if(match[1] === 'Man United' && match[5] === MatchResult.HomeWin ) {
       manUnitedWins++;
   } else if(match[2] === 'Man United' && match[5] === MatchResult.AwayWin ) {
       manUnitedWins++;
   }
}

console.log(`Man United won ${manUnitedWins} games`)

const csvFileReader = new CsvFileReader('football.csv');
const matchReader = new InterfacedMatchReader(csvFileReader);
matchReader.load();


manUnitedWins = 0;
for(let match of matchReader.matches){
    if(match[1] === 'Man United' && match[5] === MatchResult.HomeWin ) {
        manUnitedWins++;
    } else if(match[2] === 'Man United' && match[5] === MatchResult.AwayWin ) {
        manUnitedWins++;
    }
}

console.log(`Man United won ${manUnitedWins} games`)

//Example of composition approach (class Summary), heavy duty is on helper classes
const summary = new Summary(
    new WinsAnalysis('Man United'),
    new ConsoleReport()
);

summary.buildAndPrintReport(matchReader.matches);

//Now we can try it with different type of reporter
//Use static method winsAnalysisWithHtmlReport to make init shorter
const summaryWithHtmlReport = Summary.winsAnalysisWithHtmlReport("Man United")

summaryWithHtmlReport.buildAndPrintReport(matchReader.matches);
