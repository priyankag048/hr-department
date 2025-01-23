import process from 'node:process';
import http from 'node:http';
import app from './app.ts';

const server = http.createServer(app);

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