import { Button } from '../components/button';
import { Divider } from '../components/divider';
import { Providers } from '../components/providers';
import { Paragraph, Title } from '../components/typography';

export const renderResetPasswordEmail = ({
  lang = 'en',
  name = 'John Doe',
  url
}: {
  lang?: string;
  name: string;
  url: string;
}): string => {
  return Providers({
    previewText: `Reset your password, ${name}`,
    lang,
    children: `
      ${Title({ children: `Password Reset Request` })}
      
      ${Paragraph({
        children: `Hello ${name}, we have received a request to reset your password. If you didn't initiate this request, please ignore this email.`
      })}
      
      ${Paragraph({
        children: `Click the button below to reset your password. This link is valid for 24 hours.`
      })}
      
      ${Divider()}
      
      ${Button({ href: url, children: `Reset Password` })}
      
      ${Paragraph({
        children: `If the button doesn't work, you can also copy and paste the following link into your browser: ${url}`
      })}
    `
  });
};
