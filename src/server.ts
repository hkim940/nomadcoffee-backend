import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import schema from "./schema";
import{ getUser } from '../users/users.utils';

interface MyContext { 
  token?: String
}

const server = new ApolloServer<MyContext>({ schema });
const PORT:number = Number(process.env.PORT);

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
  context: async ({ req }) => {
    return {
      loggedInUser : await getUser(req.headers.authorization)
    }
  }
})

console.log(`🚀 Server ready at ${url}`)