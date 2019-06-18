const moment=require("moment");
const dates=new Date("04/19/2019 00:00:00 AM -7:00").toUTCString();
const dates1=new Date("04/01/2019 10:22:00 PM -7:00").toUTCString();
console.log("Date",dates)
console.log("Date1",dates1)
const todaydate=moment.utc(dates);
const todaydate1=moment.utc(dates1);
console.log("MomentDate",todaydate.toISOString());
console.log("MomentDate1",todaydate1.toISOString());
