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
    const { get, set, remove } = useLocalStorage()
    /*const [usuario2, setUsuario] = useState<Usuario | null>(null)*/
    /*const [carregando2, setCarregando] = useState(true)*/

    /*const carregarUsuario = useCallback(
        async function () {
            try {
                const usuarioLocal = await get('usuario')
                if (usuarioLocal) {
                    setUsuario(usuarioLocal)
                }
            } finally {
                setCarregando(false)
            }
        },
        [get]
    )*/

        async function entrar(usuario: Partial<Usuario>) {
            try {
                const token = await httpPost('/usuario/login', usuario)
                if (token) {
                    await AsyncStorage.setItem('token', token)
                    criarSessao(token)
                    console.log('Usuário autenticado, token armazenado no AsyncStorage')
                } else {
                    console.log('Falha na autenticação. Token não recebido.')
                }
            } catch (error) {
                console.error('Erro ao autenticar o usuário:', error)
            }
        }

    async function registrar(usuario: Usuario) {
        await httpPost('/usuario/registrar', usuario)
    }

/*
export function ProvedorUsuario({ children }: any) {
    const { get, set } = useLocalStorage()
    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState<Usuario | null>(null)

    const carregarUsuario = useCallback(
        async function () {
            try {
                const usuarioLocal = await get('usuario')
                if (usuarioLocal) {
                    setUsuario(usuarioLocal)
                }
            } finally {
                setCarregando(false)
            }
        },
        [get]
    )

    async function entrar(usuario: Usuario) {
        setUsuario(usuario)
        await set('usuario', usuario)
    }

    async function registrar(usuario: Usuario) {
        await set('usuario', usuario)
    }
    */

    function sair() {
        limparSessao()
    }
    /*
    useEffect(() => {
        carregarUsuario()
    }, [carregarUsuario])
    */
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

