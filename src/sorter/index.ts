abstract class Sorter {
	sort(): void {

		for (let i = 0; i < this.length; i++) {
			let swapped = false;

			for (let j = 0; j < this.length - i - 1; j++) {

				if (this.compare(j, j + 1)) {

					this.swap(j, j + 1)

					swapped = true;
				}
			}

			if (!swapped) {
				break
			}
		}
	}

	abstract get length(): number;
	abstract compare(a: number, b: number): boolean;
	abstract swap(a: number, b: number): void;
}

export class NumbersCollection extends Sorter {
	constructor(public data: number[]) {
		super();
	}

	get length(): number {
		return this.data.length;
	}

	compare(a: number, b: number): boolean {
		return this.data[a] > this.data[b];
	}

	swap(a: number, b: number): void {
		let temp = this.data[a];
		this.data[a] = this.data[b];
		this.data[b] = temp;
	}
}

export class StringCollection extends Sorter {
	constructor(public data: string) {
		super();
	}

	get length(): number {
		return this.data.length;
	}

	compare(a: number, b: number): boolean {
		return this.data[a].charCodeAt(0) > this.data[b].charCodeAt(0);
	}

	swap(a: number, b: number): void {
		let characters = this.data.split('');

		const temp = characters[a];
		characters[a] = characters[b];

		characters[b] = temp;

		this.data = characters.join('');
	}
}

export class LinkedListNode {
	next: LinkedListNode | null = null;

	constructor(public value: number) {}
}

export class LinkedList extends Sorter {
	head: LinkedListNode | null;

	constructor() {
		super();
		this.head = null;
	}

	get length():number {
		if (!this.head) {
			return 0;
		}

		let length = 1;

		let item = this.head;

		while(item.next) {
			item = item.next;
			length++;
		}

		return length;
	}

	compare(a: number, b: number): boolean {
		if (!this.head) {
			throw new Error('List is empty.');
		}

		return this.at(a).value > this.at(b).value;
	}

	swap(a: number, b: number): void {
		if (!this.head) {
			throw new Error('List is empty.');
		}

		const leftItem = this.at(a);
		const rightItem = this.at(b);

		const temp = leftItem.value;
		leftItem.value = rightItem.value;
		rightItem.value = temp;
	}

	add(value: number): void {
		const node =  new LinkedListNode(value);

		if (this.head) {
			let item = this.head;

			while (item.next) {
				item = item.next
			}

			item.next = node;
		} else {
			this.head = node;
		}
	}

	at(index: number): LinkedListNode {
		if (!this.head) {
			throw new Error('Invalid index.');
		}

		let counter = 0;

		let item: LinkedListNode | null = this.head;
		while (item) {
			if (counter === index) {
				return item;
			}

			item = item.next;
			counter++;
		}

		throw new Error('Invalid index.');
	}

	print(): void {
		if (this.head) {
			let item: LinkedListNode | null = this.head;

			while (item) {
				console.log(item.value);
				item = item.next;
			}
		}
	}
}

