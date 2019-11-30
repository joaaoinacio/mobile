import { colors } from "../../theme/colors";

export const styles = {
    root: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: colors.cinza.light,
        paddingBottom: 10

    },
    multiSelectColors: {
        primary: colors.cinza.light,   
        chipColor: colors.cinza.light,
        success: colors.verde.main,
        text: colors.cinza.light,
        searchSelectionColor: colors.cinza.light,
        searchPlaceholderTextColor: colors.cinza.light
    },
    multiSelectStyles : {
        selectToggleText: {
            color: colors.cinza.dark
        },
        selectToggle: {
            height: 45,
            paddingLeft: 10,
            paddingRight: 10,
        },
        separator: {
            backgroundColor: 'transparent'
        },
        button: {
            backgroundColor: colors.verde.main
        },
        selectedItemText: {
            color: colors.verde.main
        }
      }
}