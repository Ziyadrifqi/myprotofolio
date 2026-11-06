const nodemailer = require("nodemailer");

function createTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true untuk port 465, false untuk port lain (misal 587)
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Mengirimkan email notifikasi ke admin saat ada pesan baru dari form kontak
 */
async function sendNewMessageNotification({ name, email, message }) {
  const transporter = createTransporter();
  if (!transporter) {
    console.warn("SMTP_USER atau SMTP_PASS belum dikonfigurasi di .env. Notifikasi email dilewati.");
    return false;
  }

  const recipient = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER;

  const mailOptions = {
    from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
    to: recipient,
    replyTo: email,
    subject: `[Portfolio] Pesan Baru dari ${name}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
        <h2 style="color: #111827; margin-bottom: 16px; border-bottom: 2px solid #6366f1; padding-bottom: 8px;">Pesan Baru Masuk</h2>
        <p style="color: #4b5563; font-size: 15px; margin-bottom: 20px;">Seseorang telah mengirimkan pesan melalui form kontak portofolio Anda:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; width: 100px; font-weight: 600;">Nama:</td>
            <td style="padding: 8px 0; color: #111827;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Email:</td>
            <td style="padding: 8px 0; color: #111827;"><a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a></td>
          </tr>
        </table>

        <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #6366f1; margin-bottom: 24px;">
          <h4 style="margin-top: 0; margin-bottom: 8px; color: #374151;">Isi Pesan:</h4>
          <p style="white-space: pre-line; color: #1f2937; margin: 0; line-height: 1.6;">${message}</p>
        </div>

        <p style="font-size: 13px; color: #9ca3af; margin-top: 32px; border-top: 1px solid #f3f4f6; padding-top: 12px;">
          Anda dapat langsung membalas email ini untuk merespons <b>${name}</b> (<a href="mailto:${email}">${email}</a>).
        </p>
      </div>
    `,
    text: `Pesan baru dari ${name} (${email}):\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Gagal mengirim email notifikasi:", error);
    return false;
  }
}

module.exports = {
  sendNewMessageNotification,
};

