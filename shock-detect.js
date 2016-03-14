var CURIE_IMU = 0x11,
    CURIE_IMU_SHOCK_DETECT = 0x03;

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
      if (subcommand === CURIE_IMU_SHOCK_DETECT) {
        console.log("CURIE_IMU_SHOCK_DETECT", Board.decode(data));
      }
    });

    // enable shock detection
    board.sysexCommand([CURIE_IMU, CURIE_IMU_SHOCK_DETECT, 1]);

    setTimeout(function() {
      console.log("Done.");
      board.sysexCommand([CURIE_IMU, CURIE_IMU_SHOCK_DETECT, 0]);
    }, 5000);
  });
});
