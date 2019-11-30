import { colors } from "../../theme/colors";

export const styles = {
    root: {
        width: '100%'
    },
    datePicker: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: colors.gray.light  
    },
    customStyles: {
        dateInput: {
            borderColor: 'transparent',
            width: '100%'
        },
        dateText: {
            alignSelf: 'flex-start',
            marginLeft: 8
        }
    },
    dateIcon: {
        color:  '#616161', 
        fontSize: 13,
        marginBottom: 30
    }
}
