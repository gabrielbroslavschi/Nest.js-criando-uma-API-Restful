import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./validacao/usuario.entity";

@Injectable()
export class UsuarioRepository{
    private usuarios: UsuarioEntity[] = [];
    async salvar(usuario: UsuarioEntity) {
        this.usuarios.push(usuario);
    }

    async consultar(){
        return this.usuarios;
    }

    async existeComEmail(email:string){
        const possivelUsuario = this.usuarios.find(
            usuario => usuario.email === email
        );

        return possivelUsuario !== undefined;
    }

    private buscarPodId(id: string){
        const possivelUsuario = this.usuarios.find(
            usuarioSalvo => usuarioSalvo.id === id
        );
    
        if(!possivelUsuario) {
            throw new Error('Usuário não existe');
        }

        return possivelUsuario;
    }

    async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
        const usuario = this.buscarPodId(id)
    
        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            if(chave === 'id') {
                return;
            }
    
            usuario[chave] = valor;
        });
    
        return usuario;
    
    }

    async remove(id: string){
        const usuario = this.buscarPodId(id);
        this.usuarios = this.usuarios.filter(
            usuarioSalvo => usuarioSalvo.id !== id
        );
        return usuario;

    }
}