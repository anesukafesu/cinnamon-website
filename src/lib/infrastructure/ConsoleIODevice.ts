import type ConsoleIOAdapter from '$lib/IOAdapter.svelte';

export default class ConsoleIODevice {
	constructor(private readonly ioAdapter: ConsoleIOAdapter) {}

	scanInt(): Promise<number> {
		return this.ioAdapter.requestIntInput();
	}

	async printInt(value: number): Promise<void> {
		this.ioAdapter.outputInt(value);
	}

	async printError(message: string): Promise<void> {
		this.ioAdapter.printError(message);
	}
}
