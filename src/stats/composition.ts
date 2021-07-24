import fs from 'fs';

const dateStringToDate = (date: string): Date => {
	// 25/09/2021
	const dateParts = date
		.split('\n')
		.map((item: string): number => {
			return parseInt(item);
		});

	return new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
}

enum MatchResult {
	HomeWin = 'H',
	AwayWin = 'A',
	Draw = 'D',
}

type MatchData = [
	Date,
	string,
	string,
	number,
	number,
	MatchResult,
	string,
];

interface Reader {
	data: string[][];
	read(): void;
}

class CSVReader implements Reader {
	data: string[][] = [];

	constructor(public fileName: string) {}

	read(): void {
		this.data = fs
			.readFileSync(this.fileName, {
				encoding: 'utf-8',
			})
			.split('\n')
			.map((row: string): string[] => {
				return row.split(',')
			})
	}
}

export class MatchReader {
	public data: MatchData[] = [];

	constructor(public reader: Reader) {
		this.reader.read();
		this.load();
	}

	static readFromCSV(fileName: string): MatchReader {
		return new MatchReader(new CSVReader('./src/stats/' + fileName));
	}

	load(): void {
		this.data = this.reader.data.map((row: string[]): MatchData => {
			return [
				dateStringToDate(row[0]),
				row[1],
				row[2],
				parseInt(row[3]),
				parseInt(row[4]),
				row[5] as MatchResult,
				row[6],
			];
		});
	}
}

/* Analyze */
export interface Analyzer {
	run(matches: MatchData[]): string;
}

export interface OutputTarget {
	print(report: string): void;
}

export class Summary {
	constructor(
		public analyzer: Analyzer,
		public outputTarget: OutputTarget
	) {}

	static winsAnalyzerAndHtmlReport(team: string, fileName: string): Summary {
		return new Summary(
			new WinsAnalyzer(team),
			new HtmlReport(fileName)
		);
	}

	analyzeAndReport(matches: MatchData[]): void {
		this.outputTarget.print(this.analyzer.run(matches));
	}
}

export class WinsAnalyzer implements Analyzer {
	constructor(public team: string) {}

	run(matches: MatchData[]): string {
		let wins = 0;

		for (let match of matches) {
			if (match[1] === this.team && match[5] === MatchResult.HomeWin) {
				wins++;
			} else if (match[2] === this.team && match[5] === MatchResult.AwayWin) {
				wins++;
			}
		}

		return this.team + ' wins ' + wins + ' matches.';
	}
}

export class ConsoleReport implements OutputTarget {
	print(report: string): void {
		console.log(report);
	}
}

export class HtmlReport implements OutputTarget {
	constructor(public fileName: string) {}

	print(report: string): void {
		const html = `
			<div>
				<h1>Analysis Output</h1>
				<p>${report}</p>
			</div>
		`;

		fs.writeFileSync('./src/stats/' + this.fileName, html);
	}
}
