var CURIE_IMU = 0x11,
    CURIE_IMU_STEP_COUNTER = 0x04;

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
      if (subcommand === CURIE_IMU_STEP_COUNTER) {
        console.log("CURIE_IMU_STEP_COUNTER", data);
      }
    });

    // enable step counting
    board.sysexCommand([CURIE_IMU, CURIE_IMU_STEP_COUNTER, 1]);

    setTimeout(function() {
      console.log("Done.");

      // disable step counting
      board.sysexCommand([CURIE_IMU, CURIE_IMU_STEP_COUNTER, 0]);
    }, 30000);
  });
});
