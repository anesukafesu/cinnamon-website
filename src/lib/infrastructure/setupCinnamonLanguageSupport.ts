import * as monaco from 'monaco-editor';

export default function setupCinnamonLanguageSupport() {
	const language = 'cinnamon';

	monaco.languages.register({
		id: language
	});

	monaco.languages.setMonarchTokensProvider(language, {
		tokenizer: {
			root: [
				// keywords
				[
					/\b(function|do|end|if|then|else|while|declare|return|run|input|output|set|int)\b/,
					'keyword'
				],

				// identifiers
				[/[a-zA-Z_][a-zA-Z0-9_]*/, 'identifier'],

				// numbers
				[/\d+/, 'number'],

				// operators
				[/[+\-*/%^=<>!&|]+/, 'operator'],

				// parentheses
				[/[()]/, 'delimiter'],

				// whitespace
				[/[ \t\r\n]+/, 'white']
			]
		}
	});
}
