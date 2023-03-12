import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';

import { typeDefs, resolvers } from './schema';
import{ getUser } from '../users/users.utils';
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";

interface MyContext { 
  token?: String
}

const PORT:number = Number(process.env.PORT);
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<MyContext>({ 
  typeDefs, 
  resolvers,
  csrfPrevention: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })] 
});

await server.start();

app.use("/static", express.static("uploads"));
app.use(
  '/graphql',
  logger('tiny'),
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  graphqlUploadExpress(),
  expressMiddleware(server, {
    context: async({ req, res }) => ({
      loggedInUser : await getUser(req.headers.authorization)
    })
  })
)

await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}`)

// ApolloServerPluginDrainHttpServer -> designed to use with expressMiddleware
// to ensure that server shut down properly (when using standAlonServer this is already handled automatically)

/**
 *  ApolloserverPluginDraingHttpServer:
 *  It is used to ensure that server shuts down properly when suing expressMiddleware
 * 
 *  expressMiddleware:
 *  attaches Apollo Server to Express Server. Need to setup body-parsing, CORS
 * 
 */
