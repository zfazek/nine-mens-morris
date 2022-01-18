#pragma once

#include <vector>
#include <string>

class Table;
struct Move;
class Node;

class Mill {
    public:

        Mill();
        ~Mill();
        Table *table;
        void initTable(bool);
        int getWhiteHand();
        int getBlackHand();
        std::vector<std::string> getHistory();
        int move(Move move, bool updateHistory);
        int getHistoryIdx();
        void setHistoryIdx(int idx);
        void clearHistory();
        void updateTable();
        void setBestMoveMCTS();
        void getBestMoveOneThread(Node *move);
        void backupPosition(const Mill *mill);
        void restorePosition(Mill *mill);
        int n;
        std::string bestMoveStr;
        bool thinking;
        bool debug;

    private:
        std::vector<std::string> history;
        int historyIdx;
        void printMoves(std::vector<std::string>);
};

