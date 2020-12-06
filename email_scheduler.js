const nodemailer = require('nodemailer')

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

const sender = async (transporter) => {
    // change to 20,160 minutes to comply with srs
    let users =  await pool.query(
        `SELECT MAX(login_date),user_id,email 
        FROM public.login_log NATURAL INNER JOIN users group by user_id, email
        having MAX(login_date) <= NOW() - interval '5 minutes';`
    );
    

    for (var i = 0; i < users.rows.length; i++){
        mailOptions={
            from: 'capstonehelix@gmail.com',
            to : users.rows[i].email,
            subject : "Recuerda seguir Tu Camino Empresarial",
            html : `<img src="cid:test"> <br> Llevas tiempo sin seguir tu camino empresarial. Recuerda visitarnos para que asi tu empresa pueda seguir creciendo.<br>`,
            attachments: [{
                filename: 'colmena.png',
                path: 'routes/colmena.png',
                cid: 'test' //same cid value as in the html img src
            }]
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

}

sender(transporter);