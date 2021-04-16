objConnectFour = {
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
    }
}
objConnectFour.init();