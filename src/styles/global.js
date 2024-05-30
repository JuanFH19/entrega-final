import {StyleSheet} from 'react-native'

const globalStyles = StyleSheet.create({
    contenedor:{
        flex:1,
        backgroundColor: 'black',
        justifyContent: 'center',
    },
    contenido:{
        marginHorizontal: '2.5%',
        flex: 1
    },
    button:{
        backgroundColor: '#000000'
    },
    botonTexto:{
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: (199, 101, 101)
    },

    titulos:{
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 20,
        fontSize:30 
    }, 
    imagen:{
        height: 300,
        width: '100%'
    },
    cantidad:{
        textTransform: 'uppercase',
        color: '#000',
        textAlign: 'center',
        fontSize: 25
    }

})

export default globalStyles