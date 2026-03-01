import * as monaco from 'monaco-editor';

export default class Models {
	private readonly models: Map<string, monaco.editor.ITextModel>;

	constructor() {
		this.models = new Map();
	}

	createUri(path: string) {
		return monaco.Uri.parse(`file:///${path}`);
	}

	upsertModel(path: string, language: string, content: string) {
		const uri = this.createUri(path);
		let model = this.models.get(path);

		if (!model) {
			model = monaco.editor.createModel(content, language, uri);
			this.models.set(path, model);
		} else {
			if (model.getLanguageId() !== language) {
				monaco.editor.setModelLanguage(model, language);
			}

			if (model.getValue() !== content) {
				model.setValue(content);
			}
		}

		return model;
	}

	getModel(path: string) {
		return this.models.get(path);
	}

	updateModelPath(oldPath: string, newPath: string) {
		const oldModel = this.models.get(oldPath);

		if (!oldModel) {
			throw new Error(`No model exists at ${oldPath}.`);
		}

		const existingModelAtNewPath = this.models.get(newPath);

		if (existingModelAtNewPath) {
			throw new Error(`Model already exists at ${existingModelAtNewPath}.`);
		}

		const newPathUri = this.createUri(newPath);
		const newModel = monaco.editor.createModel(
			oldModel.getValue(),
			oldModel.getLanguageId(),
			newPathUri
		);

		this.models.delete(oldPath);
		this.models.set(newPath, newModel);
		oldModel.dispose();
	}

	deleteModel(path: string) {
		const model = this.models.get(path);

		if (!model) return;

		this.models.delete(path);
		model.dispose();
	}

	getAllCode() {
		const code: Record<string, string> = {};

		for (const [path, model] of this.models.entries()) {
			code[path] = model.getValue();
		}

		return code;
	}

	dispose() {
		for (const model of this.models.values()) {
			model.dispose();
		}

		this.models.clear();
	}
}
