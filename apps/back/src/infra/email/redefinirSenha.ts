export default function redefinirSenhaTemplate(link:string){
    return(`
        <div>
            <h2>Primeiro acesso</h2>
            <p>Redefina sua senha clicando abaixo:</p>
            <a href="${link}">Redefinir senha</a>
        </div>
    `)
}