var thinking = false;
var whiteToMove = true;
var whiteHand;
var blackHand;
var nofClicks;
var firstClick;
var secondClick;
var thirdClick;

// array[24] of Point
var coords = [];

// array[24] of pieces (EMPTY, WHITE, BLACK)
var table = [];

var mill = [];

// history of Move
var moveHistory = [];

// legal moves
var legalMoves = [];

function readyFn() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    $("#coord").text("");
    $("#canvas").mousedown({ canvas: canvas, ctx: ctx }, handleMouseDown);
    $("#initTable_button").click({ canvas: canvas, ctx: ctx }, handleButtonInitTable);
    $("#undo_button").click({ canvas: canvas, ctx: ctx }, handleButtonUndo);
    $("#move_button").click({ event: event, canvas: canvas, ctx: ctx }, makeComputerMove);

    startGame(canvas, ctx);
}

function startGame(canvas, ctx) {
    initTable(true);
    drawBoard(canvas, ctx);
    printTable(canvas, ctx);
}

function handleMouseDown(e) {
    if (thinking) {
        return;
    }
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var mouseX = parseInt(e.pageX - offsetX);
    var mouseY = parseInt(e.pageY - offsetY);
    var number_of_players = $("#players input[name=players]:checked").val();

    var valid = false;
    var idx = getIdxFromCoord(mouseX, mouseY);
    if (idx == -1)
        return;

    if (nofClicks == 1) {
        firstClick = idx;
    } else if (nofClicks == 2) {
        secondClick = idx;
    } else if (nofClicks == 3) {
        thirdClick = idx;
    }
    //printTmp(number_of_players);
    //printTmp("nofClicks: " + nofClicks + ", idx: " + idx + ", firstClick: " + firstClick + ", secondClick: " + secondClick + ", thirdClick: " + thirdClick);
    legalMoves = [];
    legalMoves = getAllMoves();
    for (var i = 0; i < legalMoves.length; i++) {
        var m = legalMoves[i];
        if (m.length == 1) {
            if (firstClick == m.x && nofClicks == 1) {
                moveCheck(m, true);
                moveHistory[moveHistory.length] = m;
                valid = true;
                break;
            } else if (secondClick == m.x && nofClicks == 2) {
                moveCheck(m, true);
                moveHistory[moveHistory.length] = m;
                valid = true;
                break;
            }
        } else if (m.length == 2) {
            if (nofClicks == 1) {
                if (firstClick == m.x) {
                    lightPossiblePositions(e.data.canvas, e.data.ctx, firstClick, 2);
                    nofClicks = 2;
                    break;
                }
            } else if (nofClicks == 2) {
                if (firstClick == m.x && secondClick == m.y) {
                    moveCheck(m, true);
                    moveHistory[moveHistory.length] = m;
                    valid = true;
                    break;
                } else if (secondClick == m.x) {
                    firstClick = secondClick;
                    lightPossiblePositions(e.data.canvas, e.data.ctx, secondClick, 2);
                    nofClicks = 2;
                    break;
                }
            } else if (nofClicks == 3) {
                if (thirdClick == m.x) {
                    firstClick = thirdClick;
                    lightPossiblePositions(e.data.canvas, e.data.ctx, thirdClick, 2);
                    nofClicks = 2;
                    break;
                }
            }
        } else if (m.length == 3) {
            if (nofClicks == 1) {
                if (firstClick == m.x) {
                    lightPossiblePositions(e.data.canvas, e.data.ctx, firstClick, 2);
                    nofClicks = 2;
                    break;
                }
            } else if (nofClicks == 2) {
                if (firstClick == m.x && secondClick == m.y) {
                    lightPossiblePositions(e.data.canvas, e.data.ctx, firstClick, 3);
                    nofClicks = 3;
                    break;
                } else if (secondClick == m.x) {
                    firstClick = secondClick;
                    lightPossiblePositions(e.data.canvas, e.data.ctx, secondClick, 2);
                    nofClicks = 2;
                    break;
                }
            } else if (nofClicks == 3) {
                if (firstClick == m.x && secondClick == m.y && thirdClick == m.z) {
                    moveCheck(m, true);
                    moveHistory[moveHistory.length] = m;
                    valid = true;
                    break;
                }
            }
        }
    }

    if (valid) {
        resetClicks();
        printTable(e.data.canvas, e.data.ctx);
        var end = isEnd();
        if (end != 0) {
            if (end == 1) {
                alert("White won!");
            } else {
                alert("Black won!");
            }
        } else if (number_of_players == "computer") {
            makeComputerMove(e);
        }
    }

    legalMoves = [];
    legalMoves = getAllMoves();
    //printTmp("nofClicks: " + nofClicks + ", idx: " + idx + ", firstClick: " + firstClick + ", secondClick: " + secondClick + ", thirdClick: " + thirdClick);
    //printLegalMoves();
    //printHistory();
}

