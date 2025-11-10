/**
 * @file Command language created for more elegant and intuitive automation. Spiritual successor to Makefiles
 * @author BubbleFish <daforsastudia@gmail.com>
 * @license ISC
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "tomefile",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
