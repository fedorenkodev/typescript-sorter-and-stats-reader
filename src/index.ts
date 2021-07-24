import { Summary, MatchReader } from "./stats/composition";

const matches = MatchReader.readFromCSV('football.csv');

const summary = Summary.winsAnalyzerAndHtmlReport('Newcastle', 'report.html');
summary.analyzeAndReport(matches.data);
