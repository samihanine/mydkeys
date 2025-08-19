import { Button } from '../components/button';
import { Divider } from '../components/divider';
import { Providers } from '../components/providers';
import { Paragraph, Title } from '../components/typography';

export const renderWelcomeEmail = ({
  lang = 'en',
  name = 'John Doe',
  url
}: {
  lang?: string;
  name: string;
  url: string;
}): string => {
  return Providers({
    previewText: `Welcome ${name} to our platform!`,
    lang,
    children: `
      ${Title({ children: `We're thrilled to have you with us ${name}!` })}
      
      ${Paragraph({
        children: `We're happy to have you join us. We're here to help you get the most out of our platform.`
      })}
      
      ${Divider()}
      
      ${Button({ href: url, children: `Get Started 🚀` })}
    `
  });
};
