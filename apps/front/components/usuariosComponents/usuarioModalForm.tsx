'use client'
import { Usuario } from "@app/shared";
import CustomSelect from "../inputsComponents/customSelect";
import CustomInput from "../inputsComponents/customInput";

const opcoesCargo = [
    { value: 1, label: 'Cliente' },
    { value: 2, label: 'Funcionário' },
    { value: 3, label: 'Administrador' }
];

interface UsuarioModalFormProps{
    formData:Partial<Usuario>;
    erros:Partial<Record<keyof Usuario, string>>;
    handleChange:(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>void;
}

export default function UsuarioModalForm({
    formData,
    erros,
    handleChange,
}:UsuarioModalFormProps){
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-2">
            <div className="md:col-span-2">
                <CustomSelect
                    label="Cargo"
                    name="id_cargo"
                    options={opcoesCargo}
                    value={formData.id_cargo || ""}
                    erro={erros.id_cargo}
                    onChange={(name, val) => {
                        handleChange({
                            target: { name, value: val }
                        } as any);
                    }}
                />
            </div>

            <div className="md:col-span-2"> 
                <CustomInput
                    label="Nome"
                    name="nome"
                    onChange={handleChange}
                    value={formData.nome}
                    erro={erros.nome}
                    type="text"
                />
            </div>

            <CustomInput
                label="CPF"
                name="cpf"
                onChange={handleChange}
                value={formData.cpf}
                erro={erros.cpf}
                type="cpf"
            />

            <CustomInput
                label="Telefone"
                name="telefone"
                onChange={handleChange}
                value={formData.telefone}
                erro={erros.telefone}
                type="tel"
            />


            <div className="md:col-span-2">
                <CustomInput
                    label="E-mail"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    erro={erros.email}
                    type="email"
                />
            </div>
                
            
        </div >
    );
}