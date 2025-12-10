/**
 * @file Command language created for more elegant and intuitive automation. Spiritual successor to Makefiles
 * @author BubbleFish <daforsastudia@gmail.com>
 * @license ISC
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
	name: "tome",

	extras: ($) => [$._tab, $.comment],

	rules: {
		source_file: ($) =>
			seq(
				// Added in case the file begins with ';', which would cause everything else to error
				repeat(";"),
				optional($.shebang),
				repeat($._statement)
			),

		shebang: (_) => token(seq(/#!.*/, token.immediate("\n"))),

		comment: (_) => token(seq("#", /[^\n]*/, token.immediate("\n"))),

		block: ($) => seq("{", repeat($._statement), "}"),

		_tab: (_) => token(choice(" ", "\t")),

		_statement: ($) =>
			seq(
				choice("\n", $.directive, $.command, seq($.pipe, $.command)),
				repeat(";")
			),

		directive: ($) =>
			prec.right(
				seq(":", $.identifier, repeat($.argument), optional($.block))
			),

		command: ($) =>
			prec.right(
				seq(
					$.filepath,
					repeat(
						choice($.filepath, $.variable_expansion, $.variable)
					),
					optional("!"),
					" ",
					repeat(seq(optional("\\\n"), $.argument))
				)
			),

		subcommand: ($) => seq("$(", $.command, ")"),

		argument: ($) =>
			choice(
				$.subcommand,
				$.string,
				$.filepath,
				prec(2, $.comparator),
				$.identifier,
				$.variable,
				$.variable_expansion,
				prec(1, $.redirect)
			),

		string: ($) =>
			choice(
				seq(
					'"',
					repeat(
						choice(
							/[^"]/,
							$.variable,
							$.variable_expansion,
							$.subcommand
						)
					),
					'"'
				),
				seq(
					"'",
					repeat(
						choice(
							/[^']/,
							$.variable,
							$.variable_expansion,
							$.subcommand
						)
					),
					"'"
				),
				seq("`", repeat(choice(/[^`\\]/, /\\./)), "`")
			),

		identifier: (_) => /[\w\d\-\_@\?\.]+/,

		filepath: (_) => /[\w\d\-\_@\?\.\~/\*]+/,

		variable: (_) => token(seq("$", token.immediate(/[\w\d\-\_]+/))),
		modifier: () => token.immediate(/[^\n}\:]+/),

		variable_expansion: ($) =>
			seq(
				"${",
				$.identifier,
				repeat(seq(token.immediate(":"), $.modifier)),
				token.immediate("}")
			),

		comparator: (_) => choice("==", ">=", "<=", "<", ">", "=", "AND", "OR"),

		pipe: (_) => token("|"),

		redirect: (_) => token(choice("<", ">", "<<")),
	},
});
