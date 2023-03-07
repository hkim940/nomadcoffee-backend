import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import schema from "./schema";

interface MyContext { 
  token?: String
}

const server = new ApolloServer<MyContext>({ schema });
const PORT:number = Number(process.env.PORT);

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT }
})

console.log(`🚀 Server ready at ${url}`)