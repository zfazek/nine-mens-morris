function drawBoard(canvas, ctx) {
    var X_OFFSET = 100;
    var Y_OFFSET = 0;
    var width = canvas.width - 2 * X_OFFSET;
    var LWIDTH = 2;
    var GAP = 60;
    var PADDING = 25;
    var RADIUS = 3;
    var PIECE_RADIUS = GAP / 3;

    ctx.clearRect (0, 0, canvas.width, canvas.height);
    fillCoords(width, PADDING, GAP, X_OFFSET, Y_OFFSET, PIECE_RADIUS);

    ctx.beginPath();
    ctx.lineWidth = LWIDTH;
    ctx.rect(PADDING + X_OFFSET, Y_OFFSET + PADDING, width - 2 * PADDING, width - 2 * PADDING);
    ctx.rect(PADDING + X_OFFSET + GAP, Y_OFFSET + PADDING + GAP, width - 2 * PADDING - 2 * GAP, width - 2 * PADDING - 2 * GAP);
    ctx.rect(PADDING + X_OFFSET + 2 * GAP, Y_OFFSET + PADDING + 2 * GAP, width - 2 * PADDING - 4 * GAP, width - 2 * PADDING - 4 * GAP);
    ctx.moveTo(X_OFFSET + width / 2, Y_OFFSET + PADDING);
    ctx.lineTo(X_OFFSET + width / 2, Y_OFFSET + PADDING + 2 * GAP);
    ctx.moveTo(X_OFFSET + width / 2, Y_OFFSET + width - PADDING);
    ctx.lineTo(X_OFFSET + width / 2, Y_OFFSET + width - PADDING - 2 * GAP);
    ctx.moveTo(PADDING + X_OFFSET, Y_OFFSET + width / 2);
    ctx.lineTo(PADDING + X_OFFSET + 2 * GAP, Y_OFFSET + width / 2);
    ctx.moveTo(X_OFFSET + width - PADDING, Y_OFFSET + width / 2);
    ctx.lineTo(X_OFFSET + width - PADDING - 2 * GAP, Y_OFFSET + width / 2);
    ctx.stroke();

    drawCircle(ctx, X_OFFSET + PADDING, Y_OFFSET + PADDING, RADIUS, POINT);
    drawCircle(ctx, X_OFFSET + width / 2, Y_OFFSET + PADDING, RADIUS, POINT);
    drawCircle(ctx, X_OFFSET + width - PADDING, Y_OFFSET + PADDING, RADIUS, POINT);

    drawCircle(ctx, X_OFFSET + PADDING + GAP, Y_OFFSET + PADDING + GAP, RADIUS, POINT);
    drawCircle(ctx, X_OFFSET + width / 2, Y_OFFSET + PADDING + GAP, RADIUS, POINT);
    drawCircle(ctx, X_OFFSET + width - PADDING - GAP, Y_OFFSET + PADDING + GAP, RADIUS, POINT);

    drawCircle(ctx, X_OFFSET + PADDING + 2 * GAP, Y_OFFSET + PADDING + 2 * GAP, RADIUS, POINT);
    drawCircle(ctx, X_OFFSET + width / 2, Y_OFFSET + PADDING + 2 * GAP, RADIUS, POINT);
    drawCircle(ctx, X_OFFSET + width - PADDING - 2 * GAP, Y_OFFSET + PADDING + 2 * GAP, RADIUS, POINT);

    drawCircle(ctx, X_OFFSET + PADDING, Y_OFFSET + width / 2, RADIUS, POINT);
    drawCircle(ctx, X_OFFSET + PADDING + GAP, Y_OFFSET + width / 2, RADIUS, POINT);
    drawCircle(ctx, X_OFFSET + PADDING + 2 * GAP, Y_OFFSET + width / 2, RADIUS, POINT);
    drawCircle(ctx, X_OFFSET + width - PADDING, Y_OFFSET + width / 2, RADIUS, POINT);
    drawCircle(ctx, X_OFFSET + width - PADDING - GAP, Y_OFFSET + width / 2, RADIUS, POINT);
    drawCircle(ctx, X_OFFSET + width - PADDING - 2 * GAP, Y_OFFSET + width / 2, RADIUS, POINT);

    drawCircle(ctx, X_OFFSET + PADDING + 2 * GAP, Y_OFFSET + width - PADDING - 2 * GAP, RADIUS, POINT);
    drawCircle(ctx, X_OFFSET + width / 2, Y_OFFSET + width - PADDING - 2 * GAP, RADIUS, POINT);
    drawCircle(ctx, X_OFFSET + width - PADDING - 2 * GAP, Y_OFFSET + width - PADDING - 2 * GAP, RADIUS, POINT);

    drawCircle(ctx, X_OFFSET + PADDING + GAP, Y_OFFSET + width - PADDING - GAP, RADIUS, POINT);
    drawCircle(ctx, X_OFFSET + width / 2, Y_OFFSET + width - PADDING - GAP, RADIUS, POINT);
    drawCircle(ctx, X_OFFSET + width - PADDING - GAP, Y_OFFSET + width - PADDING - GAP, RADIUS, POINT);

    drawCircle(ctx, X_OFFSET + PADDING, Y_OFFSET + width - PADDING, RADIUS, POINT);
    drawCircle(ctx, X_OFFSET + width / 2, Y_OFFSET + width - PADDING, RADIUS, POINT);
    drawCircle(ctx, X_OFFSET + width - PADDING, Y_OFFSET + width - PADDING, RADIUS, POINT);
}

