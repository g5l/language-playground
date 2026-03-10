const net = require('net');

// The "reactor" — Node's event loop handles the demultiplexing for us
const server = net.createServer((socket) => {
  // This is a handler, registered for each new connection event

  socket.on('data', (data) => {
    // Handler for "readable data" events on this socket
    const response = process(data);
    socket.write(response);
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000);
// The event loop (reactor) is now running, demultiplexing I/O