import { replaceOne } from '$lib/utils/replaceOne';

const SAVED_FILES_KEY = 'savedFiles';

export default class FileStorage {
	saveAll(code: Record<string, string>) {
		for (const [path, content] of Object.entries(code)) {
			localStorage.setItem(path, content);
		}

		const filePaths = Object.keys(code);
		localStorage.setItem(SAVED_FILES_KEY, JSON.stringify(filePaths));
	}

	updateSavedFilesRegistry(updateFunction: (files: string[]) => string[]) {
		const savedFiles = JSON.parse(localStorage.getItem(SAVED_FILES_KEY) || '[]');
		const updatedSavedFiles = updateFunction(savedFiles);
		localStorage.setItem(SAVED_FILES_KEY, JSON.stringify(updatedSavedFiles));
	}

	renameFile(oldPath: string, newPath: string) {
		const existingFileContents = localStorage.getItem(oldPath);

		if (existingFileContents !== null) {
			localStorage.removeItem(oldPath);
			localStorage.setItem(newPath, existingFileContents);
			this.updateSavedFilesRegistry((savedFiles) => replaceOne(savedFiles, oldPath, newPath));
		}
	}

	deleteFile(filePath: string) {
		localStorage.removeItem(filePath);
		this.updateSavedFilesRegistry((savedFiles) => savedFiles.filter((f) => f !== filePath));
	}
}
