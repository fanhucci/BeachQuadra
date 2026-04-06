
export default function LoginPage(){
    return(
        <div className="flex flex-1 justify-center items-center ">

            <form className="flex flex-col h-64 w-64 justify-center text-center gap-5 p-2 rounded bg-green-500 " action="" method="POST">

                <label htmlFor="user">Usuário</label>
                <input id="user" type="text"></input>

                <label htmlFor="password">Senha</label>
                <input id="password" type="password"></input>

                <button type="submit">Entrar</button>
            </form>
            
        </div>
    )
}