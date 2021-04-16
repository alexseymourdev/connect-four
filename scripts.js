objConnectFour = {
    init:function(){
        this.getAllSlots();
    },
    getAllSlots:function(){
        this.objSlots = document.querySelectorAll('.checker');
        console.log(this.objSlots);
    }
}
objConnectFour.init();