import process from 'node:process';
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import * as path from 'node:path'

const server = http.createServer();

server.listen(3001);

server.on('request', async (req, res)=> {
  const {url = ''} = req;
    if (url === '/web/healthcheck'){
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'Web server is healthy'}))
    } else {
      const filePath = path.resolve(path.join('build', url === '/employees' ? 'index.html' : url))
      const fileContent = await readFile(filePath, 'utf-8');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(fileContent);
    }
  }
);

server.on('error', (error)=> {
  console.error('ERROR: ', error)
})

server.on('listening', () => {
  console.log(`Server started. Visit localhost:3001/`);
})

process.on('uncaughtException', (exception) => {
  console.error('Uncaught exception: ', exception)
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection -> ', reason, promise)
});