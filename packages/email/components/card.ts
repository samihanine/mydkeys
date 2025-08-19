export const Card = ({ children, className = '' }: { children: string; className?: string }): string => {
  return `
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="
      margin: 0 auto;
      background-color: white;
      border-radius: 24px;
      border: 1px solid rgba(115, 115, 115, 0.25);
      padding: 24px;
      max-width: 600px;
      width: 100%;
    ">
      <tr>
        <td>
          ${children}
        </td>
      </tr>
    </table>
  `;
};
