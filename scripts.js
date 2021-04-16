objConnectFour = {
    blnRed:true,
    arrWinners:[
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
    ],
    init:function(){
        this.getAllElements();
        this.addEventListeners();
    },
    getAllElements:function(){
        this.arrSlots = document.querySelectorAll('.checker');
        this.objPlayer = document.querySelector('.current_player .player');
        // console.log(this.arrSlots);
        // console.log(this.objPlayer);
    },
    addEventListeners:function(){
        _self = this;
        for(counter = 0; counter < this.arrSlots.length; counter++){
            // console.log(arrNumbers[counter]);
            objSlot = this.arrSlots[counter];
            objSlot.addEventListener("click", function(event){
                currentItem = event.target;
                _self.processSlot(currentItem);
            });
        }
    },
    processSlot(currentItem){
        // console.log(currentItem);
        // console.log(counter);
        if(currentItem.classList.contains('yellow')){
            console.log('this slot is already yellow');
            return;
        }
        if(currentItem.classList.contains('red')){
            console.log('this slot is already red');
            return;
        }
        if(this.blnRed){
            currentItem.classList.add('red');
            this.objPlayer.classList.add('yellow');
            this.objPlayer.classList.remove('red');
            this.objPlayer.innerHTML = 'Yellow to play next';
            // this.blnRed = false;
        } else {
            currentItem.classList.add('yellow');
            this.objPlayer.classList.add('red');
            this.objPlayer.classList.remove('yellow');
            this.objPlayer.innerHTML = 'Red to play next';
            this.blnRed = true;
        }
        this.hasWinner();
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
        // console.log(arrRed);
        // console.log(arrYellow);
        for(counter=0; counter < this.arrWinners.length; counter++){
            let arrWinner = this.arrWinners[counter];
            if(this.checker(arrRed,arrWinner)){
                this.highlightWinner(arrRed);
            }
            if(this.checker(arrYellow,arrWinner)){
                this.highlightWinner(arrYellow);
            }
        }
    },
    checker:function(arr, target){
        winner = target.every(v => arr.includes(v));
        return winner;
    },
    highlightWinner:function(){
        console.log('winner');
    }
}
objConnectFour.init();