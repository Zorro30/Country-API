const countriesPopulationSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  type: "object",
  title: "Country serailizer",
  description: "This schema allows to validate the input for the /countries/population API",
  default: {},
  examples: [
    {
      country: ["India"],
      sort: "asc",
      sort_on: "population",
    },
  ],
  required: ["country"],
  properties: {
    country: {
      $id: "#/properties/country",
      type: "array",
      minItems: 1,
      maxItems: 50,
      uniqueItems: true,
      title: "Country schema",
      description: "The country for which you want to know the population",
      default: [],
      examples: ["India"],
      // "additionalItems": true,
      items: {
        $id: "#/properties/country/items",
        anyOf: [
          {
            $id: "#/properties/country/items/anyOf/0",
            type: "string",
            default: "",
            examples: ["India"],
          },
        ],
      },
    },
    sort: {
      $id: "#/properties/sort",
      type: "string",
      enum: ["asc", "desc"],
      title: "The sort schema",
      description: "The param provides the functionality to sort the result.",
      default: "asc",
      examples: ["asc"],
    },
    sort_on: {
      $id: "#/properties/sort_on",
      type: "string",
      enum: ["country", "population"],
      title: "The sort_on schema",
      description: "The param provides the functionality to sort on a particular key",
      default: "name",
      examples: ["population"],
    },
  },
  additionalProperties: true,
};

exports.countriesPopulationSchema = countriesPopulationSchema;
