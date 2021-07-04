import { LinkedList, NumbersCollection, StringCollection } from "./sorter";

const linkedList = new LinkedList();
linkedList.add(-1);
linkedList.add(0);
linkedList.add(9);
linkedList.add(4);

linkedList.sort();
linkedList.print();

const numbersCollection = new NumbersCollection([-1, 0, 9, 4])
numbersCollection.sort();
console.log(numbersCollection.data)

const stringCollection = new StringCollection('bBaA')
stringCollection.sort();
console.log(stringCollection.data);
