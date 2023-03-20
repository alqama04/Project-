import { Box, Flex, } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import DashNav from './DashNav';

const Dashboard = () => {
    return (
        <>
                <Flex justify='start' w='100%'>
                    <DashNav />
                    <Box overflowX='auto' flex='1' w='100%'>
                        <Outlet />
                    </Box>
                </Flex>
        </>
    );
}

export default Dashboard;
