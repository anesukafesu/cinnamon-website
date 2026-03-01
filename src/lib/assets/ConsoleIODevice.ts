import type { ConsoleIOAdapter } from '$lib/IOAdapter.svelte';

interface IOOp {
	type: 'input' | 'output';
	value: number;
}

type IOOperationEventListener = (ops: IOOp) => void;

export class ConsoleIODevice {
	private readonly adapter: ConsoleAdapter;

	constructor(adapter: ConsoleAdapter) {
		this.adapter = adapter;
	}

	async scanInt() {
		if (this.requestedInput) {
			throw new Error('The console is currently waiting for input.');
		}

		this.requestedInput = true;

		return new Promise((resolve) => {
			this.inputPromiseResolver = resolve;
		});
	}

	async printInt(int: number) {
		this.ioOperations.push({ type: 'output', value: int });
		this.notifyListeners(this.opUpdateEventListeners, this.ioOperations);
	}

	async printError(error: string) {
		alert(error);
	}
}

export class ConsoleAdapter {
	private inputPromiseResolver: ((input: number) => void) | undefined;
	private readonly ioEventListeners: IOOperationEventListener[];
	private readonly requestedInputChangeEvent;
	public requestedInput: boolean;

	constructor() {
		this.requestedInput = false;
		this.ioEventListeners = [];
	}

	addIoEventListener(fn: IOOperationEventListener) {
		this.ioEventListeners.push(fn);
	}

	notifyListeners<T>(listeners: ((data: T) => void)[], data: T) {
		for (const listener of listeners) {
			listener(data);
		}
	}

	requestIntInput() {
		if (this.requestedInput) {
			throw new Error('The console is currently waiting for input.');
		}

		this.requestedInput = true;
		return new Promise((resolve) => {
			this.inputPromiseResolver = resolve;
		});
	}

	onInput(input: number) {
		if (this.inputPromiseResolver) {
			this.requestedInput = false;
			this.inputPromiseResolver(input);
			this.notifyListeners(this.ioEventListeners, { type: 'input', value: input });
		}
	}

	output(output: number) {
		this.notifyListeners(this.ioEventListeners, { type: 'output', value: output });
	}
}
