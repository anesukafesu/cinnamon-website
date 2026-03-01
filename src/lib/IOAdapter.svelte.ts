type IOOp = { type: 'input' | 'output'; value: number } | { type: 'error'; value: string };

export default class ConsoleIOAdapter {
	private _requestedInput: boolean;
	private _ioOperations: IOOp[];
	private _inputResolver: ((value: number) => void) | undefined;

	constructor() {
		this._requestedInput = $state(false);
		this._ioOperations = $state<IOOp[]>([]);
	}

	get requestedInput() {
		return this._requestedInput;
	}

	get ioOperations() {
		return this._ioOperations;
	}

	requestIntInput(): Promise<number> {
		if (this._requestedInput) {
			throw new Error('Console is currently busy.');
		}

		this._requestedInput = true;

		return new Promise((resolve) => {
			this._inputResolver = resolve;
		});
	}

	onIntInput(value: number) {
		if (!this._inputResolver) {
			return;
		}

		this._ioOperations.push({ type: 'input', value: value });
		this._inputResolver(value);
		this._inputResolver = undefined;
		this._requestedInput = false;
	}

	clearOperations() {
		this._ioOperations = [];
	}

	outputInt(value: number) {
		this._ioOperations.push({ type: 'output', value: value });
	}

	printError(errorMessage: string) {
		this._ioOperations.push({ type: 'error', value: errorMessage });
	}
}
