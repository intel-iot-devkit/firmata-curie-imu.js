var CURIE_IMU = 0x11,
    CURIE_IMU_READ_GYRO = 0x01;

var Board = require("firmata");

Board.requestPort(function(error, port) {
  if (error) {
    console.log(error);
    return;
  }

  var board = new Board(port.comName, { skipCapabilities: true });

  board.on("ready", function() {
    console.log("Ready.");

    board.sysexResponse(CURIE_IMU, function(data) {
      var subcommand = data.shift();
      if (subcommand === CURIE_IMU_READ_GYRO) {
        console.log("CURIE_IMU_READ_GYRO", Board.decode(data));
      }
    });

    setInterval(function() {
      board.sysexCommand([CURIE_IMU, CURIE_IMU_READ_GYRO]);
    }, 500);
  });
});