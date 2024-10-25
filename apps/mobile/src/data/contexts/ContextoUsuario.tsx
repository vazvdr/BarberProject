'use client'
import { createContext, useState, useEffect, useCallback} from 'react'
import { Usuario } from '@/src/regras'
import useLocalStorage from '../hooks/useLocalStorage'
import useAPI from '../hooks/useAPI'
import useSessao from '../hooks/useSessao'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface ContextoUsuarioProps {
    carregando: boolean
    usuario: Usuario | null
    entrar: (usuario: Partial<Usuario>) => Promise<void>
    registrar: (usuario: Usuario) => Promise<void>
    sair: () => void
}

const ContextoUsuario = createContext<ContextoUsuarioProps>({} as any)

export function ProvedorUsuario({ children }: any) {
    const { httpPost } = useAPI()
    const { carregando, usuario, criarSessao, limparSessao } = useSessao()
    
        async function entrar(usuario: Partial<Usuario>) {
            try {
                const token = await httpPost('/usuario/login', usuario)
                if (token) {
                    await AsyncStorage.setItem('token', token)
                    criarSessao(token)
                }
            } catch (error) {
                console.error('Erro ao autenticar o usuário:', error)
            }
        }

    async function registrar(usuario: Usuario) {
        await httpPost('/usuario/registrar', usuario)
    }


    function sair() {
        limparSessao()
    }
    return (
        <ContextoUsuario.Provider
            value={{
                carregando,
                usuario,
                entrar,
                registrar,
                sair,
            }}
        >
            {children}
        </ContextoUsuario.Provider>
    )
}

export default ContextoUsuario

