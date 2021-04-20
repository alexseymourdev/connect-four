let objConnectFour = {
    blnRed:true,
    blnWinner:false,
    blnBack:false,
    currentMove:-1,
    arrHistory:[],
    arrWinners:[
        //vertical wins
        [0, 1, 2, 3],
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [6, 7, 8, 9],
        [7, 8, 9, 10],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [13, 14, 15, 16],
        [14, 15, 16, 17],
        [18, 19, 20, 21],
        [19, 20, 21, 22],
        [20, 21, 22, 23],
        [24, 25, 26, 27],
        [25, 26, 27, 28],
        [26, 27, 28, 29],
        [30, 31, 32, 33],
        [31, 32, 33, 34],
        [32, 33, 34, 35],
        [36, 37, 38, 39],
        [37, 38, 39, 40],
        [38, 39, 40, 41],
        //horizontal wins
        [0,6,12,18],
        [6,12,18,24],
        [12,18,24,30],
        [18,24,30,36],
        [1,7,13,19],
        [7,13,19,25],
        [13,19,25,31],
        [19,25,31,37],
        [2,8,14,20],
        [8,14,20,26],
        [14,20,26,32],
        [20,26,32,38],
        [3,9,15,21],
        [9,15,21,27],
        [15,21,27,33],
        [21,27,33,39],
        [4,10,16,22],
        [10,16,22,28],
        [16,22,28,34],
        [22,28,34,40],
        [5,11,17,23],
        [11,17,23,29],
        [17,23,29,35],
        [23,29,35,41],
        //diaganol top left to bottom right
        [0,7,14,21],
        [1,8,15,22],
        [2,9,16,23],
        [6,13,20,27],
        [7,14,21,28],
        [8,15,22,29],
        [12,19,26,33],
        [13,20,27,34],
        [14,21,28,35],
        [18,25,32,39],
        [19,26,33,40],
        [20,27,34,41],
        //diaganol bottom left to top right
        [3,8,13,18],
        [4,9,14,19],
        [5,10,15,20],
        [9,14,19,24],
        [10,15,20,25],
        [11,16,21,26],
        [15,20,25,30],
        [16,21,26,31],
        [17,22,27,32],
        [21,26,31,36],
        [22,27,32,37],
        [23,28,33,38],
    ],
    arrColumnKeys:[
        [5,4,3,2,1,0],
        [11,10,9,8,7,6],
        [17,16,15,14,13,12],
        [23,22,21,20,19,18],
        [29,28,27,26,25,24],
        [35,34,33,32,31,30],
        [41,40,39,38,37,36],
    ],
    init:function(){
        this.getAllElements();
        this.addEventListeners();
    },
    getAllElements:function(){
        this.arrSlots = document.querySelectorAll('.checker');
        this.arrColumns = document.querySelectorAll('.column');
        this.objPlayer = document.querySelector('.current_player .player');
        this.objReset = document.querySelector('.reset');
        this.objBack = document.querySelector('.back');
        // console.log(this.arrSlots);
        // console.log(this.objPlayer);
    },
    addEventListeners:function(){
        _self = this;
        for(counter = 0; counter < this.arrColumns.length; counter++){
            objColumn = this.arrColumns[counter];
            objColumn.addEventListener("click", function(event){
                let key = this.getAttribute('data-column');
                let currentColumn = _self.arrColumnKeys[key];
                for(slotCounter=0;slotCounter < currentColumn.length; slotCounter++){
                    currentItem = _self.arrSlots[currentColumn[slotCounter]];
                    if(currentItem.classList.contains('yellow')){
                        continue;
                    }
                    if(currentItem.classList.contains('red')){
                        continue;
                    }
                    if(!_self.blnWinner){
                        _self.processSlot(currentItem);
                        break;
                    }
                }
            });
            objColumn.addEventListener("mouseover", function(event){
                let key = this.getAttribute('data-column');
                let currentColumn = _self.arrColumnKeys[key];
                for(slotCounter=0;slotCounter < currentColumn.length; slotCounter++){
                    currentItem = _self.arrSlots[currentColumn[slotCounter]];
                    if(currentItem.classList.contains('yellow')){
                        continue;
                    }
                    if(currentItem.classList.contains('red')){
                        continue;
                    }
                    if(!_self.blnWinner){
                        _self.highlightSlot(currentItem);
                        break;
                    }
                }
            });
            objColumn.addEventListener("mouseleave", function(event){
                _self.clearHighlight();
            });
        }
        this.objReset.addEventListener("click",function(){
            _self.reset();
        });
        this.objBack.addEventListener("click",function(){
            let lastMove = _self.currentMove - 1;
            _self.processHistory(_self.arrHistory[lastMove]);
            _self.currentMove = lastMove;
        });
    },
    reset(){
        _self.arrRed = [];
        _self.arrYellow = [];
        for(counter = 0; counter < _self.arrSlots.length; counter++){
            objSlot = _self.arrSlots[counter];
            objSlot.classList.remove('red');
            objSlot.classList.remove('yellow');
            objSlot.classList.remove('redHighlight');
            objSlot.classList.remove('yellowHighlight');
            let parent = objSlot.parentNode;
            parent.classList.remove('green');
            _self.objPlayer.classList.remove('yellow');
            _self.objPlayer.classList.add('red');
            _self.objPlayer.innerHTML = 'Red to play first';
            _self.blnWinner = false;
        }
    },
    processHistory(objBoard){
        // console.log(objBoard);
        this.reset();
        for(counter = 0; counter < this.arrSlots.length; counter++){
            if(objBoard.arrRed.includes(counter)){
                // console.log(counter);
                this.arrSlots[counter].classList.add('red');
            }
            if(objBoard.arrYellow.includes(counter)){
                // console.log(counter);
                this.arrSlots[counter].classList.add('yellow');
            }
        }
        this.processPlayer();
        this.blnBack = true;
    },
    processSlot:function(currentItem){
        // console.log(currentItem);
        // console.log(counter);
        this.clearHighlight();
        if(this.blnRed){
            currentItem.classList.add('red');
            this.processPlayer();
        } else {
            currentItem.classList.add('yellow');
            this.processPlayer();
        }
        this.hasWinner();
    },
    processPlayer:function(){
        if(this.blnRed){
            this.objPlayer.classList.add('yellow');
            this.objPlayer.classList.remove('red');
            this.objPlayer.innerHTML = 'Yellow to play next';
            this.blnRed = false;
        } else {
            this.objPlayer.classList.add('red');
            this.objPlayer.classList.remove('yellow');
            this.objPlayer.innerHTML = 'Red to play next';
            this.blnRed = true;
        }
    },
    highlightSlot:function(currentItem){
        // console.log(currentItem);
        this.clearHighlight();
        if(this.blnRed){
            currentItem.classList.add('redHighlight');
        } else {
            currentItem.classList.add('yellowHighlight');
        }
    },
    clearHighlight:function(){
        let objRedHighlightedSquare = document.querySelector('.redHighlight');
        // console.log(objRedHighlightedSquare);
        if(objRedHighlightedSquare){
            objRedHighlightedSquare.classList.remove('redHighlight');
        }
        let objYellowHighlightedSquare = document.querySelector('.yellowHighlight');
        if(objYellowHighlightedSquare){
            objYellowHighlightedSquare.classList.remove('yellowHighlight');
        }
    },
    hasWinner:function(){
        arrYellow = [];
        arrRed = [];
        for(counter = 0; counter < this.arrSlots.length; counter++){
            // console.log(arrNumbers[counter]);
            currentItem = this.arrSlots[counter];
            if(currentItem.classList.contains('yellow')){
                arrYellow.push(counter);
            }
            if(currentItem.classList.contains('red')){
                arrRed.push(counter);
            }
        }
        if(this.blnBack){
            let arrHistory = [];
            for(counter=0; counter <= this.currentMove; counter++){
                console.log(this.arrHistory[counter]);
                arrHistory.push(this.arrHistory[counter]);
            }
            this.arrHistory[this.currentMove] = {
                'arrRed':arrRed,
                'arrYellow':arrYellow,
            };
            console.log(arrHistory);
            this.arrHistory = arrHistory;
            this.currentMove++;
            this.blnBack = false;
        } else {
            this.arrHistory.push({
                'arrRed':arrRed,
                'arrYellow':arrYellow,
            });
            this.currentMove++;
        }
        console.log(this.arrHistory);
        console.log(this.currentMove);
        // console.log(arrRed);
        // console.log(arrYellow);
        for(counter=0; counter < this.arrWinners.length; counter++){
            let arrWinner = this.arrWinners[counter];
            if(this.checker(arrRed,arrWinner)){
                this.highlightWinner(arrWinner);
                this.blnWinner = true;
                this.objPlayer.innerHTML = 'Red WINS!'
                this.objPlayer.classList.add('red');
                this.objPlayer.classList.remove('yellow');
                return;
            }
            if(this.checker(arrYellow,arrWinner)){
                this.highlightWinner(arrWinner);
                this.blnWinner = true;
                this.objPlayer.innerHTML = 'Yellow WINS!'
                this.objPlayer.classList.add('yellow');
                this.objPlayer.classList.remove('red');
                return;
            }
        }
    },
    checker:function(arr, target){
        winner = target.every(v => arr.includes(v));
        return winner;
    },
    highlightWinner:function(arrWinners){
        console.log('winner');
        // console.log(arrWinners);
        for(counter=0; counter < arrWinners.length; counter++){
            key = arrWinners[counter];
            let parent = this.arrSlots[key].parentNode;
            parent.classList.add('green');
        }
    }
}
objConnectFour.init();