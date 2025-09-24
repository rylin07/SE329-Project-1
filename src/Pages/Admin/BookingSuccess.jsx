import React from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function BookingSuccess() {
    return (
        <Box minH={"60vh"} display="flex" alignitems="center" justifyContent="center">
            <Box bg="white" p={8} rounded="x1" shadow="md" textAlign="center">
                <Heading size="lg" mb={2}>Successfully booked! </Heading>
                <Text color={"gray.600"} mb={6}>
                    Your reservation has been confirmed.
                </Text>
                <Button as={RouterLink} to={"/"} colorScheme={"teal"}>Back to Home</Button>
            </Box>
        </Box>
    );
}