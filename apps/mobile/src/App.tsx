import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProvedorUsuario } from './data/contexts/ContextoUsuario'
import { ProvedorAgendamento } from './data/contexts/ContextoAgendamento'
import { ProvedorSessao } from './data/contexts/ContextoSessao'
import { NavigationContainer } from '@react-navigation/native'
import Cadastro from './screens/Cadastro'
import Principal from './screens/Principal'
import Sumario from './screens/Sumario'

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <ProvedorSessao>
            <ProvedorUsuario>
                <ProvedorAgendamento>
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen
                                name="Cadastro"
                                component={Cadastro}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="Principal"
                                component={Principal}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="Sumario"
                                component={Sumario}
                                options={{
                                    headerShown: false,
                                }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </ProvedorAgendamento>
            </ProvedorUsuario>
        </ProvedorSessao>
    )
}
