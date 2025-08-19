export const Title = ({ children }: { children: string }): string => {
  return `
    <h1 style="
      margin: 0 0 24px 0;
      text-align: center;
      font-size: 32px;
      font-weight: bold;
      line-height: 1.2;
      color: #333333;
    ">${children}</h1>
  `;
};

export const Subtitle = ({ children }: { children: string }): string => {
  return `
    <h2 style="
      margin: 0 0 24px 0;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      line-height: 1.3;
      color: #333333;
    ">${children}</h2>
  `;
};

export const Paragraph = ({ children }: { children: string }): string => {
  return `
    <p style="
      margin: 0 0 24px 0;
      text-align: center;
      font-size: 16px;
      line-height: 1.6;
      color: #555555;
    ">${children}</p>
  `;
};
