import { Button } from '../components/button';
import { Divider } from '../components/divider';
import { Providers } from '../components/providers';
import { Paragraph, Title } from '../components/typography';

export const renderInvitationEmail = ({
  lang = 'en',
  invitedBy = '',
  invitedTo = '',
  url = ''
}: {
  lang?: string;
  invitedBy: string;
  invitedTo: string;
  url: string;
}): string => {
  return Providers({
    previewText: `Invitation to join ${invitedTo}`,
    lang,
    children: `
      ${Title({ children: `Invitation to join ${invitedTo}` })}
      
      ${Paragraph({
        children: `${invitedBy} has invited you to join ${invitedTo}. To accept the invitation, please click the button below.`
      })}
      
      ${Paragraph({
        children: `You need to create an account with your email address to accept the invitation.`
      })}
      
      ${Divider()}
      
      ${Button({ href: url, children: `Accept invitation` })}
      
      ${Paragraph({
        children: `If you do not wish to accept this invitation, you can safely ignore this email.`
      })}
    `
  });
};
