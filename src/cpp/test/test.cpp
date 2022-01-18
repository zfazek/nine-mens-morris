#include "mill.h"
#include "move.h"
#include "table.h"
#include <assert.h>
#include <stdio.h>
#include <string>
#include <iostream>

using namespace std;

void make_test_move_check(Mill *mill, const string &move, int expected) {
    int result;
    result = mill->table->moveCheck(Move::getMove(move), true);
    assert(result == expected);
}

void make_test_is_end(Mill *mill, int expected) {
    int result;
    result = mill->table->isEnd();
    //printf("Test: %d\n", result);
    assert(result == expected);
}

void test_moveXX() {
    Mill *mill = new Mill();
    make_test_move_check(mill, "d6", -1);
    make_test_move_check(mill, "moved6", -1);
    make_test_move_check(mill, "mov d6", -1);
    make_test_move_check(mill, "move  d2", -1);
    make_test_move_check(mill, "move d0", -1);
    make_test_move_check(mill, "move d8", -1);
    make_test_move_check(mill, "move h4", -1);
    make_test_move_check(mill, "move h8", -1);
    make_test_move_check(mill, "move d2 ", -1);
    make_test_move_check(mill, "move d2", 0);
    make_test_move_check(mill, "move d2d4", -1);
    make_test_move_check(mill, "move d6", 0);
    make_test_move_check(mill, "move d6", -1);
    {
        int a[] = {0,    1,    1,
            0,  2,  0,
            0,0,0,
            0,0,0,  2,2,2,
            0,0,0,
            0,  0,  0,
            0,    0,    0};
        mill->table->setPos(a, 6, 6, true);
        make_test_move_check(mill, "move a7", -1);
        make_test_move_check(mill, "move a7g1", -1);
        make_test_move_check(mill, "move a7g4", -1);
        make_test_move_check(mill, "move a7a7", -1);
        make_test_move_check(mill, "move a7g7", -1);
        make_test_move_check(mill, "move a7g4g1", -1);
        make_test_move_check(mill, "move a7d6", 0);
    }
    {
        int a[] = {0,    2,    2,
            0,  1,  0,
            0,0,0,
            0,0,0,  1,1,1,
            0,0,0,
            0,  0,  0,
            0,    0,    0};
        mill->table->setPos(a, 6, 6, false);
        make_test_move_check(mill, "move a7", -1);
        make_test_move_check(mill, "move a7g1", -1);
        make_test_move_check(mill, "move a7g4", -1);
        make_test_move_check(mill, "move a7a7", -1);
        make_test_move_check(mill, "move a7g7", -1);
        make_test_move_check(mill, "move a7g4,g1", -1);
        make_test_move_check(mill, "move a7d6", 0);
    }
    {
        int a[] = {0,    1,    1,
            0,  0,  0,
            0,0,0,
            0,0,0,  2,2,2,
            0,0,0,
            0,  0,  0,
            0,    0,    0};
        mill->table->setPos(a, 6, 6, true);
        make_test_move_check(mill, "move a7g4", 0);
    }
    {
        int a[] = {0,    2,    2,
            0,  0,  0,
            0,0,0,
            0,0,0,  1,1,1,
            0,0,0,
            0,  0,  0,
            0,    0,    0};
        mill->table->setPos(a, 6, 6, false);
        make_test_move_check(mill, "move a7g4", 0);
    }
    {
        int a[] = {0,    2,    2,
            0,  0,  1,
            0,0,0,
            0,0,0,  1,1,1,
            0,0,0,
            0,  0,  1,
            0,    0,    0};
        mill->table->setPos(a, 6, 6, false);
        make_test_move_check(mill, "move a7f4", 0);
    }
    {
        int a[] = {0,    1,    1,
            0,  0,  0,
            0,0,0,
            0,0,0,  2,2,2,
            0,0,0,
            0,  0,  0,
            0,    0,    1};
        mill->table->setPos(a, 0, 0, true);
        make_test_move_check(mill, "move g1a1", 0);
    }
    {
        int a[] = {0,    1,    1,
            0,  0,  0,
            0,0,0,
            0,0,0,  2,2,2,
            0,0,0,
            0,  0,  0,
            0,    0,    1};
        mill->table->setPos(a, 0, 0, true);
        make_test_move_check(mill, "move g1d1", 0);
    }
    {
        int a[] = {0,    1,    1,
            0,  0,  0,
            0,0,0,
            0,0,0,  2,2,2,
            0,0,0,
            0,  0,  0,
            0,    0,    1};
        mill->table->setPos(a, 0, 0, true);
        make_test_move_check(mill, "move g1g4", -1);
    }
    {
        int a[] = {0,    1,    1,
            0,  0,  0,
            0,0,0,
            0,0,0,  2,2,2,
            0,0,0,
            0,  0,  0,
            0,    0,    1};
        mill->table->setPos(a, 0, 0, true);
        make_test_move_check(mill, "move g1a7", -1);
    }
    {
        int a[] = {0,    1,    1,
            0,  0,  0,
            0,0,0,
            0,0,0,  2,2,2,
            0,0,0,
            0,  0,  0,
            0,    0,    1};
        mill->table->setPos(a, 0, 0, true);
        make_test_move_check(mill, "move g1a7,f6", -1);
    }
    {
        int a[] = {0,    1,    1,
            0,  0,  0,
            0,0,0,
            0,0,0,  2,2,2,
            0,0,0,
            0,  0,  0,
            0,    0,    1};
        mill->table->setPos(a, 0, 0, true);
        make_test_move_check(mill, "move g1a7,d7", -1);
    }
    {
        int a[] = {0,    1,    1,
            0,  0,  0,
            0,0,0,
            0,0,0,  2,2,2,
            0,0,0,
            0,  0,  0,
            0,    0,    1};
        mill->table->setPos(a, 0, 0, true);
        make_test_move_check(mill, "move g1a7,f4", 0);
    }
    {
        int a[] = {0,    1,    1,
            0,  0,  0,
            0,0,0,
            2,0,0,  2,2,2,
            0,0,0,
            0,  0,  0,
            0,    0,    1};
        mill->table->setPos(a, 0, 0, true);
        make_test_move_check(mill, "move g1a7,f4", -1);
    }
    {
        int a[] = {0,    1,    1,
            0,  0,  0,
            0,0,0,
            2,0,0,  2,2,2,
            0,0,0,
            0,  0,  0,
            0,    0,    1};
        mill->table->setPos(a, 0, 0, true);
        make_test_move_check(mill, "move g1a7,b4", -1);
    }
    {
        int a[] = {0,    1,    1,
            1,  0,  0,
            0,0,0,
            2,0,0,  2,2,2,
            0,0,0,
            0,  0,  0,
            0,    0,    1};
        mill->table->setPos(a, 0, 0, true);
        make_test_move_check(mill, "move g1a7,a4", -1);
    }
    {
        int a[] = {0,    1,    1,
            0,  0,  0,
            0,0,0,
            2,0,0,  2,2,2,
            0,0,0,
            0,  0,  0,
            0,    0,    1};
        mill->table->setPos(a, 0, 0, true);
        make_test_move_check(mill, "move g1a7,a4", 0);
    }
    {
        int a[] = {0,    2,    2,
            0,  0,  0,
            0,0,0,
            0,0,0,  1,1,1,
            0,0,0,
            0,  0,  0,
            0,    0,    2};
        mill->table->setPos(a, 0, 0, false);
        make_test_move_check(mill, "move g1a1", 0);
    }
    {
        int a[] = {0,    2,    2,
            0,  0,  0,
            0,0,0,
            0,0,0,  1,1,1,
            0,0,0,
            0,  0,  0,
            0,    0,    2};
        mill->table->setPos(a, 0, 0, false);
        make_test_move_check(mill, "move g1d1", 0);
    }
    {
        int a[] = {0,    2,    2,
            0,  0,  0,
            0,0,0,
            0,0,0,  1,1,1,
            0,0,0,
            0,  0,  0,
            0,    0,    2};
        mill->table->setPos(a, 0, 0, false);
        make_test_move_check(mill, "move g1g4", -1);
    }
    {
        int a[] = {0,    2,    2,
            0,  0,  0,
            0,0,0,
            0,0,0,  1,1,1,
            0,0,0,
            0,  0,  0,
            0,    0,    2};
        mill->table->setPos(a, 0, 0, false);
        make_test_move_check(mill, "move g1a7", -1);
    }
    {
        int a[] = {0,    2,    2,
            0,  0,  0,
            0,0,0,
            0,0,0,  1,1,1,
            0,0,0,
            0,  0,  0,
            0,    0,    2};
        mill->table->setPos(a, 0, 0, false);
        make_test_move_check(mill, "move g1a7,f6", -1);
    }
    {
        int a[] = {0,    2,    2,
            0,  0,  0,
            0,0,0,
            0,0,0,  1,1,1,
            0,0,0,
            0,  0,  0,
            0,    0,    2};
        mill->table->setPos(a, 0, 0, false);
        make_test_move_check(mill, "move g1a7,d7", -1);
    }
    {
        int a[] = {0,    2,    2,
            0,  0,  0,
            0,0,0,
            0,0,0,  1,1,1,
            0,0,0,
            0,  0,  0,
            0,    0,    2};
        mill->table->setPos(a, 0, 0, false);
        make_test_move_check(mill, "move g1a7,f4", 0);
    }
    {
        int a[] = {0,    2,    2,
            0,  0,  0,
            0,0,0,
            1,0,0,  1,1,1,
            0,0,0,
            0,  0,  0,
            0,    0,    2};
        mill->table->setPos(a, 0, 0, false);
        make_test_move_check(mill, "move g1a7,f4", -1);
    }
    {
        int a[] = {0,    2,    2,
            0,  0,  0,
            0,0,0,
            1,0,0,  1,1,1,
            0,0,0,
            0,  0,  0,
            0,    0,    2};
        mill->table->setPos(a, 0, 0, false);
        make_test_move_check(mill, "move g1a7,b4", -1);
    }
    {
        int a[] = {0,    2,    2,
            0,  0,  0,
            0,0,0,
            1,0,0,  1,1,1,
            0,0,0,
            0,  0,  0,
            0,    0,    2};
        mill->table->setPos(a, 0, 0, false);
        make_test_move_check(mill, "move g1a7,a4", 0);
    }
    {
        int a[] = {0,    2,    2,
            2,  0,  0,
            0,0,0,
            1,0,0,  1,1,1,
            0,0,0,
            0,  0,  0,
            0,    0,    2};
        mill->table->setPos(a, 0, 0, false);
        make_test_move_check(mill, "move g1a7,a4", -1);
    }
    {
        int a[] = {0,    0,    0,
            0,  2,  2,
            2,0,2,
            0,0,0,  0,0,0,
            0,0,0,
            1,  1,  1,
            1,    0,    1};
        mill->table->setPos(a, 0, 0, true);
        make_test_move_check(mill, "move d2d1,d6", 0);
    }
    {
        int a[] = {0,0,0,
            2,0,0,
            0,2,0,
            0,1,0,  0,2,0,
            0,0,0,
            1,1,0,
            0,0,0};
        mill->table->setPos(a, 6, 6, true);
        make_test_move_check(mill, "move b6b6", -1);
    }
    {
        int a[] = {0,2,0,
            2,0,0,
            0,0,0,
            0,2,1,  0,0,2,
            1,2,0,
            2,2,0,
            0,2,1};
        mill->table->setPos(a, 0, 0, true);
        make_test_move_check(mill, "move c3g7,d7", -1);
    }
    delete mill;
}

