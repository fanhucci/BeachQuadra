export default function senhaRedefinidaPorAdminTemplate() {
    return(`
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">
            <tr>
                <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;padding:40px;">
                    
                    <tr>
                    <td align="center" style="padding-bottom:30px;">
                        <h2 style="margin:0;color:#1F4E6B;font-size:24px;">
                        Sua senha foi redefinida pelo administrador
                        </h2>
                    </td>
                    </tr>

                    <tr>
                    <td style="color:#444444;font-size:16px;line-height:1.5;padding-bottom:30px;">
                        Por motivos de segurança, um administrador da plataforma <strong>BeachQuadra</strong> redefiniu a senha da sua conta.
                        <br/><br/>
                        Para voltar a acessar o sistema, é necessário que você crie uma nova senha utilizando a opção <strong>"Esqueci minha senha"</strong>.
                    </td>
                    </tr>

                    <tr>
                    <td align="center" style="padding-bottom:30px;">
                        <a href="https://beach-quadra-front.vercel.app/esqueci-senha"
                        style="
                            background-color:#1F4E6B;
                            color:#ffffff;
                            text-decoration:none;
                            padding:14px 28px;
                            border-radius:6px;
                            font-weight:bold;
                            display:inline-block;
                            font-size:16px;
                        ">
                        Criar nova senha
                        </a>
                    </td>
                    </tr>

                    <tr>
                    <td style="color:#888888;font-size:13px;line-height:1.5;">
                        Este procedimento é necessário para garantir a segurança da sua conta.
                        <br/><br/>
                        Caso você não reconheça esta ação, entre em contato com o administrador do sistema.
                    </td>
                    </tr>

                    <tr>
                    <td style="padding-top:40px;color:#aaaaaa;font-size:12px;text-align:center;">
                        © BeachQuadra — Sistema de reservas de quadras de Beach Tennis
                    </td>
                    </tr>

                </table>
                </td>
            </tr>
        </table>
    `)
}