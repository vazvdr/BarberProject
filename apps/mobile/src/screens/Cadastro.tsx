import { TelefoneUtils } from '../regras'
import { StyleSheet, Text, TextInput, Pressable, View, ImageBackground, Image } from 'react-native'
import useUsuario from '../data/hooks/useUsuario'
import React, { useEffect, useState } from 'react'
import useFormUsuario from '../data/hooks/useFormUsuario'

export default function Cadastro({ navigation }: any) {
    const { usuario, entrar, registrar } = useUsuario()
    const { nome, setNome, email, setEmail, telefone, setTelefone, senha, setSenha, errors } = useFormUsuario()
    const [modo, setModo] = useState<'entrar' | 'cadastrar'>('entrar')
    
    useEffect(() => {
        if (usuario) {
            navigation?.replace('Principal')
        }
    }, [usuario])

    async function submeter() {
        if (modo === 'entrar') {

            await entrar({ nome, email, telefone, senha })
        } else {
            await registrar({ nome, email, senha, telefone })
        }
        limparFormulario()
    }

    function limparFormulario() {
        setNome('')
        setEmail('')
        setTelefone('')
        setSenha('')
        setModo('entrar')
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/inicio/principal.webp')}
                style={styles.imagemDeFundo}
            >
                <View style={styles.conteudo}>
                    <Image
                        source={require('../../assets/inicio/logo-brutal.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.titulo}>🤘 A barbearia mais foda da cidade 🤘</Text>
                    <View style={styles.formulario}>

                        <Text style={styles.label}>Nome</Text>
                        <TextInput
                            style={[styles.input, errors.nome ? styles.inputError : null]}
                            placeholder="Digite seu nome"
                            placeholderTextColor="#666"
                            value={nome}
                            onChangeText={setNome}
                        />
                        {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

                        <Text style={styles.label}>E-mail</Text>
                        <TextInput
                            style={[styles.input, errors.email ? styles.inputError : null]}
                            placeholder="Digite seu e-mail"
                            placeholderTextColor="#666"
                            value={email.toLowerCase()}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            style={[styles.input, errors.senha ? styles.inputError : null]}
                            placeholder="Digite sua senha"
                            placeholderTextColor="#666"
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry
                        />
                        {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}

                        <Text style={styles.label}>Telefone</Text>
                        <TextInput
                            style={[styles.input, errors.telefone ? styles.inputError : null]}
                            placeholder="Digite seu telefone"
                            placeholderTextColor="#666"
                            value={TelefoneUtils.formatar(telefone)}
                            onChangeText={(tel) => setTelefone(TelefoneUtils.desformatar(tel))}
                            keyboardType="phone-pad"
                        />
                        {errors.telefone && <Text style={styles.errorText}>{errors.telefone}</Text>}

                        <Pressable style={styles.button} onPress={submeter}>
                            <Text style={styles.buttonText}>
                                {modo === 'entrar' ? 'Entrar' : 'Cadastrar'}
                            </Text>
                        </Pressable>
                        <Pressable style={styles.toggleButton} onPress={() => setModo(modo === 'entrar' ? 'cadastrar' : 'entrar')}>
                            <Text style={styles.toggleButtonText}>
                                {modo === 'entrar' ? 'Ainda não tem conta? Cadastre-se!' : 'Já tem conta? Entre!'}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1 
    },
    label: {
        color: '#fff', 
        fontWeight: 'bold', 
        alignSelf: 'flex-start', 
        marginBottom: 8, 
        marginLeft: 10, 
        fontSize: 16 
    },
    input: { 
        width: '100%', 
        minWidth: 280, 
        height: 40, 
        backgroundColor: '#1e1e1e', 
        borderRadius: 5, 
        paddingHorizontal: 10, 
        color: '#fff', 
        marginBottom: 20 
    },
    inputError: { 
        borderColor: 'red', 
        borderWidth: 1 
    },
    errorText: { 
        color: 'red', 
        marginBottom: 20, 
        marginLeft: 10, 
        alignSelf: 'flex-start' 
    },
    button: { 
        width: '100%', 
        height: 40, 
        backgroundColor: '#22c55e', 
        borderRadius: 5, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    buttonText: { 
        color: '#fff', 
        fontSize: 16 
    },
    toggleButton: { 
        marginTop: 10 
    },
    toggleButtonText: { 
        color: '#fff', 
        textAlign: 'center', 
        fontWeight: 'bold' 
    },
    imagemDeFundo: { 
        flex: 1, 
        resizeMode: 'cover', 
        justifyContent: 'center' 
    },
    formulario: { 
        padding: 40 
    },
    logo: { 
        marginTop: 20, 
        marginBottom: 20 
    },
    conteudo: { 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    titulo: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        color: 'white', 
        marginBottom: 10 
    },
    descricao: { 
        fontSize: 14, 
        color: 'white', 
        textAlign: 'center', 
        marginBottom: 20, 
        marginHorizontal: 20 
    },
})
