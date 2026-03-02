<script lang="ts">
	import '@fontsource/cardo';
	import '@fontsource/libertinus-keyboard';
	import '@fontsource-variable/jetbrains-mono';
	let { children } = $props();
</script>

<header>
	<nav>
		<a href="/" class="nav-link">Home</a>
		<ul>
			<li><a class="nav-link" href="/grammar">Grammar</a></li>
			<!-- <li><a class="nav-link" href="/tutorial">Tutorial</a></li> -->
			<li><a class="nav-link" href="/playground">Playground</a></li>
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>

<style>
	:global {
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}

		body {
			font-family: 'Cardo', serif;
		}

		.page-content-container {
			max-width: 800px;
			margin: auto;
			padding: 3rem 0;
		}

		h1 {
			font-family: 'Libertinus Keyboard', system-ui;
			font-size: 2.5rem;
		}

		p,
		a {
			line-height: 2rem;
			font-size: 1.1rem;
		}

		a {
			text-decoration: none;
			color: #a85555;
		}

		p {
			margin: 15px 0;
		}
	}

	ul {
		list-style-type: none;
		display: flex;
		gap: 10px;
	}

	.nav-link {
		color: black;
		font-weight: 700;
	}

	header {
		position: sticky;
		padding: 25px;
		top: 0;
		background-color: white;
		border-bottom: 1px solid #d8d8d8;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	nav {
		width: 100%;
		display: flex;
		justify-content: space-between;
		max-width: 1200px;
		align-items: center;
	}
</style>
