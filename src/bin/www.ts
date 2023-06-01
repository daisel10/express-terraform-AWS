import http from 'http'
import app from '../index'
import configEnv from '../config';

/**
 * Get port from environment and store in Express.
 */

const PORT = normalizePort(configEnv.api.port)
app.set('port', PORT);

/**
 * Create HTTP server.
*/

const server = http.createServer(app);
console.log(`server on port http://localhost:${PORT}`)

server.listen(PORT);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val:string | number) {
    let port
    
    if ( typeof val === "string") return port = parseInt(val, 10);

    port = val

    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }
  