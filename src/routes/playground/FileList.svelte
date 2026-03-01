<script>
	import DirectoryDisplay from './DirectoryDisplay.svelte';
	import buildFileTree from '$lib/utils/buildFileTree';

	const props = $props();
	const tree = $derived(buildFileTree(props.openFiles));
</script>

<div class="files">
	<div class="files-header">
		<span>Files</span>
		<div class="actions">
			<button onclick={props.newFile}>New</button>
			<button onclick={props.saveAll}>Save</button>
		</div>
	</div>
	<DirectoryDisplay
		directoryContents={tree}
		activeFileName={props.activeFileName}
		openFile={props.openFile}
		renameFile={props.renameFile}
		deleteFile={props.deleteFile}
	/>
</div>

<style>
	.files {
		padding: 10px;
	}

	.files-header {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #ededed;
		padding-bottom: 5px;
		margin-bottom: 10px;
	}

	button {
		border: none;
		background-color: inherit;
		cursor: pointer;
		color: #6e6e6e;
	}
</style>
