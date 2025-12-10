(shebang) @attribute

(argument) @variable

(comment) @comment

(block) @punctuation

(string) @string

[
  (variable)
  (variable_expansion)
] @property

(variable_expansion
  (identifier) @variable)

(modifier) @tag

(command
  (filepath) @function)

(directive
  (identifier) @keyword)

(comparator) @keyword

(subcommand) @module

";" @comment
"!" @function.builtin
