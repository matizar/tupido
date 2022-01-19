class Calendar{
    timeT = new TimeT();
    solstice = 1608508800; /*21-12*2020 1608508800000*/
    seconds = 0;
    days = 0;
    years = 0;
    evalDay(){
        this.seconds = this.timeT.now()-this.solstice;
        this.days = Math.floor(this.seconds/86400);
        this.years = Math.floor(this.days/365.25);
    }
    showCalendar(){
        let app = document.getElementById('app');
        this.evalDay();
        app.innerHTML = "Now: "+this.timeT.now()+"<br> Seconds:"+this.seconds+"<br> Days:"+this.days+"<br>Years: "+this.years;
    }
}
window.onload = function(){
    console.info("window onload");
    let calendar = new Calendar;
    calendar.showCalendar();
};