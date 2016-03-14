var CURIE_IMU = 0x11,
    CURIE_IMU_TAP_DETECT = 0x05;

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
      if (subcommand === CURIE_IMU_TAP_DETECT) {
        console.log("CURIE_IMU_TAP_DETECT", data);
      }
    });

    // enable tap detection
    board.sysexCommand([CURIE_IMU, CURIE_IMU_TAP_DETECT, 1]);

    setTimeout(function() {
      console.log("Done.");

      // disable tap detection
      board.sysexCommand([CURIE_IMU, CURIE_IMU_TAP_DETECT, 0]);
    }, 30000);
  });
});
