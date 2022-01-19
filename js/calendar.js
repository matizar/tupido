class Calendar{
    lang = 'en';
    strings ={};
    timeT = new TimeT();
    solstice = 346222800; /*1608508800; 21-12*2020 1608508800000*/
    seconds = 0;
    days = 0;
    quad = 0;
    figure = 0;
    epoch = 0;
    years = 0;
    dayOfYear = 0;
    month = 0;
    evalDay(){
        this.seconds = this.timeT.now()-this.solstice;
        /*this.seconds = 1608508800-this.solstice; */
        this.days = Math.floor(this.seconds/86400);
        this.quad = Math.floor(this.days / 1461);
        this.figure = this.days-(1461 * (this.quad));
        this.epoch = Math.floor(this.figure/365);
        this.dayOfYear = this.figure-(this.epoch*365)
        console.log(this.epoch);
        this.years = (this.quad*4)+this.epoch;
        /*this.years = Math.floor(this.days/1461);*/
        this.month = Math.ceil(this.dayOfYear/28);
        this.dayOfMonth = this.dayOfYear % 28 == 0 ? 28 : this.dayOfYear % 28;
    }
    start(){
        this.loadStrings('./js/strings.json', (text) => { 
            this.strings = JSON.parse(text);
            this.showCalendar();
        });
    }
    loadStrings(file, callback) {
        let rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }
    showCalendar(){   
        let app = document.getElementById('app');
        this.evalDay();
        console.info("Now: "+this.timeT.now()+" Seconds: "+this.seconds+" Days: "+this.days+" Years: "+this.years+" Quatter: "+this.quad+" Figure: "+this.figure+" Epoch: "+this.epoch+" Days of Year: "+this.dayOfYear);
        let todayPage = document.createElement('div');
        todayPage.setAttribute('id','today-page');
        todayPage.setAttribute('class', 'today-page');
        const months = this.strings[this.lang].months;
        todayPage.innerHTML = "<span class='month-label'>" + months[this.month]+"</span><span class='today-number'>"+this.dayOfMonth+"</span><span class='year-number'>"+this.years+"</span>";
        app.append(todayPage);
    }
}
window.onload = function(){
    console.info("window onload");
    let calendar = new Calendar;
    calendar.start();
};