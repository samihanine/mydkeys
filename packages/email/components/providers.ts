import { Card } from './card';
import { Image } from './image';

const LOGO_IMAGE = 'https://api.mydkeys.com/static/images/logo.png';

export const Providers = ({
  children,
  lang = 'en',
  previewText
}: {
  children: string;
  lang?: string;
  previewText: string;
}): string => {
  return `
    <!DOCTYPE html>
    <html lang="${lang}">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${previewText}</title>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600;700&display=swap" rel="stylesheet">
        <!--[if gte mso 9]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
      </head>
      <body style="
        margin: 0;
        padding: 0;
        font-family: 'Titillium Web', Arial, sans-serif;
        background-color: #ecf5f6;
        width: 100%;
        height: 100%;
      ">
        <!-- Preview text -->
        <div style="display: none; max-height: 0; overflow: hidden;">
          ${previewText}
        </div>
        
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="
          width: 100%;
          background-color: #ecf5f6;
          margin: 0;
          padding: 40px 20px;
        ">
          <tr>
            <td align="center">
              ${Card({
                children: `
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%; margin-bottom: 16px;">
                    <tr>
                      <td align="center">
                        ${Image({ src: LOGO_IMAGE, alt: 'Logo illustration', height: 80 })}
                      </td>
                    </tr>
                  </table>
                  ${children}
                `
              })}
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};
