#pragma once

#include <string>

extern int coordHelper[72];

struct Move {
    int length;
    bool capture;
    int x;
    int y;
    int z;

    Move();
    Move(int length, bool capture, int x);
    Move(int length, bool capture, int x, int y);
    Move(int length, bool capture, int x, int y, int z);
    ~Move();

    Move(const Move &other) {
        length = other.length;
        capture = other.capture;
        x = other.x;
        y = other.y;
        z = other.z;
    }

    Move(const Move &&other) {
        length = other.length;
        capture = other.capture;
        x = other.x;
        y = other.y;
        z = other.z;
    }

    Move& operator=(const Move &other) {
        length = other.length;
        capture = other.capture;
        x = other.x;
        y = other.y;
        z = other.z;
        return *this;
    }

    Move& operator=(const Move &&other) {
        length = other.length;
        capture = other.capture;
        x = other.x;
        y = other.y;
        z = other.z;
        return *this;
    }

    bool operator==(const Move &other) const {
        return x == other.x &&
            y == other.y &&
            z == other.z &&
            length == other.length &&
            capture == other.capture;
    }

    std::string toString() const;
    std::string toJson() const;
    static Move getMove(const std::string &move);
    static int getIdx(int x, int y);
};
