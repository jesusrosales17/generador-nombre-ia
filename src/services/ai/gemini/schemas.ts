import { SchemaType } from "@google/generative-ai";

export const GENERATED_NAMES_SCHEMA = {
    description: "List of generated names for a company or product",
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        name: {
          type: SchemaType.STRING,
          description: "Generated name for the company or product",
          nullable: false,
        },
        description: {
          type: SchemaType.STRING,
          description: "Explanation of why this name is suitable",
          nullable: false,
        },
      },
      required: ["name", "description"],
    },
  };
  