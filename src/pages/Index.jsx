import React, { useState } from "react";
import { Box, Button, Container, Flex, Heading, Input, Select, Text, VStack, Image, useToast } from "@chakra-ui/react";
import { FaPlane, FaCalendarAlt, FaSearch } from "react-icons/fa";

const Index = () => {
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const toast = useToast();

  const handleSearch = () => {
    if (destination && departureDate) {
      toast({
        title: "Search initiated",
        description: `Searching flights to ${destination} on ${departureDate}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bgGradient="linear(to-r, blue.400, purple.500)" minHeight="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Flex justifyContent="space-between" alignItems="center">
            <Heading color="white" fontSize="4xl">TravelEase</Heading>
            <Image src="/logo.png" alt="TravelEase Logo" boxSize="50px" />
          </Flex>
          
          <Box bg="white" borderRadius="xl" p={8} shadow="2xl">
            <VStack spacing={6}>
              <Heading size="lg" color="gray.700">Find Your Perfect Flight</Heading>
              
              <Flex width="100%" gap={4} flexWrap="wrap">
                <Flex flex={1} minW="200px" alignItems="center">
                  <FaPlane color="gray.500" />
                  <Input 
                    ml={2}
                    placeholder="Where to?" 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </Flex>
                
                <Flex flex={1} minW="200px" alignItems="center">
                  <FaCalendarAlt color="gray.500" />
                  <Input 
                    ml={2}
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />
                </Flex>
                
                <Button 
                  colorScheme="blue" 
                  leftIcon={<FaSearch />}
                  onClick={handleSearch}
                  minW="150px"
                >
                  Search Flights
                </Button>
              </Flex>
            </VStack>
          </Box>
          
          <Box bg="white" borderRadius="xl" p={8} shadow="2xl">
            <Heading size="md" mb={4} color="gray.700">Popular Destinations</Heading>
            <Flex justifyContent="space-between" flexWrap="wrap">
              {["Paris", "Tokyo", "New York", "Sydney"].map((city) => (
                <Box 
                  key={city} 
                  bg="gray.100" 
                  borderRadius="lg" 
                  p={4} 
                  textAlign="center"
                  minW="150px"
                  mb={4}
                >
                  <Text fontWeight="bold">{city}</Text>
                  <Text fontSize="sm" color="gray.500">Flights from $299</Text>
                </Box>
              ))}
            </Flex>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;