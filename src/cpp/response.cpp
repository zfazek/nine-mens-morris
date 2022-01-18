#include <iostream>
#include "cgicc/Cgicc.h"
#include "cgicc/HTTPPlainHeader.h"
#include "cgicc/HTMLClasses.h"
#include "rapidjson/document.h"
#include "mill.h"
#include "move.h"
#include "table.h"

using namespace std;
using namespace cgicc;

int main(int argc, char **argv) {
    string input;
    int table[24];
    int white_hand = 9;
    int black_hand = 9;
    bool white_to_move = true;
    if (argc == 2) {
        input = "{\"table\":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"
            "\"white_hand\":9,\"black_hand\":9,\"white_to_move\":true}";
    } else {
        Cgicc cgi;
        cout << HTTPPlainHeader();
        form_iterator it_pos = cgi.getElement("position");
        if (it_pos != cgi.getElements().end()) {
            input = cgi("position");
        }
    }
    rapidjson::Document d;
    d.Parse(input.c_str());
    if (d.IsObject() &&
            d.HasMember("table") &&
            d["table"].IsArray() &&
            d["table"].Size() == 24 &&
            d.HasMember("white_hand") &&
            d["white_hand"].IsInt() &&
            d.HasMember("black_hand") &&
            d["black_hand"].IsInt() &&
            d.HasMember("white_to_move") &&
            d["white_to_move"].IsBool()) {
        for (size_t i = 0; i < d["table"].Size(); i++) {
            const rapidjson::Value& field = d["table"][i];
            if (field.IsInt()) {
                table[i] = field.GetInt();
            } else {
                return 0;
            }
        }
        white_hand = d["white_hand"].GetInt();
        black_hand = d["black_hand"].GetInt();
        white_to_move = d["white_to_move"].GetBool();
    } else {
        return 0;
    }
    Mill mill;
    mill.table->setPos(table, white_hand, black_hand, white_to_move);
    mill.n = 500;
    mill.setBestMoveMCTS();
    string bestMove = mill.bestMoveStr;

    cout << bestMove << endl;
    return 0;
}
