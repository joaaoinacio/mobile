import { colors } from "../../../theme/colors";
import { Dimensions} from 'react-native';

export const styles = {
    root: {
        flex: 1,
        backgroundColor: '#fafafa',
        paddingTop: 10
    },
    column : {
        width: '50%',
        flex: 1,
        height: Dimensions.get('window').height*0.33 - 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: colors.primary.main,
        width: '95%',
        height: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        margin: 0,
        elevation:3,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "#f5f5f5",
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    image: {
        width: Dimensions.get('window').height*0.33 - 35 - 35, 
        height: Dimensions.get('window').height*0.33 - 35 - 35 ,
        resizeMode: 'center'

    },
    text: {
        fontSize: 14,
        color: 'white'
    },
    logo: {
        width: 200, 
        height: 50, 
        resizeMode: 'contain'

    }
}

export const images = {
    outros_icon:        require('../../../images/outros_icon.png')
}
