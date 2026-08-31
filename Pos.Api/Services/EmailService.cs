using System.Net;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using Pos.Api.Config;
using Pos.Api.Data;
using Pos.Api.Entities;

namespace Pos.Api.Services;

public class EmailService(IOptions<EmailConfig> emailConfig, AppDbContext dbContext) : IEmailSender
{
    private readonly EmailConfig _emailConfig = emailConfig.Value;
    private readonly AppDbContext _dbContext = dbContext;

    public async Task SendEmailAsync(string toEmail, string toName, string subject, string message, AttachmentCollection? attachments = null)
    {
        List<MailboxAddress> emails = [new MailboxAddress(toName, toEmail)];
        await SendAsync(emails, subject, message, attachments);
    }

    private async Task SendAsync(List<MailboxAddress> emails, string subject, string message, AttachmentCollection? attachments = null)
    {
        if (string.IsNullOrEmpty(_emailConfig.Email))
        {
            throw new Exception("Email is empty in config");
        }
        if (string.IsNullOrEmpty(_emailConfig.Host))
        {
            throw new Exception("Email host is empty in config");
        }
        if (string.IsNullOrEmpty(_emailConfig.Password))
        {
            throw new Exception("Email password is empty in config");
        }

        var email = string.Join(";", emails.Select(x => x.Address));

        var log = await _dbContext.EmailLog.AddAsync(
            new EmailLog
            {
                Email = email,
                Subject = subject,
                Message = message,
            }
        );

        var mail = new MimeMessage();
        mail.From.Add(new MailboxAddress(_emailConfig.Name, _emailConfig.Email));
        mail.To.AddRange(emails);
        mail.Subject = subject;

        var builder = new BodyBuilder { TextBody = message };

        if (attachments != null)
        {
            foreach (var attachment in attachments)
            {
                builder.Attachments.Add(attachment);
            }
        }

        mail.Body = builder.ToMessageBody();

        using var client = new SmtpClient();

        client.Connect(_emailConfig.Host, _emailConfig.Port, SecureSocketOptions.StartTls);

        // Note: only needed if the SMTP server requires authentication
        client.Authenticate(_emailConfig.Email, _emailConfig.Password);

        client.Send(mail);
        client.Disconnect(true);

        log.Entity.IsSent = true;
        await _dbContext.SaveChangesAsync();
    }
}
