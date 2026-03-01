export function normaliseFilePath(path: string) {
	return path.trim().split('/').join('/');
}
