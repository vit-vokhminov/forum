const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        // инициализирую почтовый клиент
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }
    // описываю email письмо
    async sendActivationMail(to, link) {
        // to email@mail.com
        // link http://localhost:5000/api/activate/fc8206e2-745a-4af2-8549-d56392b12fca
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html:
                `
                    <div>
                        <h2>Для активации перейдите по ссылке</h2>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }
}

module.exports = new MailService();
