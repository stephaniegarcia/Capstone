const nodemailer = require('nodemailer')
const cron = require('node-cron');

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
cron.schedule("*/5 * * * *", async () => {
    console.log("scheduler");
    let users =  await pool.query(
        `SELECT MAX(login_date),user_id,email 
        FROM public.login_log NATURAL INNER JOIN users group by user_id, email
        having MAX(login_date) <= NOW() - interval '5 minutes';`
    );
    
    console.log(users.rows)

    for (var i = 0; i < users.rows.length; i++){
        mailOptions={
            from: 'capstonehelix@gmail.com',
            to : users.rows[i].email,
            subject : "Recuerda seguir Tu Camino Empresarial",
            html : "<br> Llevas tiempo sin seguir tu camino empresarial. Recuerda visitarnos para que asi tu empresa pueda seguir creciendo.<br>"
        }
        transporter.sendMail(mailOptions, (error, response) => {
            if(error){
                console.log(error);
                res.status(400).send("error");
            }
            else{
                console.log("Message sent: ");
                res.status(200).send("sent");
            }
        });
    } 
  
});