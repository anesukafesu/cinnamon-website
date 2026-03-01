interface CodeObject {
	activeFile: string;
	files: { filePath: string; content: string }[];
}

const SAVED_FILES_KEY = 'savedFiles';

export function loadCode(): CodeObject {
	const savedFilesNames = JSON.parse(localStorage.getItem(SAVED_FILES_KEY) || '[]');

	if (savedFilesNames.length !== 0) {
		return getExistingCode(savedFilesNames);
	} else {
		return getStarterCode();
	}
}

function getStarterCode(): CodeObject {
	return {
		activeFile: 'main.cin',
		files: [
			{ filePath: 'main.cin', content: 'function main () do\n\toutput int add(21 21);\nend' },
			{ filePath: 'add.cin', content: 'function add(a b) do\n\treturn a + b;\nend' }
		]
	};
}

function getExistingCode(savedFileNames: string[]): CodeObject {
	const existingCode: CodeObject = {
		activeFile: '',
		files: []
	};

	for (const fileName of savedFileNames) {
		const content = localStorage.getItem(fileName) || '';

		existingCode.files.push({ filePath: fileName, content });
	}

	existingCode.activeFile = existingCode.files[0].filePath;
	return existingCode;
}
