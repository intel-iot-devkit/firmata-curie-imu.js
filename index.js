var CURIE_IMU = 0x11,
    CURIE_IMU_READ_ACCEL = 0x00;

var Board = require("firmata");

Board.requestPort(function(error, port) {
  if (error) {
    console.log(error);
    return;
  }

  var board = new Board(port.comName, { skipCapabilities: true });

  board.on("ready", function() {
    console.log("Ready.");

    var pin = 13;
    var state = 1;

    board.pinMode(pin, board.MODES.OUTPUT);
    board.sysexResponse(CURIE_IMU, function(data) {
      var subcommand = data.shift();
      if (subcommand === CURIE_IMU_READ_ACCEL) {
        console.log("CURIE_IMU_READ_ACCEL", Board.decode(data));
      }
    });

    setInterval(function() {
      board.digitalWrite(pin, (state ^= 1));
      board.sysexCommand([CURIE_IMU, CURIE_IMU_READ_ACCEL]);
    }, 500);
  });
});
