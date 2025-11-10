import XCTest
import SwiftTreeSitter
import TreeSitterTomefile

final class TreeSitterTomefileTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_tomefile())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Tomefile grammar")
    }
}
