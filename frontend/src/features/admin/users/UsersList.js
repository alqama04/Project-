import { useGetUsersQuery } from "../../users/userApiSlice";
import { MdArrowDropDown } from "react-icons/md";
import {Badge, Box, Button, Checkbox, CheckboxGroup, Divider, Flex, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Table, TableContainer, Tbody, Th, Thead, Tr, } from "@chakra-ui/react";
import Users from "./Users";
import './Users.css'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

const UsersList = () => {
    
    const { search } = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchInput, setSearchInput] = useState('')
    const [manager, setManager] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [staff, setStaff] = useState(false)

    const [active, setActive] = useState(false)
    const [verified, setVerified] = useState(false)

    const queryObj = {}
    useEffect(() => {
        if (admin) queryObj.role = 'admin'

        else if (manager) queryObj.role = 'manager'
        else if (staff) queryObj.role = 'staff'


        if (admin || verified) queryObj.verified = verified
        if (active) queryObj.active = active

        setSearchParams(queryObj)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [admin, manager, staff, verified, active])

    const filterRole = (e) => {
        if (e.target.name === 'admin') {
            setAdmin(prev => !prev)
            setManager(false)
            setStaff(false)
        } else if (e.target.name === 'manager') {
            setManager(prev => !prev)
            setAdmin(false)
            setStaff(false)
        }
        else if (e.target.name === 'staff') {
            setStaff(prev => !prev)
            setAdmin(false)
            setManager(false)

        } else if (e.target.name === 'verified') {
            setVerified(prev => !prev)

        } else if (e.target.name === 'active') {
            setActive(prev => !prev)
        }


    }
    if (searchInput) queryObj.search = searchInput

    const searchad = () => {
        setSearchParams(queryObj)
        setAdmin(false)
        setManager(false)
        setStaff(false)
        setVerified(false)
        setActive(false)
    }

    const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery(search)
    let content = <Users {...{ users, isLoading, isError, error, isSuccess }} />

    return (
        <>
            <Box bg='#fff'>
                <Flex justify='start' w='full' px='3' mt='3'>
                    <Box border='1px' borderColor='gray.100' rounded='2' shadow='sm' p='1'>

                        <Flex m='auto' pb='1' justify='space-between'>
                            <Flex shadow='lg'>
                                <Input variant='formInput' placeholder="search name,phone"
                                    shadow='lg' py='1' rounded='3' w='20em'
                                    value={searchInput} onChange={e => setSearchInput(e.target.value)}
                                />
                                <IconButton
                                    size={{ base: 'sm' }} variant='iconBtn'
                                    bg='#f1f1f1' shadow='lg'
                                    border='2px' borderColor='#fff'
                                    rounded='2' icon={<BiSearch />}
                                    onClick={searchad}
                                />
                            </Flex>

                            <Box>

                                <Popover>
                                    <PopoverTrigger>
                                        <Button children="Filter" rightIcon={<MdArrowDropDown />} size='sm' py='3' variant='blackBtn' />
                                    </PopoverTrigger>
                                    <PopoverContent w='10em' _focus={{ boxShadow: "none", outline: "0", border: "0" }}>
                                        <PopoverArrow />
                                        <PopoverBody >
                                            <CheckboxGroup colorScheme='gray'>
                                                <Flex flexDir='column' justify='start' color='black' fontWeight='semibold'>
                                                    <Checkbox isChecked={admin} children='admin' name='admin' onChange={filterRole} />

                                                    <Checkbox isChecked={manager} children='manager' name='manager' onChange={filterRole} />
                                                    <Checkbox isChecked={staff} children='staff' name='staff' onChange={filterRole} />
                                                    <Checkbox isChecked={verified} children='verified' name='verified' onChange={filterRole} />
                                                    <Checkbox isChecked={active} children='active' name='active' onChange={filterRole} />
                                                </Flex>
                                            </CheckboxGroup>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>


                            </Box>

                            <Box>
                                <Badge children='Add User' variant='solid'
                                    title="details" textTransform='capitalize'
                                    fontWeight='normal' bg='#000' py='1'
                                    cursor='pointer'
                                />
                            </Box>
                        </Flex>

                        <Divider bg='gray.200' h='.1em' />
                        <TableContainer mt='1' border='1.5px' rounded='2' flex={1} w='full'>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>S.NO.</Th>
                                        <Th>ID</Th>
                                        <Th>name</Th>
                                        <Th>Phone (unique)</Th>
                                        <Th>verified</Th>
                                        <Th>active</Th>
                                        <Th>role</Th>
                                        <Th>created at</Th>
                                        <Th>Action</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {content}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Flex>
            </Box>
        </>
    )
}
export default UsersList;

/*

<Popover>
                                <PopoverTrigger>
                                    <Button children="Filter" rightIcon={<MdArrowDropDown />} size='sm' py='3' variant='blackBtn' />
                                </PopoverTrigger>
                                <PopoverContent w='10em' _focus={{ boxShadow: "none", outline: "0", border: "0" }}>
                                    <PopoverArrow />
                                    <PopoverBody >
                                        <CheckboxGroup colorScheme='gray'>
                                            <Flex flexDir='column' justify='start' color='black' fontWeight='semibold'>
                                                <Checkbox isChecked={admin} children='admin' name='admin' onChange={filterRole} />

                                                <Checkbox isChecked={manager} children='manager' name='manager' onChange={filterRole} />
                                                <Checkbox isChecked={staff} children='staff' name='staff' onChange={filterRole} />
                                                <Checkbox isChecked={verified} children='verified' name='verified' onChange={filterRole} />
                                                <Checkbox isChecked={active} children='active' name='active' onChange={filterRole} />
                                            </Flex>
                                        </CheckboxGroup>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
*/