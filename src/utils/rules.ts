// IMPORTANT!
// This file has been automatically generated,
// in order to update its content execute "npm run update"
import type { RuleModule } from "../types";
import blockMappingColonIndicatorNewline from "../rules/block-mapping-colon-indicator-newline";
import blockMappingQuestionIndicatorNewline from "../rules/block-mapping-question-indicator-newline";
import blockMapping from "../rules/block-mapping";
import blockSequenceHyphenIndicatorNewline from "../rules/block-sequence-hyphen-indicator-newline";
import blockSequence from "../rules/block-sequence";
import fileExtension from "../rules/file-extension";
import flowMappingCurlyNewline from "../rules/flow-mapping-curly-newline";
import flowMappingCurlySpacing from "../rules/flow-mapping-curly-spacing";
import flowSequenceBracketNewline from "../rules/flow-sequence-bracket-newline";
import flowSequenceBracketSpacing from "../rules/flow-sequence-bracket-spacing";
import indent from "../rules/indent";
import keyNameCasing from "../rules/key-name-casing";
import keySpacing from "../rules/key-spacing";
import noEmptyDocument from "../rules/no-empty-document";
import noEmptyKey from "../rules/no-empty-key";
import noEmptyMappingValue from "../rules/no-empty-mapping-value";
import noEmptySequenceEntry from "../rules/no-empty-sequence-entry";
import noIrregularWhitespace from "../rules/no-irregular-whitespace";
import noMultipleEmptyLines from "../rules/no-multiple-empty-lines";
import noTabIndent from "../rules/no-tab-indent";
import noTrailingZeros from "../rules/no-trailing-zeros";
import plainScalar from "../rules/plain-scalar";
import quotes from "../rules/quotes";
import requireStringKey from "../rules/require-string-key";
import sortKeys from "../rules/sort-keys";
import sortSequenceValues from "../rules/sort-sequence-values";
import spacedComment from "../rules/spaced-comment";
import vueCustomBlockNoParsingError from "../rules/vue-custom-block/no-parsing-error";

export const rules = [
  blockMappingColonIndicatorNewline,
  blockMappingQuestionIndicatorNewline,
  blockMapping,
  blockSequenceHyphenIndicatorNewline,
  blockSequence,
  fileExtension,
  flowMappingCurlyNewline,
  flowMappingCurlySpacing,
  flowSequenceBracketNewline,
  flowSequenceBracketSpacing,
  indent,
  keyNameCasing,
  keySpacing,
  noEmptyDocument,
  noEmptyKey,
  noEmptyMappingValue,
  noEmptySequenceEntry,
  noIrregularWhitespace,
  noMultipleEmptyLines,
  noTabIndent,
  noTrailingZeros,
  plainScalar,
  quotes,
  requireStringKey,
  sortKeys,
  sortSequenceValues,
  spacedComment,
  vueCustomBlockNoParsingError,
] as RuleModule[];
