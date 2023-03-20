
export const Button = {
    baseStyle: {
        textTransform: 'Capitalize',
        letterSpacing: '.4px',
        borderRadius: '0',
        // bg:"transparent",
        fontWeight: "normal",
        'WebkitTapHighlightColor': "transparent",
        _focus: {
            boxShadow: 'none',
        },

    },

    sizes: {
        sm: {
            fontSize: '1.3em',
            px: 0,
            py: 0,
        },
        md: {
            fontSize: '1.5xl',
            px: 0,
            py: 0,
            _hover: {
                opacity: 0.9,
                cursor: 'pointer'
            }
        },
    },
    variants: {
        solid: {
            outline: "none",
            color: '#fff',
            fontSize: "1em",
            fontWeight: 'normal',
            bg: "#000",
            borderRadius: '2',
            py: "1.2em",
            px: '1.5',
            _disabled: {
                opacity: "0.9",
                zIndex: "1",
                cursor: "pointer"
            }

        },
        iconBtn: {
            outline: "none",
            color: 'brandColor',
        },

        basicBtn: {
            borderRadius: '1',
            fontSize: "13px",
        },

    },
    defaultProps: {
        size: 'md',
        variant: 'basicBtn',
        colorScheme: "none"
    },
}