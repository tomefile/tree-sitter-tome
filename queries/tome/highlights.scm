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
  (identifier) @function)

(directive
  (identifier) @keyword)

(comparator) @keyword

(subcommand) @module

";" @comment
"!" @function.builtin