void test_isEnd() {
    Mill *mill = new Mill();
    {
        int a[] = {0,    2,    2,
            0,  0,  0,
            0,0,0,
            1,0,0,  1,1,1,
            0,0,0,
            0,  0,  0,
            0,    0,    2};
        mill->table->setPos(a, 0, 0, true);
        make_test_is_end(mill, 0);
    }
    {
        int a[] = {0,    2,    2,
            0,  0,  0,
            0,0,0,
            1,0,0,  1,1,1,
            0,0,0,
            0,  0,  0,
            0,    0,    0};
        mill->table->setPos(a, 0, 0, true);
        make_test_is_end(mill, 1);
    }
    {
        int a[] = {0,    2,    2,
            0,  0,  0,
            0,0,0,
            1,0,0,  1,1,1,
            0,0,0,
            0,  0,  0,
            0,    0,    0};
        mill->table->setPos(a, 0, 1, true);
        make_test_is_end(mill, 0);
    }
    {
        int a[] = {0,    1,    1,
            0,  0,  0,
            0,0,0,
            2,0,0,  2,2,2,
            0,0,0,
            0,  0,  0,
            0,    0,    1};
        mill->table->setPos(a, 0, 0, true);
        make_test_is_end(mill, 0);
    }
    {
        int a[] = {0,    1,    1,
            0,  0,  0,
            0,0,0,
            2,0,0,  2,2,2,
            0,0,0,
            0,  0,  0,
            0,    0,    0};
        mill->table->setPos(a, 0, 0, true);
        make_test_is_end(mill, -1);
    }
    {
        int a[] = {0,    1,    1,
            0,  0,  0,
            0,0,0,
            2,0,0,  2,2,2,
            0,0,0,
            0,  0,  0,
            0,    0,    0};
        mill->table->setPos(a, 1, 0, true);
        make_test_is_end(mill, 0);
    }
    {
        int a[] = {1,    1,    1,
            2,  2,  2,
            2,1,0,
            0,1,1,  0,1,0,
            0,0,0,
            1,  1,  1,
            1,    0,    1};
        mill->table->setPos(a, 0, 0, false);
        make_test_is_end(mill, 1);
    }
    {
        int a[] = {1,    1,    1,
            2,  2,  2,
            0,1,0,
            0,1,1,  0,1,0,
            0,0,0,
            1,  1,  1,
            1,    0,    1};
        mill->table->setPos(a, 0, 0, false);
        make_test_is_end(mill, 0);
    }
    {
        int a[] = {2,    2,    2,
            1,  1,  1,
            1,2,0,
            0,2,2,  0,2,0,
            0,0,0,
            2,  2,  2,
            2,    0,    2};
        mill->table->setPos(a, 0, 0, true);
        make_test_is_end(mill, -1);
    }
    {
        int a[] = {2,    2,    2,
            1,  1,  1,
            0,2,0,
            0,2,2,  0,2,0,
            0,0,0,
            2,  2,  2,
            2,    0,    2};
        mill->table->setPos(a, 0, 0, true);
        make_test_is_end(mill, 0);
    }
    delete mill;
}

