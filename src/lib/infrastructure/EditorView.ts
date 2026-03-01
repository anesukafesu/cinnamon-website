import * as monaco from 'monaco-editor';

const editorConfig: monaco.editor.IStandaloneEditorConstructionOptions = {
	model: null,
	theme: 'vs-light',
	automaticLayout: true,
	minimap: { enabled: false },
	fontSize: 14,
	fontFamily: 'JetBrains Mono',
	scrollBeyondLastLine: false,
	fontLigatures: false,
	cursorBlinking: 'smooth',
	renderWhitespace: 'boundary',
	renderLineHighlight: 'none',
	quickSuggestions: false,
	wordBasedSuggestions: 'off',
	suggestOnTriggerCharacters: false,
	suggest: {
		showIcons: false,
		showStatusBar: false
	}
};

export default class EditorView {
	private readonly editor: monaco.editor.IStandaloneCodeEditor;

	constructor(container: HTMLDivElement) {
		this.editor = monaco.editor.create(container, editorConfig);
	}

	setModel(model: monaco.editor.ITextModel | null) {
		this.editor.setModel(model);
	}

	getModel() {
		this.editor.getModel();
	}

	dispose() {
		this.editor.dispose();
	}
}
