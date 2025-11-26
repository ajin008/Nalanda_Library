import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema.js";
import { root } from "./resolvers.js";

export function graphqlServer() {
  return graphqlHTTP((req, res) => ({
    schema,
    rootValue: root,
    graphiql: true,
    context: { req, res },
  }));
}
