<script>
	import DirectoryDisplay from './DirectoryDisplay.svelte';
	const props = $props();
</script>

{#each Object.entries(props.directoryContents) as [k, v]}
	{#if typeof v == 'object'}
		<div class="directory">
			<span class="directory-name">└─{k}</span>
			<div class="directory-contents">
				<DirectoryDisplay {...props} directoryContents={v} />
			</div>
		</div>
	{:else}
		<div class={['file', { active: props.activeFileName === v }]}>
			<button
				onclick={() => props.openFile(v)}
				class="file-label"
				ondblclick={() => props.renameFile(v)}
			>
				—{k}
			</button>
			{#if props.activeFileName === v}
				<button class="file-delete" onclick={() => props.deleteFile(v)}>Del</button>
			{/if}
		</div>
	{/if}
{/each}

<style>
	* {
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
	}

	.directory {
		margin: 10px 0;
	}

	.directory-contents {
		padding-left: 20px;
	}

	.file {
		display: flex;
	}

	.file-label {
		flex: 1 1 0;
	}

	.file-delete {
		flex: 0 0 auto;
	}

	button {
		cursor: pointer;
		background: inherit;
		border: none;
		text-align: left;
	}

	.active {
		background-color: #b7d0ff !important;
		border: 1px solid #a2c2ff !important;
		border-radius: 5px;
	}
</style>
