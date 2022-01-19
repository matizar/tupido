class TimeT{
    now(){
        let now = new Date();
        return Math.floor(now.getTime()/1000);
    };
}