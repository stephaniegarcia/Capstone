const nodemailer = require('nodemailer')
const cron = require('node-cron');
const shell = require('shelljs');


cron.schedule("* * * * *", () => {
    console.log("scheduler");
    if(shell.exec("dir").code !== 0){
        console.log("wrong");
    }
})