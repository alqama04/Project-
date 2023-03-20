
export const InputStyle = {

    baseStyle: {
        field: {
            py: 2,
            fontSize: '.8em',
            fontWeight: 'medium',
            px: "1"
        },
    },

    variants: {
        searchInput: {
            field: {
                px: '2px',
                bg: 'formInputBg',
                border: '1px solid #fff',
            },
        },
        formInput: {
            field: {
                fontSize: ".88em",
                bg: "#fff",
                width: "100%",
                pt: "1.6em",
                pb: "0",
                border: "1px",
                borderColor: "gray.100",
                borderRadius: '2',
                px: '1',
                _focus: {
                    border: '1px',
                    borderColor: "gray.400"
                }
            }
        },
        formInputRounded: {
            field: {
                border: '1.5px solid #fff',
                shadow: 'lg',
                fontSize: ".9em",
                bg: "formInputBg",
                width: "100%",
                borderRadius: 'full',
                px: '1'
            }
        },
    },

    defaultProps: {
        size: 'base',
        variant: '',
        colorScheme: '',
    },
}