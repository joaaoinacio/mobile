import { colors } from "../../../theme/colors";
import { Dimensions} from 'react-native';

export const styles = {
    root: {
        backgroundColor: '#fafafa',
        paddingTop: 10
    },
    row : {
        width: '100%',
        flex: 1,
        height: Dimensions.get('window').height*0.2 - 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: colors.primary.main,
        width: '95%',
        height: '95%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 3,
        paddingLeft: 20,
        margin: 0,
        elevation:3,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "#f5f5f5",
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    image: {
        width: Dimensions.get('window').height*0.2 - 90, 
        height: Dimensions.get('window').height*0.2 - 90,
        resizeMode: 'center',
        marginRight: 10
    },
    text: {
        fontSize: 20,
        color: 'white'
    },
    textMore: {
        fontSize: 15,
        color: 'white'
    }   
}

