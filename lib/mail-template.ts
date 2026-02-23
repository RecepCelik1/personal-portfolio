interface ContactForm {
    name:string,
    surname:string,
    email:string,
    subject:string,
    message: string
}

export function getMailTemplate(data: ContactForm) {
   return `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
      <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">Yeni İletişim Formu Mesajı</h2>
      
      <p><strong>Gönderen:</strong> ${data.name} ${data.surname}</p>
      <p><strong>E-posta:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      <p><strong>Konu:</strong> ${data.subject}</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <h4 style="margin-top: 0;">Mesaj:</h4>
        <p style="white-space: pre-wrap; line-height: 1.6; color: #555;">${data.message}</p>
      </div>
      
      <footer style="margin-top: 20px; font-size: 12px; color: #999; text-align: center;">
        Bu e-posta web sitenizdeki iletişim formu aracılığıyla gönderilmiştir.
      </footer>
    </div>
`;
}