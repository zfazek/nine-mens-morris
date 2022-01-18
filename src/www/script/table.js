var EMPTY = 0;
var WHITE = 1;
var BLACK = 2;
var POINT = 3;
var LIGHT = 4;
var N_HAND = 9;

var millHelper = [
    0, 1, 2, 9, 21,
    1, 0, 2, 4, 7,
    2, 0, 1, 14, 23,
    3, 4, 5, 10, 18,
    4, 1, 7, 3, 5,
    5, 3, 4, 13, 20,
    6, 7, 8, 11, 15,
    7, 1, 4, 6, 8,
    8, 6, 7, 12, 17,
    9, 10, 11, 0, 21,
    10, 9, 11, 3, 18,
    11, 6, 15, 9, 10,
    12, 8, 17, 13, 14,
    13, 5, 20, 12, 14,
    14, 2, 23, 12, 13,
    15, 6, 11, 16, 17,
    16, 15, 17, 19, 22,
    17, 8, 12, 15, 16,
    18, 3, 10, 19, 20,
    19, 16, 22, 18, 20,
    20, 5, 13, 18, 19,
    21, 0, 9, 22, 23,
    22, 16, 19, 21, 23,
    23, 2, 14, 21, 22
];

var millNeighbors = [
    0, 1, 1, 9, 9,
    1, 0, 2, 4, 4,
    2, 1, 1, 14, 14,
    3, 4, 4, 10, 10,
    4, 1, 3, 5, 7,
    5, 4, 4, 13, 13,
    6, 7, 7, 11, 11,
    7, 4, 6, 8, 8,
    8, 7, 7, 12, 12,
    9, 0, 10, 21, 21,
    10, 3, 9, 11, 18,
    11, 6, 10, 15, 15,
    12, 8, 13, 17, 17,
    13, 5, 12, 14, 20,
    14, 2, 13, 23, 23,
    15, 11, 11, 16, 16,
    16, 15, 17, 19, 19,
    17, 12, 12, 16, 16,
    18, 10, 10, 19, 19,
    19, 16, 18, 20, 22,
    20, 13, 13, 19, 19,
    21, 9, 9, 22, 22,
    22, 19, 21, 23, 23,
    23, 14, 14, 22, 22
];

function initTable(deleteHistory) {
    table = [];
    if (deleteHistory)
        moveHistory = [];
    whiteHand = N_HAND;
    blackHand = N_HAND;
    whiteToMove = true;
    for (var i = 0; i < 24; i++) {
        table[table.length] = EMPTY;
    }
    resetClicks();
}

function getNofPiece(color) {
    var n = 0;
    for (var i = 0; i < 24; i++) {
        if (table[i] == color)
            n++;
    }
    return n;
}

function getAllMoves() {
    var moves = [];
    var n_white = getNofPiece(WHITE);
    var n_black = getNofPiece(BLACK);
    if (whiteToMove) {
        if (whiteHand > 0) {
            for (var i = 0; i < 24; i++) {
                if (moveCheck1(i, false) == 0) {
                    moves[moves.length] = new Move(1, false, i);
                } else {
                    for (var j = 0; j < 24; j++) {
                        if (moveCheck2(i, j, false, n_white, n_black) == 0) {
                            moves[moves.length] = new Move(2, true, i, j);
                        }
                    }
                }
            }
        } else {
            for (var i = 0; i < 24; i++) {
                for (var j = 0; j < 24; j++) {
                    if (moveCheck2(i, j, false, n_white, n_black) == 0) {
                        moves[moves.length] = new Move(2, false, i, j);
                    } else {
                        for (var k = 0; k < 24; k++) {
                            if (moveCheck3(i, j, k, false, n_white, n_black) == 0) {
                                moves[moves.length] = new Move(3, true, i, j, k);
                            }
                        }
                    }
                }
            }
        }
    } else {
        if (blackHand > 0) {
            for (var i = 0; i < 24; i++) {
                if (moveCheck1(i, false) == 0) {
                    moves[moves.length] = new Move(1, false, i);
                } else {
                    for (var j = 0; j < 24; j++) {
                        if (moveCheck2(i, j, false, n_white, n_black) == 0) {
                            moves[moves.length] = new Move(2, true, i, j);
                        }
                    }
                }
            }
        } else {
            for (var i = 0; i < 24; i++) {
                for (var j = 0; j < 24; j++) {
                    if (moveCheck2(i, j, false, n_white, n_black) == 0) {
                        moves[moves.length] = new Move(2, false, i, j);
                    } else {
                        for (var k = 0; k < 24; k++) {
                            if (moveCheck3(i, j, k, false, n_white, n_black) == 0) {
                                moves[moves.length] = new Move(3, true, i, j, k);
                            }
                        }
                    }
                }
            }
        }
    }
    return moves;
}

function moveCheck(move, makeMove) {
    if (move.length == 1) {
        return moveCheck1(move.x, makeMove);
    } else if (move.length == 2) {
        var n_white = getNofPiece(WHITE);
        var n_black = getNofPiece(BLACK);
        return moveCheck2(move.x, move.y, makeMove, n_white, n_black);
    } else {
        var n_white = getNofPiece(WHITE);
        var n_black = getNofPiece(BLACK);
        return moveCheck3(move.x, move.y, move.z, makeMove, n_white, n_black);
    }
}

function moveCheck1(i, makeMove) {
    if (whiteToMove && whiteHand == 0) return -1;
    if (! whiteToMove && blackHand == 0) return -1;
    if (table[i] != EMPTY) return -1;
    if (whiteToMove) {
        if (isMill(i, WHITE)) return -1;
        if (makeMove) {
            table[i] = WHITE;
            whiteToMove = false;
            --whiteHand;
        }
        return 0;
    } else {
        if (isMill(i, BLACK)) return -1;
        if (makeMove) {
            table[i] = BLACK;
            whiteToMove = true;
            --blackHand;
        }
        return 0;
    }
    return 0;
}

