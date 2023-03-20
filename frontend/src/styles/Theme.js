import { extendTheme } from "@chakra-ui/react"
import { InputStyle } from "./components/InputStyle"
import { Button } from './components/ButtonStyle'
import '@fontsource/heebo'
const breakpoints = {
    sm: '34em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
}
export const theme = extendTheme({
    config: {
        cssVarPrefix: 'alqama',
    },

    fonts: {
        heading: "Heebo",
        body: "Heebo",
    },

    letterSpacing: "wider",
    breakpoints: breakpoints,

    colors: {
        brandColor: "#000",
        formInputBg: '#f1f1f1',
        borderColor: 'gray.600',
        star: '#AF0171'
    },
    components: {
        Input: InputStyle,
        FormLabel: {
            variants: {
                absoluteLabel: {
                    pos: 'absolute',
                    zIndex: '1',
                    ml: '1',
                    fontSize: '.8em',
                    fontWeight: "normal",
                    color:"gray.600"
                }
            }

        },
        Button: Button,

        Text: {
            baseStyle: {
                fontSize: '.9em',
                letterSpacing: "1px"
            }
        },
        Heading: {
            baseStyle: {
                fontFamily: "inherit",
                fontWeight: "normal",
                color: "inherit",
                letterSpacing: "1.1px"
            }
        },
        Checkbox: {
            baseStyle: {
                control: {
                    _focus: {
                        boxShadow: 'none',
                    },
                },
            },
        },
        Textarea: {
            baseStyle: {
                border: "2px solid #fff",
                fontWeight: "medium",
                bg: "#f1f1f1",
                borderRadius: '2px',
                shadow: "lg",
                rounded: "0",
            }
        }
    },

})