void test_best_move() {
    {
        Mill *mill = new Mill();
        int a[] = {2,    2,    2,
            1,  1,  0,
            0,0,0,
            2,0,0,  0,0,1,
            0,0,0,
            0,  0,  0,
            1,    0,    0};
        mill->table->setPos(a, 0, 0, true);
        make_test_is_end(mill, 0);
        mill->setBestMoveMCTS();
        string bestMove = mill->bestMoveStr;
        printf("test: best move: %s\n", bestMove.c_str());
        delete mill;
        //assert(bestMove == "move b6b4");
    }
    {
        Mill *mill = new Mill();
        int a[] = {1,    1,    1,
            2,  2,  0,
            0,0,0,
            1,0,0,  0,0,2,
            0,0,0,
            0,  0,  0,
            2,    0,    0};
        mill->table->setPos(a, 0, 0, false);
        make_test_is_end(mill, 0);
        mill->setBestMoveMCTS();
        string bestMove = mill->bestMoveStr;
        printf("test: best move: %s\n", bestMove.c_str());
        delete mill;
        //assert(bestMove == "move b6b4");
    }
    {
        Mill *mill = new Mill();
        int a[] = {0,    2,    2,
            2,  1,  0,
            0,0,0,
            1,0,0,  0,0,0,
            0,0,0,
            1,  0,  0,
            0,    0,    0};
        mill->table->setPos(a, 0, 0, true);
        make_test_is_end(mill, 0);
        mill->setBestMoveMCTS();
        string bestMove = mill->bestMoveStr;
        printf("test: best move: %s\n", bestMove.c_str());
        delete mill;
        //assert(bestMove.substr(7, 2) == "a7");
    }
    {
        Mill *mill = new Mill();
        int a[] = {2,    0,    0,
            0,  0,  1,
            2,0,0,
            0,2,2,  0,1,0,
            2,0,2,
            0,  0,  1,
            0,    0,    0};
        mill->table->setPos(a, 0, 0, false);
        make_test_is_end(mill, 0);
        mill->n = 10;
        mill->setBestMoveMCTS();
        string bestMove = mill->bestMoveStr;
        printf("test: best move: %s\n", bestMove.c_str());
        delete mill;
        //assert(bestMove.substr(7, 2) == "a7");
    }
}

