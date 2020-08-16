import { Toast } from 'native-base';
import NavigationService from '../NavigationService';
import AuthController from '../controllers/AuthController';
import ConnectionController from '../controllers/ConnectionController';

const errors = [
    {
        status: 401,
        message: 'O seu acesso expirou! Por favor efetue o login novamente.',
    },
    {
        status: 404,
        message: 'Caminho para o servidor não encontrado!',
    },
    {
        status: 405,
        message: 'Erro de método não permitido ou habilitado!',
    },
    {
        status: 407,
        message: 'Você foi considerado uma ameaça e o servidor bloqueou o seu acesso!',
    },
    {
        status: 415,
        message: 'O formato do arquivo inserido não é permitido!',
    },
    {
        status: 429,
        message: 'Erro ao executar varias solicitações em um determinado tempo!',
    },
    {
        status: 500,
        message: 'Erro interno do servidor! Ocorreu um erro no servidor ao enviar as informações.',
    },
    {
        status: 422,
        message: 'Dados enviados inválidos!',
    }
]

export function voidError(){
    Toast.show({
        text: 'Conexão com o servidor não foi bem sucedida. Por favor aguarde mais uns instantes ou entre em contato.',
        type: 'danger',
        duration: 3000
    })
    return {
        error: "Network Error!!!",
        status: 666
    }
}

export default async function apiErros(error){
    
    const is_connected = await ConnectionController.isConnected()

    if(!is_connected) return {
        error: "Network Error!!!",
        status: 666
    }

    if(!error) return voidError()
    if(!error.status) return voidError()
    
    let status = error.status
    let status_message_pos = errors.map((e) => {return e.status}).indexOf(status)
    Toast.show({
        text: errors[status_message_pos].message,
        type: 'danger',
        duration: 3000
    })
    if(status === 401) AuthController.loggout();
    return errors[status_message_pos]
}
