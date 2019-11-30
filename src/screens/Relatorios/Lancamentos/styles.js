import { colors } from "../../../theme/colors";
import { Dimensions} from 'react-native';

export const styles = {
    content: {
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5
    },
    dateText: {
        color: colors.gray.light,
        marginRight: 10
    },
    filterContainer: {
        width: '100%',
        minHeigth: 60,
        backgroundColor: colors.primary.main
    },
    filterHeader: {
        padding: 10,
        paddingLeft: 30
    },
    filterMenuIcon: {
        color: 'white'
    },
    filterMainText: {
        color: 'white'
    },
    filterSmallText: {
        color: 'white',
        fontSize: 10
    },
    collapseContainer: {
        padding: 15,
        backgroundColor: colors.gray.superLight,
        borderColor: colors.gray.main,
        borderBottomWidth: 2,
        paddingBottom: 25
    }, 
    emptyContainer: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemStatusIcon: {
        color: colors.secondary.main,
        fontSize: 15
    }
}

