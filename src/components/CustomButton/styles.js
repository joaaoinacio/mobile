import { colors } from "../../theme/colors";

const defaultProps = {
    width:          '100%',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center'
}

export const styles = {
    root: {
        ...defaultProps
    },
    cancelButton: {
        ...defaultProps,
        backgroundColor: colors.gray.main
    }
}
