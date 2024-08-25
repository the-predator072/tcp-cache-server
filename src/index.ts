import net from "net";
import CacheMethods from "./cacheMethods";
const cache = new CacheMethods();
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const [command, key, value, expiration] = data.toString().split(" ");
    switch (command) {
      case "SAVE": {
        cache.setSingle({ key, val: value, ttl: parseInt(expiration) });
        socket.write("OK");
        break;
      }
      case "GET": {
        const data = cache.getSingle(key);
        socket.write(!!data ? data : '"NOT_FOUND"');
        break;
      }
      case "DELETE": {
        if (cache.hasKey(key)) {
          cache.deleteSingle(key);
          socket.write("DELETED");
        }
        break;
      }
      default: {
        socket.write("INVALID_COMMAND");
      }
    }
  });

  socket.on("error", (err) => {
    console.log("err===>", err);
  });

  socket.on("end", () => {
    console.log("connection ended by the client");
  });
});

server.listen(4000, () => {
  console.log("TCP server running on port 4000");
});
