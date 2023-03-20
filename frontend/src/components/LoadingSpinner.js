import { Flex } from '@chakra-ui/react';
import { GridLoader } from 'react-spinners';


const LoadingSpinner = () => {
    return (
        
        <Flex justify='center' align='center' h='100vh'>
            <GridLoader
                color={'#1B1A17'}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </Flex>
    );
}
export default LoadingSpinner;
