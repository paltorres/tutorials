import {
  // These are the basic GraphQL types
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLEnumType,

  // This is used to create required fields and arguments
  GraphQLNonNull,

  // This is the class we need to create the schema
  GraphQLSchema,

  // This function is used execute GraphQL queries
  graphql
} from 'graphql';

const Query = new GraphQLObjectType({
  name: 'RootQueries',
  fields: () => ({
    echo: {
      type: GraphQLString,
      args: {
        message: {type: new GraphQLNonNull(GraphQLString), description: 'The message to echo.'}
      },
      resolve(rootValue, args) {
        return `received: ${args.message}`;
      }
    }
  })
});

const Schema = new GraphQLSchema({
  query: Query
});

let query = `
  {
    receivedMessage: echo(message: "Hello")
  }
`;

graphql(Schema, query).then(function(result) {
  console.log(result);
});

let query2 = `
  query getEcho($inputMessage: String!) {
    receivedMessage: echo(message: $inputMessage)
  }
`;

graphql(Schema, query2, null, null, {inputMessage: 'Hello!'}).then(function(result) {
  console.log(result);
});
