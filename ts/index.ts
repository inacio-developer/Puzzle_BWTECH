type parts = {
    left: number,
    letter: string,
    right: number,
}

class Puzzle {
    private _input : any[] = [];
    private _part : parts[][]

    constructor(input : any[] = []){
        this._input = input;
        this._part = [];  
    }
    
    // public methods

    public setPieces (input : any[])  : void {
        this._input = input;
    }

    public getWord () : string {
        if(this._input.length > 0){
        this._structure();
        this._reqCheck();
        this._order();
        return this._decode().toUpperCase();
    } else {
        console.log("You need to insert an array in the function constructor or through the setInput() class method.")
        return ""
    }
    }

    // private methods

    // method to form the word

    private _decode() : string{
        let word : string = "";

        this._part.map(char => word += char[0].letter)

        return word;
    }

   // ordering method

    private _order() : parts[][] {
        let copyPieces : parts[][] = [...this._part]; 
        let i = 0;
        this._part = [];
    
        copyPieces.forEach(pience => {
            if(pience[0].left === 0){
                this._part.push([pience[0]]); 
            }
        })
    
    
        do {
            i++
            copyPieces.forEach(p => {
                if(this._part[this._part.length - 1][0].right === p[0].left){
                    this._part.push([p[0]]); 
                } 
            })
        } while(this._part.length > i);

        return this._part
    }
    

    // checking methods

    private _checkMatch () : boolean {
        let left : number[] = [], right: number[] = [];

        this._part.forEach((piece, i) => {
            left.push(piece[0].left);
            right.push(piece[0].right)
        })
        

        left.sort((a: number, b: number) => a - b).splice(0, 1);
        right.sort((a: number, b: number) => a - b).splice(0, 1)

        return left.filter((number, i) => number === right[i]).length === left.length;
    }
    
    private  _checkRepeat = () : boolean => {
        let hasRepeat : boolean = false;
        const condition = this._part.length;

        for(let i = 0; i < condition; i++){
            for(let index = i + 1; index < condition; index++){
                const leftRepeat : boolean = this._part[i][0].left === this._part[index][0].left;
                const rightRepeat : boolean = this._part[i][0].right === this._part[index][0].right;

                if(leftRepeat || rightRepeat) {
                    hasRepeat = true;
                    break
                }
            }
        }
        return hasRepeat;
}

    private _check01 () : boolean {
        let has0 : boolean = false, has1 : boolean = false,  
        has0right : boolean = false , has1left : boolean = false;

        this._part.forEach(piece => {
            switch(piece[0].left){
                case 0 : {
                    has0 = true
                    break
                }
                case 1 : {
                    has1left = true
                    break
                }
            }

            switch(piece[0].right){
                case 1 : {
                    has1 = true
                    break
                }
                case 0 : {
                    has0right = true
                    break
                }
            }
        })

        return has0 && !has0right && has1 && !has1left? true:false;
    }

    private _reqCheck () : boolean {
        let allCheck : boolean = false;
        const check01 : boolean = this._check01();
    
        if(check01) {
            const repeatPieces : boolean = this._checkRepeat() 
            
            if(!repeatPieces) {
                const  matchPieces : boolean = this._checkMatch();

                if(matchPieces) allCheck = true;
                else console.log("error: You have inserted tiles with a right/left side number that does not match that of any other tile.");
            }
            else console.log("error: Puzzle pieces cannot contain repeating numbers on the same side")

    
        } else {
            console.log
            ("error: Every puzzle must have a piece with the number 0 on the left and another piece with the number 1 on the right.")
        }
    
        return allCheck
    }

    // Method of structuring received data

    private _structure() : parts[][] {
        for(let i = 0; i < this._input.length; i++){
            this._part.push([{
                left: parseInt(this._input[i][0]),
                letter: this._input[i][1][0],
                right: parseInt(this._input[i][2])            
            }])
        }
    
        return this._part;
    }
}