import { Flex, IconButton, Input, Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { setQuery } from '../../features/store/StoreSlice'
import { useDispatch } from 'react-redux';
import useNavigateSearch from '../../hooks/useNavigateSearch ';


const SearchBox = ({ pos }) => {
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')

    const navigateSearch = useNavigateSearch();
    const handleSearch = (e) => {
        e.preventDefault()
        if (searchValue) {
            dispatch(setQuery({ search: searchValue }))
            navigateSearch('/products', { search: searchValue});
        }
    }
    const searchBox =
        <form>
            <Box>
                <Flex align='center'
                    flexWrap='nowrap'
                    borderRadius='2'
                    pos={pos ? { pos } : { base: 'absolute', sm: "relative" }}
                    w={{ base: '100%', sm: '18em', md: "24em", lg: "30em" }}
                    m='auto'
                    left={{ base: '0', md: "auto" }}
                    top={{ base: '3em', sm: 'initial' }}
                    shadow='lg'
                    pl='.1em'
                    borderTop={{ base: '2px', sm: 'none' }}
                    borderBottom={{ base: '2px', sm: 'none' }}
                    borderColor={{ base: "gray.200", sm: 'none' }}
                    zIndex={'1'}
                    bg='white'
                >
                    <Input type='text'
                        fontWeight='semibold'
                        variant='searchInput'
                        placeholder='search products brands categories ...'
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)} />
                    <IconButton type='submit'
                        size={{ base: 'sm' }}
                        variant='iconBtn'
                        color='brandColor'
                        onClick={handleSearch}
                        icon={<BiSearch />} />
                </Flex>
            </Box>
        </form>
    return searchBox
}
export default SearchBox;