function drawCircle(ctx, x, y, radius, c) {
    var color;
    if (c == WHITE)
        color = "#CCCCCC";
    if (c == BLACK)
        color = "#222222";
    if (c == POINT)
        color = "#000000";
    if (c == LIGHT)
        color = "#009900";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

function fillCoords(width, padding, gap, x_offset, y_offset, radius) {
    coords = [];
    var point = new Point(x_offset + padding, y_offset + padding, radius); coords[coords.length] = point;
    var point = new Point(x_offset + width / 2, y_offset + padding, radius); coords[coords.length] = point;
    var point = new Point(x_offset + width - padding, y_offset + padding, radius); coords[coords.length] = point;

    var point = new Point(x_offset + padding + gap, y_offset + padding + gap, radius); coords[coords.length] = point;
    var point = new Point(x_offset + width / 2, y_offset + padding + gap, radius); coords[coords.length] = point;
    var point = new Point(x_offset + width - padding - gap, y_offset + padding + gap, radius); coords[coords.length] = point;

    var point = new Point(x_offset + padding + 2 * gap, y_offset + padding + 2 * gap, radius); coords[coords.length] = point;
    var point = new Point(x_offset + width / 2, y_offset + padding + 2 * gap, radius); coords[coords.length] = point;
    var point = new Point(x_offset + width - padding - 2 * gap, y_offset + padding + 2 * gap, radius); coords[coords.length] = point;

    var point = new Point(x_offset + padding, y_offset + width / 2, radius); coords[coords.length] = point;
    var point = new Point(x_offset + padding + gap, y_offset + width / 2, radius); coords[coords.length] = point;
    var point = new Point(x_offset + padding + 2 * gap, y_offset + width / 2, radius); coords[coords.length] = point;
    var point = new Point(x_offset + width - padding - 2 * gap, y_offset + width / 2, radius); coords[coords.length] = point;
    var point = new Point(x_offset + width - padding - gap, y_offset + width / 2, radius); coords[coords.length] = point;
    var point = new Point(x_offset + width - padding, y_offset + width / 2, radius); coords[coords.length] = point;

    var point = new Point(x_offset + padding + 2 * gap, y_offset + width - padding - 2 * gap, radius); coords[coords.length] = point;
    var point = new Point(x_offset + width / 2, y_offset + width - padding - 2 * gap, radius); coords[coords.length] = point;
    var point = new Point(x_offset + width - padding - 2 * gap, y_offset + width - padding - 2 * gap, radius); coords[coords.length] = point;

    var point = new Point(x_offset + padding + gap, y_offset + width - padding - gap, radius); coords[coords.length] = point;
    var point = new Point(x_offset + width / 2, y_offset + width - padding - gap, radius); coords[coords.length] = point;
    var point = new Point(x_offset + width - padding - gap, y_offset + width - padding - gap, radius); coords[coords.length] = point;

    var point = new Point(x_offset + padding, y_offset + width - padding, radius); coords[coords.length] = point;
    var point = new Point(x_offset + width / 2, y_offset + width - padding, radius); coords[coords.length] = point;
    var point = new Point(x_offset + width - padding, y_offset + width - padding, radius); coords[coords.length] = point;
}

function drawPieces(ctx) {
    for (var i = 0; i < 24; i++) {
        var p = coords[i];
        if (table[i] == WHITE) {
            drawCircle(ctx, p.x, p.y, p.r, WHITE);
        } else if (table[i] == BLACK) {
            drawCircle(ctx, p.x, p.y, p.r, BLACK);
        }
    }
}

function drawHands(canvas, ctx) {
    var padding = 2;
    var p = coords[0];
    for (var i = 0; i < whiteHand; i++) {
        drawCircle(ctx, padding + p.r, padding + p.r * (i + 1), p.r, WHITE);
    }
    for (var i = 0; i < blackHand; i++) {
        drawCircle(ctx, canvas.width - p.r - padding, padding + p.r * (i + 1), p.r, BLACK);
    }
    if (whiteToMove) {
        drawCircle(ctx, padding + p.r, canvas.height - padding - p.r, p.r, WHITE);
    } else {
        drawCircle(ctx, padding + p.r, canvas.height - padding - p.r, p.r, BLACK);
    }
}

function printTable(canvas, ctx) {
    drawBoard(canvas, ctx); 
    drawPieces(ctx);
    drawHands(canvas, ctx);
}

function lightPossiblePositions(canvas, ctx, idx, pos) {
    var list = [];
    for (var j = 0; j < legalMoves.length; j++) {
        var m = legalMoves[j];
        if (idx == m.x) {
            if (pos == 2)
                list[list.length] = m.y;
            else if (pos == 3 && m.length == pos)
                list[list.length] = m.z;
        }
    }
    printTable(canvas, ctx);
    for (var i = 0; i < list.length; i++) {
        var p = coords[list[i]];
        drawCircle(ctx, p.x, p.y, p.r / 2, LIGHT);
    }
}
