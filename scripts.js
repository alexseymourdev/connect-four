objConnectFour = {
    blnRed:true,
    init:function(){
        this.getAllSlots();
        this.addEventListeners();
    },
    getAllSlots:function(){
        this.arrSlots = document.querySelectorAll('.checker');
        console.log(this.arrSlots);
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
            this.blnRed = false;
        } else {
            currentItem.classList.add('yellow');
            this.blnRed = true;
        }
    }
}
objConnectFour.init();