objConnectFour = {
    blnRed:true,
    init:function(){
        this.getAllElements();
        this.addEventListeners();
    },
    getAllElements:function(){
        this.arrSlots = document.querySelectorAll('.checker');
        this.objPlayer = document.querySelector('.current_player .player');
        console.log(this.arrSlots);
        console.log(this.objPlayer);
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
        console.log(currentItem);
        console.log(this);
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
            this.blnRed = false;
        } else {
            currentItem.classList.add('yellow');
            this.objPlayer.classList.add('red');
            this.objPlayer.classList.remove('yellow');
            this.objPlayer.innerHTML = 'Red to play next';
            this.blnRed = true;
        }
    }
}
objConnectFour.init();