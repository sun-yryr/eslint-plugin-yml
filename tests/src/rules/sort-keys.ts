import fs from "fs";
import { RuleTester } from "eslint";
import rule from "../../../src/rules/sort-keys";
import { loadTestCases } from "../../utils/utils";

const tester = new RuleTester({
  parser: require.resolve("yaml-eslint-parser"),
  parserOptions: {
    ecmaVersion: 2020,
  },
});

const OPTIONS_FOR_PACKAGE_JSON = [
  {
    pathPattern: "^$",
    order: [
      "name",
      "version",
      "dependencies",
      "peerDependencies",
      "devDependencies",
      "optionalDependencies",
      "bundledDependencies",
    ],
  },
  {
    pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies$",
    order: {
      type: "asc",
    },
  },
  {
    pathPattern: "^eslintConfig$",
    order: ["root", "plugins", "extends"],
  },
];

const OPTIONS_FOR_JSON_SCHEMA = [
  {
    pathPattern: ".*",
    hasProperties: ["type"],
    order: [
      "type",
      "properties",
      "items",
      "required",
      "minItems",
      "additionalProperties",
      "additionalItems",
    ],
  },
];

tester.run(
  "sort-keys",
  rule as any,
  loadTestCases(
    "sort-keys",
    {},
    {
      valid: [
        // package.json
        {
          code: fs.readFileSync(
            require.resolve("../../../package.json"),
            "utf-8",
          ),
          options: OPTIONS_FOR_PACKAGE_JSON,
        },

        // JSON Schema
        {
          code: JSON.stringify(rule.meta.schema),
          options: OPTIONS_FOR_JSON_SCHEMA,
        },

        // nest
        {
          code: `
                    {
                        "a":1,
                        "b":2,
                        "c":3,
                        "d":4,
                        "e":5,
                        "f":6,
                        "g":7,
                        "z":26
                    }
                    `,
          options: [
            {
              pathPattern: "^$",
              order: [
                "a",
                "b",
                {
                  keyPattern: "[cd]",
                  order: { type: "asc" },
                },
                {
                  keyPattern: "[e-g]",
                  order: { type: "asc" },
                },
                "z",
              ],
            },
          ],
        },
        {
          code: `
                    {
                        "a":1,
                        "b":2,
                        "c":3,
                        "d":4,
                        "e":5,
                        "f":6,
                        "g":7,
                        "z":26
                    }
                    `,
          options: [
            {
              pathPattern: "^$",
              order: [
                "a",
                "b",
                {
                  order: { type: "asc" },
                },
                "z",
              ],
            },
          ],
        },
      ],
      invalid: [
        // package.json
        {
          code: `
                    {
                        "version": "0.0.0",
                        "name": "test",
                        "eslintConfig": {
                            "root": true,
                            "extends": [],
                            "plugins": [],
                        },
                        "dependencies": {
                            "b": "0.0.1",
                            "a": "0.0.1"
                        }
                    }`,
          output: `
                    {
                        "name": "test",
                        "version": "0.0.0",
                        "eslintConfig": {
                            "root": true,
                            "plugins": [],
                            "extends": [],
                        },
                        "dependencies": {
                            "a": "0.0.1",
                            "b": "0.0.1"
                        }
                    }`,
          options: OPTIONS_FOR_PACKAGE_JSON,
          errors: [
            "Expected mapping keys to be in specified order. 'name' should be before 'version'.",
            "Expected mapping keys to be in specified order. 'plugins' should be before 'extends'.",
            "Expected mapping keys to be in ascending order. 'a' should be before 'b'.",
          ],
        },

        // JSON Schema
        {
          code: `
                    {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            "foo": {
                                "minItems": 2,
                                "type": "array"
                            }
                        }
                    }`,
          output: `
                    {
                        "type": "object",
                        "properties": {
                            "foo": {
                                "minItems": 2,
                                "type": "array"
                            }
                        },
                        "additionalProperties": false
                    }`,
          options: OPTIONS_FOR_JSON_SCHEMA,
          errors: [
            "Expected mapping keys to be in specified order. 'properties' should be before 'additionalProperties'.",
            "Expected mapping keys to be in specified order. 'type' should be before 'minItems'.",
          ],
        },
        {
          code: `
                    {
                        "type": "object",
                        "properties": {
                            "foo": {
                                "minItems": 2,
                                "type": "array"
                            }
                        },
                        "additionalProperties": false
                    }`,
          output: `
                    {
                        "type": "object",
                        "properties": {
                            "foo": {
                                "type": "array",
                                "minItems": 2
                            }
                        },
                        "additionalProperties": false
                    }`,
          options: OPTIONS_FOR_JSON_SCHEMA,
          errors: [
            "Expected mapping keys to be in specified order. 'type' should be before 'minItems'.",
          ],
        },

        // Other
        {
          code: `
                    {
                        "\t": {
                            "b": 42,
                            "a": 42,
                        },
                        "arr": [
                            {
                                "d": 42,
                                "c": 42,
                            },
                            {
                                "f": 42,
                                "e": 42,
                            },
                        ]
                    }`,
          output: `
                    {
                        "\t": {
                            "a": 42,
                            "b": 42,
                        },
                        "arr": [
                            {
                                "d": 42,
                                "c": 42,
                            },
                            {
                                "e": 42,
                                "f": 42,
                            },
                        ]
                    }`,
          options: [
            {
              pathPattern: '^\\["\\\\t"\\]$',
              order: { type: "asc" },
            },
            {
              pathPattern: "^arr\\[1\\]$",
              order: { type: "asc" },
            },
          ],
          errors: [
            "Expected mapping keys to be in ascending order. 'a' should be before 'b'.",
            "Expected mapping keys to be in ascending order. 'e' should be before 'f'.",
          ],
        },

        // nest
        {
          code: `
                    {
                        "a":1,
                        "b":2,
                        "d":4,
                        "c":3,
                        "e":5,
                        "g":7,
                        "f":6,
                        "z":26
                    }
                    `,
          output: `
                    {
                        "a":1,
                        "b":2,
                        "c":3,
                        "d":4,
                        "e":5,
                        "f":6,
                        "g":7,
                        "z":26
                    }
                    `,
          options: [
            {
              pathPattern: "^$",
              order: [
                "a",
                "b",
                {
                  keyPattern: "[cd]",
                  order: { type: "asc" },
                },
                {
                  keyPattern: "[e-g]",
                  order: { type: "asc" },
                },
                "z",
              ],
            },
          ],
          errors: [
            "Expected mapping keys to be in specified order. 'c' should be before 'd'.",
            "Expected mapping keys to be in specified order. 'f' should be before 'g'.",
          ],
        },
        {
          code: `
                    {
                        "a":1,
                        "b":2,
                        "z":26,
                        "c":3,
                        "d":4,
                        "e":5,
                        "f":6,
                        "g":7
                    }
                    `,
          output: `
                    {
                        "a":1,
                        "b":2,
                        "c":3,
                        "z":26,
                        "d":4,
                        "e":5,
                        "f":6,
                        "g":7
                    }
                    `,
          options: [
            {
              pathPattern: "^$",
              order: [
                "a",
                "b",
                {
                  keyPattern: "[cd]",
                  order: { type: "asc" },
                },
                {
                  keyPattern: "[e-g]",
                  order: { type: "asc" },
                },
                "z",
              ],
            },
          ],
          errors: [
            "Expected mapping keys to be in specified order. 'c' should be before 'z'.",
          ],
        },
        {
          code: `
                    {
                        "a":1,
                        "b":2,
                        "c":3,
                        "d":4,
                        "z":26,
                        "e":5,
                        "f":6,
                        "g":7
                    }
                    `,
          output: `
                    {
                        "a":1,
                        "b":2,
                        "c":3,
                        "d":4,
                        "e":5,
                        "z":26,
                        "f":6,
                        "g":7
                    }
                    `,
          options: [
            {
              pathPattern: "^$",
              order: [
                "a",
                "b",
                {
                  keyPattern: "[cd]",
                  order: { type: "asc" },
                },
                {
                  keyPattern: "[e-g]",
                  order: { type: "asc" },
                },
                "z",
              ],
            },
          ],
          errors: [
            "Expected mapping keys to be in specified order. 'e' should be before 'z'.",
          ],
        },
      ],
    },
  ),
);
