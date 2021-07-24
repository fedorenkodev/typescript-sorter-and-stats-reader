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

abstract class FileReader<T> {
	data: T[] = [];

	constructor(public fileName: string) {}

	read() {
		this.data = fs
			.readFileSync(this.fileName, {
				encoding: 'utf-8',
			})
			.split('\n')
			.map((row: string): string[] => {
				return row.split(',')
			})
			.map(this.mapRow);
	}

	abstract mapRow(row: string[]): T;
}

class MatchFileReader extends FileReader<MatchData> {
	mapRow(row: string[]): MatchData {
		return [
			dateStringToDate(row[0]),
			row[1],
			row[2],
			parseInt(row[3]),
			parseInt(row[4]),
			row[5] as MatchResult,
			row[6],
		];
	}
}

const fileReader = new MatchFileReader('./src/stats/football.csv');
fileReader.read();

let manUnitedWins = 0;

for (let match of fileReader.data) {
	if (match[1] === 'Man United' && match[5] === MatchResult.HomeWin) {
		manUnitedWins++;
	} else if (match[2] === 'Man United' && match[5] === MatchResult.AwayWin) {
		manUnitedWins++;
	}
}

console.log(manUnitedWins);
