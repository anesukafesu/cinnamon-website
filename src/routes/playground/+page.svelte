<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { runProgram } from '@cinnamon-lang/interpreter';

	import EditorView from '$lib/infrastructure/EditorView';
	import FileStorage from '$lib/infrastructure/FileStorage';
	import Models from '$lib/infrastructure/Models';
	import setupCinnamonLanguageSupport from '$lib/infrastructure/setupCinnamonLanguageSupport';
	import { loadCode } from '$lib/utils/loadCode';
	import { normaliseFilePath } from '$lib/utils/normaliseFilePath';
	import { replaceOne } from '$lib/utils/replaceOne';
	import { validateFilePath } from '$lib/utils/validateFilePath';
	import ConsoleIODevice from '$lib/infrastructure/ConsoleIODevice';
	import ConsoleIOAdapter from '$lib/IOAdapter.svelte.js';

	import Console from './Console.svelte';
	import FileList from './FileList.svelte';

	setupCinnamonLanguageSupport();

	const consoleIOAdapter = new ConsoleIOAdapter();
	const consoleIODevice = new ConsoleIODevice(consoleIOAdapter);
	const models = new Models();
	const fileStorage = new FileStorage();

	let editorContainer: HTMLDivElement;
	let editorView: EditorView;

	let openFiles = $state<string[]>([]);
	let activeFileName = $state('');

	function run() {
		const program = {
			files: Object.entries(models.getAllCode()).map(([filePath, contents]) => {
				return { filePath, contents };
			})
		};

		runProgram(program, consoleIODevice);
	}

	function openFile(path: string) {
		const model = models.getModel(path);

		if (!model) {
			alert(`No file is stored at path ${path}.`);
			return;
		}

		editorView.setModel(model!);
		activeFileName = path;
	}

	function newFile() {
		const path = prompt('Path to new file: ');

		if (path === null) {
			return;
		}

		const normalisedPath = normaliseFilePath(path);

		try {
			validateFilePath(normalisedPath);
		} catch (e) {
			if (e instanceof Error) alert(e.message);
			else alert('Unknown error encountered.');
		}

		const existingModel = models.getModel(normalisedPath);
		if (existingModel) {
			alert('A file already exists at that path.');
			return;
		}

		const model = models.upsertModel(path, 'cinnamon', '');
		editorView.setModel(model!);
		openFiles.push(path);
		activeFileName = path;
	}

	function deleteFile(path: string) {
		const shouldDelete = confirm(`Are you sure you want to delete ${path}?`);
		if (!shouldDelete) {
			return;
		}

		// Delete file from file storage
		fileStorage.deleteFile(path);

		// Delete file from openFiles
		openFiles = openFiles.filter((f: string) => f !== path);

		// Delete the model
		models.deleteModel(path);

		// If the file was the active file, set another file as active
		if (activeFileName === path) {
			activeFileName = openFiles[0];
			const model = models.getModel(activeFileName) || null;
			editorView.setModel(model);
		}
	}

	function renameFile(oldPath: string) {
		const newPath = prompt('Rename file path to:');
		if (newPath === null) return;

		const normalisedPath = normaliseFilePath(newPath);

		const validatedNewPath = validateFilePath(normalisedPath);
		if (!validatedNewPath) return;

		try {
			models.updateModelPath(oldPath, validatedNewPath);
		} catch (e) {
			if (e instanceof Error) {
				alert(e.message);
			}
		}

		fileStorage.renameFile(oldPath, validatedNewPath);
		openFiles = replaceOne(openFiles, oldPath, validatedNewPath);

		// If the current open file is the renamed file, open the renamed file instead
		if (activeFileName == oldPath) {
			activeFileName = validatedNewPath;
			editorView.setModel(models.getModel(validatedNewPath) || null);
		}
	}

	function saveAll() {
		const code = models.getAllCode();
		fileStorage.saveAll(code);
		alert(`Saved ${Object.keys(code).length} files.`);
	}

	onMount(() => {
		editorView = new EditorView(editorContainer!);
		const code = loadCode();

		for (const file of code.files) {
			models.upsertModel(file.filePath, 'cinnamon', file.content);
		}

		editorView.setModel(models.getModel(code.activeFile)!);
		openFiles = code.files.map((f) => f.filePath);
		activeFileName = code.activeFile;
	});

	onDestroy(() => {
		models.dispose();
		editorView.dispose();
	});
</script>

<div class="ide">
	<div class="left-panel">
		<FileList
			{activeFileName}
			{openFiles}
			{openFile}
			{newFile}
			{saveAll}
			{deleteFile}
			{renameFile}
		/>
	</div>
	<div class="main-panel">
		<div bind:this={editorContainer} class="editor"></div>
	</div>
	<div class="right-panel">
		<Console {consoleIOAdapter} {run} />
	</div>
</div>

<style>
	.ide {
		height: calc(100vh - 80px);
		width: 100%;
		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr 3.5fr 1.5fr;
	}

	.left-panel {
		height: 100%;
		width: 100%;
		overflow: auto;
		border-right: 1px solid lightgray;
	}

	.main-panel {
		height: 100%;
		width: 100%;
		overflow: hidden;
		border-right: 1px solid lightgray;
	}

	.right-panel {
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.editor {
		height: calc(100% - 40px);
		width: 100%;
		padding: 10px 0;
	}
</style>
