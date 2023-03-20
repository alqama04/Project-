import { Flex } from "@chakra-ui/react";
import React from "react";
import { Route } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ROLES } from "../../config/Roles";
import RequireAuth from "./RequireAuth";

const loading = <Flex justify='center' align='center'><LoadingSpinner size={40} /></Flex>

const paymentRoute = <Route path="payment">
    

</Route>