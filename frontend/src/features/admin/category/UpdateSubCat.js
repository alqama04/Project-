import { Flex, IconButton, Input } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { FaRegEdit } from 'react-icons/fa'
import { useAddSubCategoryMutation } from '../../store/storeApiSlice';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ToastMsg from '../../../hooks/useToastMsg';

const UpdateSubCat = ({ name, subCatId, cateId }) => {
    const [subCateName, setSubCateName] = useState(name)
    const [editable, setEditable] = useState(false)
    const inputRef = useRef(null)
    const { handleToast } = ToastMsg()
    const handleEditable = () => {
        setEditable(prev => !prev)
        inputRef.current.focus()
    }

    const [addSubCategory, { isLoading }] = useAddSubCategoryMutation()

    const handleUpdate = async () => {
        try {
            const data = await addSubCategory({ cateId, subCateName, subCatId }).unwrap()
            console.log(data)
            if (data) {
                handleToast({ desc: data.message, status: 'success' })
                setEditable(false)
            }
        } catch (error) {
            handleToast({ desc: error.data.message, status: 'error' })
        }
    }

    let content
    if (isLoading) content = <LoadingSpinner />
    else content =
     <React.Fragment>
        {!editable ?
            <IconButton px='2'
                fontWeight='semibold'
                fontSize='1.2em'
                size=''
                onClick={handleEditable}
                icon={<FaRegEdit />}
            />
            : <IconButton px='2'
                fontWeight='semibold'
                fontSize='1.2em'
                size=''
                shadow='lg'
                bg='orange'
                borderRadius='full'

                onClick={handleUpdate}
                icon={<BiCheck />}
            />
        }
        </React.Fragment>

return (
    <React.Fragment>
        <Flex justify='space-between' w='full' align='center'>
            <Input ref={inputRef} type='text' py='1.5' my='1' variant='formInput' value={subCateName} onChange={e => setSubCateName(e.target.value)} readOnly={!editable ? true : false} cursor={!editable ? 'not-allowed' : 'text'} />
            {content}
        </Flex>
    </React.Fragment>
);
}

export default UpdateSubCat;
