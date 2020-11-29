const nodemailer = require('nodemailer')
const cron = require('node-cron');
const shell = require('shelljs');

//Authentication with Database
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'colmena66@tucaminoempresarial2',
    host: 'tucaminoempresarial2.postgres.database.azure.com',
    database: 'capstone',
    password: '6rrz9afwZ1994!@',
    port: 5432
})

let transporter = nodemailer.createTransport({
    service: 'gmail',
 auth: {
        user: 'capstonehelix@gmail.com',
        pass: 'zybcev-reRfac-0vikpo'
    }
});


// 0 8 * * 1-7 daily cron
cron.schedule("*/1 * * * *", async () => {
    console.log("scheduler");
    let users = await await pool.query(
        `update admin_test set password = $1 where email = $2;`, [password, email]
    );
});