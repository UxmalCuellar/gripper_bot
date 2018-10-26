#include <iostream>
#include <fstream>
#include <string>
#include <map>
#include <cstring>
#include <algorithm>
#include <sstream>

using namespace std;

int main() {
    map<int, string> actions;
    string rawFile;
    string moveCell;
    string parsed;
    string word;
    string unsatisfiable;
    string comma;
    string space;
    string temp;
    string string1;
    bool solution_found;
    string exitMsg;

    char chars[] = "(),";
    comma = ',';
    space = ' ';
    unsatisfiable = "UNKNOWN";
    moveCell = "moveCellCell";
    rawFile = "out.inp";
    parsed = "parsed.txt";
    solution_found = true;
    exitMsg = "Parser: Parsing completed.";
    //create and open 2 files for reading and writing
    ifstream fin;
    ofstream fout;

    fin.open(rawFile);

    // error handling
    if (fin.fail()) {
        cout << "Parser: Failed to open " << rawFile << ".\n";
        exit(1);
    }
    fout.open(parsed);
    if (fout.fail()) {
        cout << "Parser: Failed to open " << parsed << ".\n";
        exit(1);
    }
// reads inp file and extracts data from lines with 'moveCellCell' function
// and writes to file after formatting string
    size_t pos;
    int key;
    if (fin.is_open() && fout.is_open()) {
        while(fin >> word) {
            if (word.compare(unsatisfiable) == 0) {
                exitMsg = "Parser: Solution Not Found";
                solution_found = false;
                fout << "";
                break;
            } else {
            if (word.compare(0, 12, moveCell) == 0) {
                temp = word.erase(0, 12);
                //find first comma
                pos = temp.find(comma);
                // get key from string
                key = stoi(temp.substr(1, pos));
                //erase step(key) from string
                string1 = temp.substr(pos);
                // remove all commas and brackets
                for (int i = 0; i < strlen(chars); ++i) {
                    string1.erase(remove(string1.begin(), string1.end(), chars[i]), string1.end());
                }
                // add commas and spaces
                string1.insert(0,space);
                string1.insert(3,space);
                // insert into map actions
                actions.insert(pair<int, string>(key, string1));
            }
          }
        }
        //print to file
        if (solution_found) {
          for (int j = 0; j < actions.size(); ++j) {
            fout << actions.at(j);
          }
        }
        fin.close();
        fout.close();
    }
    cout << exitMsg << endl;
    return 0;
}
