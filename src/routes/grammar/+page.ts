export function load() {
	return {
		rules: [
			{
				ruleHtml: `program := &lt;function&gt;*`,
				explanationHtml: `A program is made up of zero or more functions.`
			},
			{
				ruleHtml: `function := <strong>function</strong> &lt;identifier&gt; <strong>(</strong> &lt;identifier&gt;* <strong>) do</strong> &lt;statement&gt;* <strong>end</strong>`,
				explanationHtml: `A function begins with the function keyword, an identifier as its name, open parenthesis, zero or more identifiers for its parameters, close parenthesis, the do keyword, zero or more statements, and an end keyword.`
			},
			{
				ruleHtml: `statement := &lt;declare-statement&gt; | &lt;input-statement&gt; | &lt;output-statement&gt;&gt; | &lt;set-statement&gt; | &lt;if-statement&gt; | &lt;while-statement&gt; | &lt;run-statement&gt; | &lt;return-statement&gt;`,
				explanationHtml:
					'A statement is either a declare, input, output, set, if, while, run or return statement.'
			},
			{
				ruleHtml: `declare-statement := <strong>declare</strong> &lt;identifier&gt;*<strong>;</strong>`,
				explanationHtml:
					"The declare statement (used to declare local variables) begins with the 'declare' keyword, followed by zero or more identifiers. Each identifier represents the name of a variable being declared."
			},
			{
				ruleHtml: `input-statement := <strong>input</strong> &lt;input-data-type&gt; &lt;identifier&gt;<strong>;</strong>`,
				explanationHtml: `The input statement (used to receive input from the program's user through the runtime's standard input) begins with the 'input' keyword, followed by an input data type, then an identifier where the user's input is to be stored.`
			},
			{
				ruleHtml:
					'output-statement := <strong>output</strong> &lt;output-data-type&gt; &lt;expression&gt;<strong>;</strong>',
				explanationHtml:
					"The output statement (used to display output using the runtime's standard output) begins with the 'output' keyword, followed by an output data type, then an expression whose value is to be displayed."
			},
			{
				ruleHtml:
					'set-statement := <strong>set</strong> &lt;identifier&gt; <strong>=</strong> &lt;expression&gt;<strong>;</strong>',
				explanationHtml:
					"The set statement (used to assign a value to a variable) begins with with the 'set' keyword, followed by an identifier that identifies the variable where the value is to be stored, then an expression whose value is to be stored in the variable."
			},
			{
				ruleHtml: `if-statement := <strong>if</strong> &lt;expression&gt; <strong>then</strong> &lt;statement&gt;* (<strong>else</strong> &lt;statement&gt;*)? <strong>end</strong>`,
				explanationHtml:
					"The if statement begins with the keyword 'if', followed by an expression, then the keyword 'then'. This is followed by zero or more statements. Optionally, one can add an else clause by writing the 'else' keyword, followed by zero or more statements. There can only be one else clause. The if statement is terminated by the 'end' keyword."
			},
			{
				ruleHtml: `while-statement := <strong>while</strong> &lt;expression&gt; <strong>do</strong> &lt;statement&gt;* <strong>end</strong>`,
				explanationHtml:
					"The while statement begins with the keyword 'while', followed by an expression, then the keyword do. This is followed by zero or more statements that form the body of the loop. Then you terminate the statement with the 'end' keyword."
			},
			{
				ruleHtml: `run-statement := <strong>run</strong> &lt;identifier&gt; <strong>(</strong> &lt;expression&gt;* <strong>);</strong>`,
				explanationHtml:
					"The run statement begins with the keyword 'run', followed by an identifier that represents the name of the function that is to be executed, then open parentheses, zero or more expressions as arguments to the function, then lastly, close parentheses and a semi-colon."
			},
			{
				ruleHtml: `return-statement := <strong>return</strong> &lt;expression&gt;;`,
				explanationHtml:
					'The return statement begins with the keyword return, followed by an expression and a semi-colon.'
			},
			{
				ruleHtml: `expression := &lt;unary-expression&gt; | &lt;binary-expression&gt; | &lt;literal-expression&gt; | &lt;symbol-expression&gt; | &lt;call-expression&gt;`,
				explanationHtml:
					'An expression is either a unary, binary, literal, symbol or call expression.'
			},
			{
				ruleHtml: `unary-expression := &lt;unary-operator&gt; &lt;expression&gt;`,
				explanationHtml:
					'A unary expression consists of a unary operator followed by an expression.'
			},
			{
				ruleHtml: `binary-expression := &lt;expression&gt; &lt;binary-operator&gt; &lt;expression&gt;`,
				explanationHtml:
					'A binary expression consists of an expression, a binary operator, and another expression.'
			},
			{
				ruleHtml: `literal-expression := [0-9]+`,
				explanationHtml: 'A literal expression is a sequence of one or more digits.'
			},
			{
				ruleHtml: `symbol-expression := &lt;identifier&gt;`,
				explanationHtml: 'A symbol expression is simply an identifier.'
			},
			{
				ruleHtml: `call-expression := &lt;identifier&gt; <strong>(</strong> &lt;expression&gt;* <strong>);</strong>`,
				explanationHtml:
					'A call expression consists of an identifier followed by open parenthesis, zero or more expressions as arguments to the function being called, then close parenthesis and a semi-colon.'
			},
			{
				ruleHtml: `identifier := [A-Za-z_][A-Za-z_0-9]*`,
				explanationHtml: `An identifier begins with a letter or underscore, followed by zero or more letters, digits and underscores.`
			},
			{
				ruleHtml: 'unary-operator := [ ! - ]',
				explanationHtml: 'A unary operator is either an exclamation mark or a minus sign.'
			},
			{
				ruleHtml: 'binary-operator := [ + - * / ^ % & | ]',
				explanationHtml:
					'A binary operator is one of the following symbols: plus, minus, multiplication, division, caret, percentage, ampersand or pipe.'
			}
		]
	};
}
