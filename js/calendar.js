class Calendar{
    lang = 'en';
    strings ={};
    timeT = new TimeT();
    solstice = 93744000; /*21-12-1972 1608508800; 21-12-2020 1608508800000*/
    seconds = 0;
    days = 0;
    quad = 0;
    trino = 0;
    epoch = 0;
    year = 0;
    dayOfYear = 0;
    month = 0;
    monthL = 28;
    weekOfYear = 0;
    evalDay(){
        /*Elapsed seconds*/
        this.seconds = this.timeT.now()-this.solstice;
        /*this.seconds = this.test - this.solstice; */
        /*Elapsed days & current day*/
        this.days = Math.ceil(this.seconds/86400);
        /*Elapsed quadrennials*/
        this.quad = this.days!==0?Math.ceil(this.days / 1461)-1:0;
        /*Elapsed days in the current quadrennial & current day*/
        this.trino = this.days !== 0 ?this.days-(1461 * (this.quad)):1;
        /*Elapsed years in the current quadrennial & current Day*/
        this.epoch = this.trino<1096?Math.ceil(this.trino/365):4;
        /*Elapsed days in the current year & current day*/
        this.dayOfYear = this.trino-((this.epoch-1)*365);
        /*Elapsed years **first year is 0 */
        this.year = ((this.quad*4)+(this.epoch -1));
        this.month = Math.ceil(this.dayOfYear/28);
        this.dayOfMonth = this.dayOfYear % 28 === 0 ? 28 : this.dayOfYear % 28;
        this.week = Math.ceil(this.dayOfYear/7);
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
        this.showDay();
        this.showMonth();
    }
    showDay(){
        let app = document.getElementById('app');
        this.evalDay();
        //Testing
        console.info("Now: " + this.timeT.now() + " Seconds: " + this.seconds + " Days: " + this.days + " Year: " + this.year + " Quatter: " + this.quad + " Trino: " + this.trino + " Epoch: " + this.epoch + " Day of the Year: " + this.dayOfYear + " Number of month: " + this.month +" Day of month: "+this.dayOfMonth);
        //-
        let todayPage = document.createElement('div');
        todayPage.setAttribute('id','today-page');
        todayPage.setAttribute('class', 'today-page');
        const months = this.strings[this.lang].months;
        todayPage.innerHTML = "<span class='month-label'>" + months[this.month]+"</span><span class='today-number'>"+this.dayOfMonth+"</span><span class='year-number'>"+this.year+"</span>";
        app.append(todayPage);
    }
    showMonth(){
        let app = document.getElementById('app');
        let monthPage = document.createElement('div');
        monthPage.setAttribute('id','month-page');
        monthPage.setAttribute('class', 'month-page');
        const months = this.strings[this.lang].months;
        monthPage.innerHTML = "<span class='month-label'>" + months[this.month] + "</span>";
        let daysTable = document.createElement('div');
        daysTable.setAttribute('class', 'days-table');
        let monthDays = 0;
        if(this.month<14){
            monthDays = this.monthL;
        } else {
            monthDays = 2;
        }
        for (let i = 1; i <=monthDays;i++){
            if(i%7==1){
                let weekN = Math.ceil(i/7)+((this.month-1)*4);
                let weekCell = document.createElement('div');
                weekCell.setAttribute('class', 'weekC');
                weekCell.innerHTML = "<span>" + "W" + weekN+"</span>";
                daysTable.append(weekCell);
            }
            let dayCell = document.createElement('div');
            dayCell.setAttribute('id', 'dayC'+i);
            i == this.dayOfMonth ? dayCell.setAttribute('class', 'dayC today') : dayCell.setAttribute('class', 'dayC');
            dayCell.innerHTML = "<span>"+i+"</span>";
            daysTable.append(dayCell);
        }
        monthPage.append(daysTable);
        app.append(monthPage);
    }
}
window.onload = function(){
    console.info("window onload");
    let calendar = new Calendar;
    calendar.start();
};