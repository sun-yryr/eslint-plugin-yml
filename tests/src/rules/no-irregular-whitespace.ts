import { RuleTester } from "eslint";
import rule from "../../../src/rules/no-irregular-whitespace";
import { loadTestCases } from "../../utils/utils";

const tester = new RuleTester({
  parser: require.resolve("yaml-eslint-parser"),
  parserOptions: {
    ecmaVersion: 2020,
  },
});

tester.run(
  "no-irregular-whitespace",
  rule as any,
  loadTestCases("no-irregular-whitespace"),
);
