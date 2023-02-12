import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/emailEhUnico.validator";



export class CriaUsuarioDTO{
    @IsNotEmpty({message: "O nome não pode ser vazio!"})
    nome: string;

    @IsEmail(undefined, {message: "O email não apresenta nem dominio nem @!"})
    @EmailEhUnico({message: "Já existe um usuario com este email"})
    email: string;

    @MinLength(6, {message: "A senha deve conter no minimo 6 caracteres!"})
    senha: string;
}