export function validateFilePath(path: string) {
	if (path === '') {
		alert('File path cannot be empty.');
		return;
	}

	if (path.endsWith('/') || path.endsWith('.')) {
		alert("A file path cannot end with either '/' or '.'.");
		return;
	}

	return path;
}
