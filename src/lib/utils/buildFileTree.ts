export default function buildFileTree(filePaths: string[]) {
	const tree: Record<string, any> = {};

	for (const filePath of filePaths) {
		const pathSegments = filePath.split('/');
		let parentDir = tree;

		for (let i = 0; i < pathSegments.length - 1; i++) {
			const segment = pathSegments[i];

			if (parentDir[segment] === undefined) {
				parentDir[segment] = {};
			}

			parentDir = parentDir[segment];
		}

		parentDir[pathSegments[pathSegments.length - 1]] = filePath;
	}

	return tree;
}
