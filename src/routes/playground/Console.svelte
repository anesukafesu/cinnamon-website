<script lang="ts">
	let { consoleIOAdapter, run } = $props();

	let value = $state('');

	function handleSubmit(e: Event) {
		e.preventDefault();

		// Not expecting input
		if (!consoleIOAdapter.requestedInput) {
			value = '';
			return;
		}

		const num = Number(value);

		// Invalid integer
		if (!Number.isInteger(num)) {
			value = '';
			return;
		}

		consoleIOAdapter.onIntInput(num);
		value = '';
	}

	function clear() {
		consoleIOAdapter.clearOperations();
	}
</script>

<div class="console">
	<div class="console-header">
		<button class="run" onclick={run}>Run</button>
		<button class="clear" onclick={clear}>Clear Console</button>
	</div>
	<div class="history">
		{#each consoleIOAdapter.ioOperations as op}
			<div class="line">
				<span class="prompt">
					<strong>
						{#if op.type === 'input'}
							&lt;
						{:else if op.type === 'output'}
							&gt;
						{:else}
							!
						{/if}
					</strong>
				</span>
				<span class="value">{op.value}</span>
			</div>
		{/each}
		{#if consoleIOAdapter.requestedInput}
			<div class="line input">
				<form onsubmit={handleSubmit}>
					<span class="prompt">{'<'}</span>
					<input type="text" bind:value />
				</form>
			</div>
		{/if}
	</div>
</div>

<style>
	* {
		box-sizing: border-box;
	}

	.console {
		height: 100%;
		padding: 12px;
		min-height: 0;
		display: flex;
		flex-direction: column;
		background: white;
		color: gray;
	}

	.console-header {
		display: flex;
		align-items: center;
	}

	.history {
		flex: 1;
		overflow-y: auto;
		min-height: 0;
		padding: 12px 0;
		font-family: 'JetBrains Mono', monospace;
	}

	button {
		padding: 5px 10px;
		border: none;
		border-radius: 5px;
		font-weight: 500;
		margin: 0 5px;
	}

	.run {
		background-color: darkslategray;
		color: white;
	}

	.line {
		display: flex;
		gap: 8px;
		line-height: 1.4;
		white-space: pre-wrap;
	}

	.prompt {
		width: 1ch;
	}

	input {
		border: none;
		border-bottom: 2px solid lightgray;
		outline: none;
		color: gray;
		font-size: 16px;
	}
</style>
