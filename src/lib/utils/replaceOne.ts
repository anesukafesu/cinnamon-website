export function replaceOne<T>(array: T[], oldElement: T, newElement: T) {
	const newArray = array.slice();

	for (let i = 0; i < newArray.length; i++) {
		if (newArray[i] === oldElement) {
			newArray[i] = newElement;
			break;
		}
	}

	return newArray;
}
