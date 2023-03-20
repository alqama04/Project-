import { useToast } from '@chakra-ui/react'

const ToastMsg = () => {
    const toast = useToast()

    const handleToast = (obj={}) => {
        toast({
            title: obj.title || '',
            description: obj.desc || '',
            status: obj.status || 'info',
            duration: 2000,
            position: "top",
            isClosable: true,
        })
    }
    return { handleToast }
}

export default ToastMsg;
