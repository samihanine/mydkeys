export const Button = ({ children, href }: { children: string; href: string }): string => {
  return `
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: 24px auto;">
      <tr>
        <td>
          <a href="${href}" style="
            display: inline-block;
            background-color: #1C90CD;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 9999px;
            font-weight: 500;
            font-size: 16px;
            text-align: center;
          ">${children}</a>
        </td>
      </tr>
    </table>
  `;
};