void test_speed() {
    {
        time_t start, end;
        Mill *mill = new Mill();
        mill->n = 500;
        time(&start);
        mill->setBestMoveMCTS();
        string bestMove = mill->bestMoveStr;
        time(&end);
        printf("test: best move: %s\n", bestMove.c_str());
        printf("test: elapsed time: %ld\n", end - start);
        delete mill;
    }
}

void test_move_class() {
    {
        Move move(1, false, 0);
        assert(move.toString() == "move a7");
    }
    {
        Move move(1, false, 1);
        assert(move.toString() == "move d7");
    }
    {
        Move move(1, false, 23);
        assert(move.toString() == "move g1");
    }
    {
        Move move(2, false, 22, 23);
        assert(move.toString() == "move d1g1");
    }
    {
        Move move(2, true, 22, 23);
        assert(move.toString() == "move d1,g1");
    }
    {
        Move move(3, true, 22, 23, 0);
        assert(move.toString() == "move d1g1,a7");
    }
}

void test_getMove() {
    {
        Mill *mill = new Mill();
        string bestMove = "move c3";
        mill->move(Move::getMove(bestMove), true);
        delete mill;
    }
}

int main() {
    test_moveXX();
    test_isEnd();
    test_move_class();
    test_getMove();
    test_best_move();
    test_speed();
    return 0;
}
