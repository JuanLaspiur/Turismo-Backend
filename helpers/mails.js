const nodemailer = require('nodemailer');

// Configuración del transportador
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: true, // Usa TLS/SSL
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

/**
 * Envía un correo electrónico de recuperación de contraseña.
 * @param {string} email - La dirección de correo electrónico del destinatario.
 * @param {string} token - El código de recuperación.
 */
const sendRecoveryEmail = async (email, token) => {
  const mailOptions = {
    from: 'no-reply@yourdomain.com', // Cambia esto por tu dirección de correo
    to: email,
    subject: 'Password Recovery Code',
    text: `Your password recovery code is: ${token}. This code will expire in 15 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending recovery email:', error);
    throw new Error('Error sending recovery email');
  }
};

module.exports = {
  transporter,
  sendRecoveryEmail,
};
