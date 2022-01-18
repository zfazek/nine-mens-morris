#include "node.h"
#include "move.h"
#include "table.h"
#include <vector>
#include <math.h>
#include <time.h>
#include <stdlib.h>
#include <stdio.h>
#include <string>

using namespace std;

Node::Node(Table *t, int nn) {
    table = t;
    backupTable = new Table();
    backupTable->backupPosition(table);
    n = nn;
    totValue = 0.0;
    nVisits = 0.0;
}

Node::~Node() {
    for (Node *c : children) {
        delete c;
    }
    delete backupTable;
}

vector<Node*> Node::getChildren() {
    return children;
}

void Node::selectAction() {
    srand(time(0));
    vector<Node*> visited;
    Node *cur = this;
    visited.push_back(this);
    backupTable->restorePosition(table);
    bool whiteToMove = table->data.whiteToMove;
    while (!cur->isLeaf()) {
        cur = cur->select(visited.size());
        table->moveCheck(cur->currMove, true);
        visited.push_back(cur);
    }
    Node *newNode;
    int value = MAX_LONG * table->isEnd();
    if (value == 0) {
        cur->expand();
        newNode = cur->select(visited.size());
        visited.push_back(newNode);
        value = evaluate(newNode);
        if (! whiteToMove) {
            value = -value;
        }
    } else {
        if (! whiteToMove) {
            value = -value;
        }
        newNode = cur;
    }
    for (Node *node : visited) {
        node->updateStats(value);
    }
}

Node *Node::select(int depth) {
    Node *selected = nullptr;
    double bestValue = -10e10;
    for (Node *c : children) {
        if (depth == 1 && c->nVisits < (double)n / children.size() / 3 ) {
            return c;
        }
        double uctValue =
            c->totValue / (c->nVisits + epsilon) +
            sqrt(log(nVisits + 1) / (c->nVisits + epsilon)) +
            nextDouble() * epsilon;
        if (uctValue > bestValue) {
            selected = c;
            bestValue = uctValue;
        }
    }
    return selected;
}

int Node::evaluate(const Node *newNode) {
    Table t;
    t.backupPosition(table);
    table->moveCheck(newNode->currMove, true);
    int end = table->isEnd();
    if (end != 0) {
        t.restorePosition(table);
        return MAX_LONG * end;
        //return end;
    }
    for (int i = 0; i < MAX_LONG; i++) {
        vector<Move> moves = getTerminateMoves();
        if (moves.size() > 0) {
            table->moveCheck(moves[rand() % moves.size()], true);
        }

        // -1: Black won, 0: no end, 1: White won
        int end = table->isEnd();
        if (end != 0) {
            t.restorePosition(table);
            //return end;
            return (MAX_LONG - i) * end;
        }
    }
    t.restorePosition(table);
    return 0; // no progress -> DRAW
}

int Node::arity() {
    return children.size();
}

void Node::print() {
    printf("%-15.15s %.0f/%.0f\n",
            currMove.toString().c_str(),
            totValue,
            nVisits);
}

bool Node::isLeaf() {
    return children.size() == 0;
}

vector<Move> Node::getTerminateMoves() {
    Table t;
    vector<Move> moves = table->getAllMoves();
    vector<Move> terminate_moves;
    for (Move move : moves) {
        t.backupPosition(table);
        table->moveCheck(move, true);
        if (table->isEnd() != 0) {
            terminate_moves.push_back(move);
        }
        t.restorePosition(table);
    }
    if (terminate_moves.size() == 0) {
        return moves;
    } else {
        return terminate_moves;
    }
}

void Node::expand() {
    vector<Move> moves = getTerminateMoves();
    for (size_t i = 0; i < moves.size(); i++) {
        Node *node = new Node(table, n);
        node->currMove = moves[i];
        children.push_back(node);
    }
}

Node *Node::getBest() {
    Node *selected = nullptr;
    double bestValue = -10e10;
    for (Node *c : children) {
        if (c->totValue > bestValue) {
            bestValue = c->totValue;
            selected = c;
        }
    }
    return selected;
}

void Node::updateStats(int value) {
    nVisits++;
    totValue += value;
}

double Node::nextDouble() {
    return (double)rand() / RAND_MAX;
}
