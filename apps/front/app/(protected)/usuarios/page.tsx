'use client'

import CustomModal from "@/components/customModal";
import CustomTable from "@/components/customTable";
import useFilter from "@/hooksGenericos/useFilter";
import usePageCrud from "@/hooksGenericos/usePageCrud";
import { EditarUsuarioSchema, NovoUsuarioSchema, Usuario, UsuarioSearch } from "@app/shared";
import useUsuariosTable from "./useUsuariosTable";


export default function UsuariosPage(){
    const {queryString, filters, handleFilters} = useFilter<UsuarioSearch>({
        search:'',
        tipo:"nome",
        id_cargo:1,
        ativo:true
    });

    const {dados,editar,ativar,desativar} = usePageCrud<Usuario>({
        idKey:'id_pessoa',
        endpoint:'usuarios',
        filtro: queryString,
        criarSchema: NovoUsuarioSchema,
        editarSchema: EditarUsuarioSchema
    });

    const {colunas} = useUsuariosTable({
        editar:editar,
        ativar:ativar,
        desativar:desativar
    });

    return(
        <main className="flex flex-1 w-full">

            <div>
                header
            </div>

            <div>Filtros</div>

            <CustomTable
                columns={colunas}
                data={dados}
            />

            {/* <CustomModal>

            </CustomModal> */}

        </main>
    );
}