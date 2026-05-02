'use client'

import useCadastroReservas from "./useCadastroReservas";

export default function CadastroReservasPage(){

    const dados = useCadastroReservas();

    if (!dados) return <div>Carregando...</div>;

    const { mapa, diasDaSemana, horariosDoDia } = dados;
    const semanaHeader = [
        'Segunda','Terça','Quarta','Quinta','Sexta','Sabado','Domingo'
    ]
    return(
        <table>
            <thead>
                <tr>
                    <th>Hora</th>
                    {diasDaSemana.map(dia => (
                        <th key={dia}>
                            <div>
                                <span>{semanaHeader[dia]}</span>
                                <span>{dia}</span>
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {horariosDoDia.map(hora => (
                    <tr key={hora}>
                        <td>{hora}</td>

                        {diasDaSemana.map(dia => {
                            const slot = mapa[dia]?.[hora];

                            return (
                                <td
                                    key={dia + hora}
                                    style={{
                                        backgroundColor: slot?.permitido ? 'green' : 'red',
                                        cursor: slot?.permitido ? 'pointer' : 'not-allowed',
                                        textAlign: 'center'
                                    }}
                                >
                                    {slot?.quadras.length ?? 0}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}