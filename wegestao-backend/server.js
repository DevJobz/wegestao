const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Middleware para permitir CORS
app.use(cors());
app.use(express.json());

// Configuração do Nodemailer (Yahoo)
const transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
        user: 'lucasjobstraibizer@yahoo.com', // Seu e-mail do Yahoo
        pass: 'toozbvdykekmjyzb', // Sua senha de app do Yahoo
    },
});

// Rota para enviar o e-mail
app.post('/enviar', (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: 'lucasjobstraibizer@yahoo.com',
        to: 'lucasjobstraibizer@yahoo.com', // E-mail de destino
        subject: `Nova mensagem do site WeGestão: ${subject}`,
        text: `Nome: ${name}\nE-mail: ${email}\nMensagem: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erro ao enviar a mensagem.');
        } else {
            console.log('E-mail enviado: ' + info.response);
            res.status(200).send('Mensagem enviada com sucesso!');
        }
    });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
