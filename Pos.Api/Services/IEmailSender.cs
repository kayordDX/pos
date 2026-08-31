using MimeKit;

namespace Pos.Api.Services;

public interface IEmailSender
{
    Task SendEmailAsync(string toEmail, string toName, string subject, string message, AttachmentCollection? attachments = null);
}
