"use strict";
const request = require('prompt-sync')();
class Puzzle {
    constructor(input = []) {
        this._input = [];
        this._checkRepeat = () => {
            let hasRepeat = false;
            const condition = this._part.length;
            for (let i = 0; i < condition; i++) {
                for (let index = i + 1; index < condition; index++) {
                    const leftRepeat = this._part[i][0].left === this._part[index][0].left;
                    const rightRepeat = this._part[i][0].right === this._part[index][0].right;
                    if (leftRepeat || rightRepeat) {
                        hasRepeat = true;
                        break;
                    }
                }
            }
            return hasRepeat;
        };
        this._input = input;
        this._part = [];
    }
    setInput(input) {
        this._input = input;
    }
    getWord() {
        if (this._input.length > 0) {
            this._structure();
            this._reqCheck();
            this._order();
            return this._decode().toUpperCase();
        }
        else {
            console.log("You need to insert an array in the function constructor or through the setInput() class method.");
            return "";
        }
    }
    _decode() {
        let word = "";
        this._part.map(char => word += char[0].letter);
        return word;
    }
    _order() {
        let copyPieces = [...this._part];
        let i = 0;
        this._part = [];
        copyPieces.forEach(pience => {
            if (pience[0].left === 0) {
                this._part.push([pience[0]]);
            }
        });
        do {
            i++;
            copyPieces.forEach(p => {
                if (this._part[this._part.length - 1][0].right === p[0].left) {
                    this._part.push([p[0]]);
                }
            });
        } while (this._part.length > i);
        return this._part;
    }
    _checkMatch() {
        let left = [], right = [];
        this._part.forEach((piece, i) => {
            left.push(piece[0].left);
            right.push(piece[0].right);
        });
        left.sort((a, b) => a - b).splice(0, 1);
        right.sort((a, b) => a - b).splice(0, 1);
        return left.filter((number, i) => number === right[i]).length === left.length;
    }
    _check01() {
        let has0 = false, has1 = false, has0right = false, has1left = false;
        this._part.forEach(piece => {
            switch (piece[0].left) {
                case 0: {
                    has0 = true;
                    break;
                }
                case 1: {
                    has1left = true;
                    break;
                }
            }
            switch (piece[0].right) {
                case 1: {
                    has1 = true;
                    break;
                }
                case 0: {
                    has0right = true;
                    break;
                }
            }
        });
        return has0 && !has0right && has1 && !has1left ? true : false;
    }
    _reqCheck() {
        let allCheck = false;
        const check01 = this._check01();
        if (check01) {
            const repeatPieces = this._checkRepeat();
            if (!repeatPieces) {
                const matchPieces = this._checkMatch();
                if (matchPieces)
                    allCheck = true;
                else
                    console.log("error: You have inserted tiles with a right/left side number that does not match that of any other tile.");
            }
            else
                console.log("error: Puzzle pieces cannot contain repeating numbers on the same side");
        }
        else {
            console.log("error: Every puzzle must have a piece with the number 0 on the left and another piece with the number 1 on the right.");
        }
        return allCheck;
    }
    _structure() {
        for (let i = 0; i < this._input.length; i++) {
            this._part.push([{
                    left: parseInt(this._input[i][0]),
                    letter: this._input[i][1][0],
                    right: parseInt(this._input[i][2])
                }]);
        }
        return this._part;
    }
}
const teste = [[12, 'Dxxxxxxxxxx', 9], [302, 'Ossssssss', 12], [0, 'Fssssssssss', 302], [9, 'Asssssssssssss', 1]];
const puzzle = new Puzzle();
puzzle.setInput(teste);
console.log(puzzle.getWord());
// const pieces : parts[][] = part();
// console.log(pieces)
