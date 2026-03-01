<script>
</script>

<div class="page-content-container">
	<h1>Tutorial</h1>
	<h2>The Disclaimer</h2>
	<p>
		First -Cinnamon is a toy programming language. I built it as a
		learning experience into how code gets executed. I wasn't aiming for efficiency, speed or
		developer-friendliness. So, to set expectations straight, Cinnamon is probably going to be less
		powerful, slower, and more frustrating than any language you have ever worked with. If you are
		still interested in trying it out, here's my tutorial, but, I am going to assume you know
		programming in at least one high-level programming language. If not, this is a horrible first
		language to learn.
	</p>
	<h2>Hello, World (or is it?)</h2>
	<p>
		In line with programming tradition, I'll begin by writing for you a simple Hello World program
		to introduce the basic syntax of Cinnamon. But at this point, we run into the first gotcha of
		Cinnamon. We cannot print out "Hello, World" because Cinnamon does not yet support strings. For
		now, integers are the only data type we can work with. So instead, I'll write a program to print
		out a very popular integer, 42. Here's the program:
	</p>
	<pre>
    function main() do
      output int 42;
    end</pre>
	<p>
		Though small, this example demonstrates a few key features of the language. First, Cinnamon
		supports functions (and they behave in the same way as functions in other high-level programming
		languages). Second, the entry point of a program is the main function-which takes no arguments
		when called. Lastly, to print things out, we write the <code
			>output &lt;data-type&gt; &lt;value&gt;</code
		>
		statement. As a bonus, functions bodies are terminated by the <code>end</code> keyword, and statements
		in the body (some of them as we will soon learn) are terminated by a semi-colon.
	</p>
	<div id="programs">
		<h2>Programs</h2>
		<p>
			A program in Cinnamon is made up of one or more <a href="#functions">functions</a>. At least
			one function must be named <code>main</code>. This <code>main</code> function serves as the entry
			point for the program since it will be called by the executor first when execution begins.
      This function will be called with no arguments.
		</p>
	</div>
	<h2>Functions</h2>
	<p>
		Like every other programming language, a function in Cinnamon is a block of code that groups
		multiple, related statements under one identifier. In Cinnamon, all <a href="#statements"
			>statements</a
		>
		are written inside functions. A function is created by writing the <code>function</code>
		keyword, followed by an <a href="#identifiers">identifier</a> that becomes the function's name,
		parentheses to enclose parameters, the <code>do</code> keyword, the function's body, then
		lastly, the <code>end</code> keyword. Functions, can, but do not need to, return values. Unlike other
		languages you might have encountered, a function's parameters are not separated by commas when listing
		them out.
	</p>
	<pre>
    function sum_of_squares (a b) do
      return a ^ 2 + b ^ 2;
    end</pre>
	<h2>Data Types</h2>
	<p>
		As I have mentioned in the previous sections, there is only one data type available in the
		language, integer. All literals, inputs, outputs and variables operate exclusively with this
		data type. Of course, I plan on adding more soon, starting with booleans and chars, then
		eventually strings, arrays and records. But for now, we are going to have to make do with
		integers.
	</p>
</div>

<style>
	h2 {
		margin: 30px 0;
	}

	pre {
		font-family: 'Jet Brains Mono', monospace;
		font-size: 16px;
		line-height: 1.6rem;
		background-color: #efefef;
		padding: 20px 10px;
		border-radius: 10px;
		margin: 20px 0;
	}
</style>
