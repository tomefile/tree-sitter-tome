# Tree-sitter for Tomefile

Tomefile grammar for tree-sitter.

## Neovim installation

Using lazy:

```lua
return {
    "tomefile/tree-sitter-tome",
    config = function()
        local parser_config = require("nvim-treesitter.parsers").get_parser_configs()
        parser_config.tome = {
            install_info = {
                url = "https://github.com/tomefile/tree-sitter-tome",
                files = { "src/parser.c" },
                branch = "main",
                generate_requires_npm = false, -- stand-alone parser without npm dependencies
                requires_generate_from_grammar = false, -- folder contains pre-generated src/parser.c
                queries = "queries/tome",
            },
        }

        vim.filetype.add({
            extension = {
                tome = "tome",
            },
            filename = {
                ["Tomefile"] = "tome",
            },
        })
    end,
}
```

If needed, run: `:TSInstall tome`.
