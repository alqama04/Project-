import { Badge, Flex, Td, Text, Tr, } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Navigations from "../../../components/Navigations";


const Users = (props) => {
    const users = props.users
    const isLoading = props.isLoading
    const isError = props.isError
    const error = props.error
    const isSuccess = props.isSuccess
    const navigate = useNavigate()
    let content = ''

    if (isLoading) {
        
        content = <Tr>
            <Td colSpan='10'>
                <LoadingSpinner />
            </Td>
        </Tr>
    }
    if (isError) {
        content = <Tr>
            <Td colSpan='9'>
                <Text textAlign='center' color='red.500'>Error : {error.data.message}</Text>
            </Td>
        </Tr>
    }
    const userDetail = (id) => {
        navigate(`${Navigations.userList}/${id}`)
    }
    if (isSuccess) {
        content = users.users.map((user, i) => (
            <Tr key={user._id}>
                <Td>{i + 1}</Td>
                <Td>{user._id}</Td>
                <Td>{user.name}</Td>
                <Td>{user.phone}</Td>
                <Td>{user.verified.toString()}</Td>
                <Td>{user.active.toString()}</Td>
                <Td color={user.role === 'admin' ? 'green.500' : user.role === 'manager' ? 'orange' : ''}>{user.role}</Td>
                <Td>{new Date(user.createdAt).toLocaleString()}</Td>
                <Td>
                    <Flex align='center' onClick={() => userDetail(user._id)} >
                        <Badge children='details' variant='solid'
                            title="details" textTransform='capitalize'
                            fontWeight='normal' bg='#000' py='1'
                            cursor='pointer'
                        />
                    </Flex>
                </Td>
            </Tr>
        ))
    }

    return content
}

export default Users;
