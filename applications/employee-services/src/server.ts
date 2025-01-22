import process from 'node:process';
import http2 from 'node:http';
import app from './app.ts';


// TODO: check for secureServer
const server = http2.createServer(app);

server.listen(8098);

server.on('error', (error)=> {
  console.error('ERROR: ', error)
})

server.on('listening', () => {
  console.log(`Server started. Visit localhost:8098/`);
})

process.on('uncaughtException', (exception) => {
  console.error('Uncaught exception: ', exception)
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection -> ', reason, promise)
});