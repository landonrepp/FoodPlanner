let nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'foodplannererrors@gmail.com',
      pass: 'ea236c9e-e8da-4487-8774-2fc9f47c94a1'
    }
  });

function handleError(error){
    var mailOptions = {
        from: 'foodplannererrors@gmail.com',
        to: 'landonrepp@gmail.com',
        subject: 'food planner errors',
        text: ex
    };
    transporter.sendMail(mailOptions, function(err, info){
        if (err) {
          console.log(err);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

