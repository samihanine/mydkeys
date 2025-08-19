import { Button } from '../components/button';
import { Divider } from '../components/divider';
import { Providers } from '../components/providers';
import { Paragraph, Title } from '../components/typography';

export const renderVerificationEmail = ({
  lang = 'en',
  name = '',
  url = ''
}: {
  lang?: string;
  name: string;
  url: string;
}): string => {
  return Providers({
    previewText: `Email verification for ${name}`,
    lang,
    children: `
      ${Title({ children: `Email verification for ${name}` })}
      
      ${Paragraph({
        children: `Thank you for your registration. To complete your account setup and verify your email address, please click the button below.`
      })}
      
      ${Divider()}
      
      ${Button({ href: url, children: `Verify email address` })}
      
      ${Paragraph({
        children: `If you did not request this verification, you can safely ignore this email.`
      })}
    `
  });
};