function moveCheck2(i1, i2, makeMove, n_white, n_black) {

    // Simple WHITE move 
    if (whiteToMove && whiteHand == 0) {
        if (table[i1] != WHITE) return -1;
        if (table[i2] != EMPTY) return -1;
        if (n_white > 3 && ! isNeighbor(i1, i2)) return -1;
        table[i1] = EMPTY;
        table[i2] = WHITE;

        // Move into mill but there is no pick 
        if (isMill(i2, WHITE)) {
            table[i1] = WHITE;
            table[i2] = EMPTY;
            return -1;
        }
        if (makeMove) {
            whiteToMove = false;
        } else {
            table[i1] = WHITE;
            table[i2] = EMPTY;
        }
        return 0;
    }

    // Simple BLACK move 
    if (!whiteToMove && blackHand == 0) {
        if (table[i1] != BLACK) return -1;
        if (table[i2] != EMPTY) return -1;
        if (n_black > 3 && ! isNeighbor(i1, i2)) return -1;
        table[i1] = EMPTY;
        table[i2] = BLACK;

        // Move into mill but there is no pick 
        if (isMill(i2, BLACK)) {
            table[i1] = BLACK;
            table[i2] = EMPTY;
            return -1;
        }
        if (makeMove) {
            whiteToMove = true;
        } else {
            table[i1] = BLACK;
            table[i2] = EMPTY;
        }
        return 0;
    }

    // Mill from hand 
    if (whiteToMove && whiteHand > 0) {
        if (table[i1] != EMPTY) return -1;
        if (table[i2] != BLACK) return -1;
        if (isMill(i1, WHITE)) {

            // You can not pick from mill 
            if (isMill(i2, BLACK) && hasSoloMorris(BLACK)) return -1;
            if (makeMove) {
                table[i1] = WHITE;
                table[i2] = EMPTY;
                whiteToMove = false;
                --whiteHand;
            }
            return 0;
        }
    }
    if (!whiteToMove && blackHand > 0) {
        if (table[i1] != EMPTY) return -1;
        if (table[i2] != WHITE) return -1;
        if (isMill(i1, BLACK)) {

            // You can not pick from mill 
            if (isMill(i2, WHITE) && hasSoloMorris(WHITE)) return -1;
            if (makeMove) {
                table[i1] = BLACK;
                table[i2] = EMPTY;
                whiteToMove = true;
                --blackHand;
            }
            return 0;
        }
    }
    return -1;
}

function moveCheck3(i1, i2, i3, makeMove, n_white, n_black) {
    if (whiteToMove && whiteHand == 0) {
        if (table[i1] != WHITE) return -1;
        if (table[i2] != EMPTY) return -1;
        if (table[i3] != BLACK) return -1;
        if (n_white > 3 && ! isNeighbor(i1, i2)) return -1;
        table[i1] = EMPTY;
        table[i2] = WHITE;
        if (!isMill(i2, WHITE)) {
            table[i1] = WHITE;
            table[i2] = EMPTY;
            return -1;
        }
        if (isMill(i3, BLACK) && hasSoloMorris(BLACK)) {
            table[i1] = WHITE;
            table[i2] = EMPTY;
            return -1;
        }
        if (makeMove) {
            table[i3] = EMPTY;
            whiteToMove = false;
        } else {
            table[i1] = WHITE;
            table[i2] = EMPTY;
        }
        return 0;
    }

    if (! whiteToMove && blackHand == 0) {
        if (table[i1] != BLACK) return -1;
        if (table[i2] != EMPTY) return -1;
        if (table[i3] != WHITE) return -1;
        if (n_black > 3 && ! isNeighbor(i1, i2)) return -1;
        table[i1] = EMPTY;
        table[i2] = BLACK;
        if (!isMill(i2, BLACK)) {
            table[i1] = BLACK;
            table[i2] = EMPTY;
            return -1;
        }
        if (isMill(i3, WHITE) && hasSoloMorris(WHITE)) {
            table[i1] = BLACK;
            table[i2] = EMPTY;
            return -1;
        }
        if (makeMove) {
            table[i3] = EMPTY;
            whiteToMove = true;
        } else {
            table[i1] = BLACK;
            table[i2] = EMPTY;
        }
        return 0;
    }
    return -1;
}

function isMill(idx, color) {
    if (table[millHelper[5 * idx + 1]] == color &&
            table[millHelper[5 * idx + 2]] == color) return true;
    if (table[millHelper[5 * idx + 3]] == color &&
            table[millHelper[5 * idx + 4]] == color) return true;
    return false;
}

function getField(i) {
    return table[i];
}

function isEnd() {
    if (whiteHand > 0) return 0;
    if (blackHand > 0) return 0;
    if (getNofPiece(WHITE) < 3) return -1;
    if (getNofPiece(BLACK) < 3) return 1;
    var n_moves = getAllMoves().length;
    if (whiteToMove && n_moves == 0) return -1;
    if (! whiteToMove && n_moves == 0) return 1;
    return 0;
}

function isNeighbor(idx1, idx2) {
    return millNeighbors[idx1 * 5 + 1] == idx2 ||
        millNeighbors[idx1 * 5 + 2] == idx2 ||
        millNeighbors[idx1 * 5 + 3] == idx2 ||
        millNeighbors[idx1 * 5 + 4] == idx2;
}

function hasSoloMorris(color) {
    for (var i = 0; i < 24; i++)
        if (table[i] == color)
            if (! isMill(i, color))
                return true;
    return false;
}
