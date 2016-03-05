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

    setInterval(function() {
      board.digitalWrite(pin, (state ^= 1));
    }, 500);
  });
});