/*
   function move1(idx) {
   var p = coords[idx];
   var m = new Move(1, false, idx, 0, 0)
   if (whiteToMove) {
   table[idx] = WHITE;
   moveHistory[moveHistory.length] = m;
   whiteHand--;
   }
   else {
   table[idx] = BLACK;
   moveHistory[moveHistory.length] = m;
   blackHand--;
   }
   }
   */

function generatePositionJsonString() {
    var ret = "{\"table\":[";
    for (var i = 0; i < table.length; i++) {
        ret += table[i];
        if (i < table.length - 1) {
            ret += ", ";
        }
    }
    ret += "]";
    ret += ",\"white_hand\":" + whiteHand + ",\"black_hand\":" + blackHand;
    ret += ",\"white_to_move\":" + whiteToMove;
    ret += "}"
    return ret;
}

function makeComputerMove(e) {
    thinking = true;
    $('html,body').css('cursor', 'progress');
    var pos = generatePositionJsonString();
    printTmp("Thinking...");
    $.ajax({
        url: "/cgi-bin/morris.cgi",
        type: "post",
        data: "position=" + pos,
        success: function (data) {
            var computer_move = JSON.parse(data);
            var move = new Move(
                computer_move.length,
                computer_move.capture,
                computer_move.x,
                computer_move.y,
                computer_move.z);
            moveCheck(move, true);
            moveHistory[moveHistory.length] = move;
            printTable(e.data.canvas, e.data.ctx);
            $('html,body').css('cursor', 'default');
            printTmp("");
            thinking = false;
            var end = isEnd();
            if (end != 0) {
                if (end == 1) {
                    alert("White won!");
                } else {
                    alert("Black won!");
                }
            }
        }
    });
}

function handleButtonUndo(e) {
    if (moveHistory.length == 0)
        return;
    moveHistory.splice(moveHistory.length - 1, 1);
    initTable(false);
    for (var i = 0; i < moveHistory.length; i++) {
        moveCheck(moveHistory[i], true);
    }
    printTable(e.data.canvas, e.data.ctx);
    //printHistory();

    legalMoves = [];
    legalMoves = getAllMoves();
    //printTmp(legalMoves.length);
    //printLegalMoves();
}

function Point(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
}

function Move(l, c, x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.length = l;
    this.capture = c;
}

function getIdxFromCoord(mx, my) {
    for (var i = 0; i < coords.length; i++) {
        var p = coords[i];
        if (Math.abs(mx - p.x) < p.r && Math.abs(my - p.y) < p.r)
            return i;
    }
    return -1;
}

function invertWhitePlayerToMove() {
    whiteToMove = whiteToMove == false;
}

function handleButtonInitTable(e) {
    initTable(true);
    printTable(e.data.canvas, e.data.ctx);
    printTmp("");
}

function printTmp(str) {
    $("#tmp").html(str);
}

function printLegalMoves() {
    var str = "";
    if (whiteToMove) str += "white<br>"; else str += "black<br>";
    for (var i = 0; i < legalMoves.length; i++) {
        var m = legalMoves[i];
        str += m.x + " " + m.y + " " + m.z + " " + m.length + " " + m.capture + "<br>";
    }
    $("#coords").html(str);
}

function printHistory() {
    var str = "";
    for (var i = 0; i < moveHistory.length; i++) {
        var m = moveHistory[i];
        str += m.x + " " + m.y + " " + m.z + " " + m.length + " " + m.capture + "<br>";
    }
    $("#history").html(str);
}

function resetClicks() {
    nofClicks = 1;
    firstClick = -1;
    secondClick = -1;
    thirdClick = -1;
}
