import React, { useState, useEffect } from "react";
import { Box, Button, Container, Flex, Heading, Input, Select, Text, VStack, Image, useToast } from "@chakra-ui/react";
import { FaPlane, FaCalendarAlt, FaSearch } from "react-icons/fa";

const Index = () => {
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const toast = useToast();

  const mockSearchFlights = (destination, date) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResults = [
          { id: 1, airline: 'AirEase', departure: '08:00', arrival: '10:30', price: 299 },
          { id: 2, airline: 'SkyHigh', departure: '10:30', arrival: '13:00', price: 349 },
          { id: 3, airline: 'JetStream', departure: '14:00', arrival: '16:30', price: 279 },
        ];
        resolve(mockResults);
      }, 1000);
    });
  };

  const handleSearch = async () => {
    if (destination && departureDate) {
      toast({
        title: "Searching flights",
        description: `Looking for flights to ${destination} on ${departureDate}`,
        status: "info",
        duration: 2000,
        isClosable: true,
      });
      try {
        const results = await mockSearchFlights(destination, departureDate);
        setSearchResults(results);
        toast({
          title: "Search completed",
          description: `Found ${results.length} flights`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while searching for flights",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
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

          {searchResults.length > 0 && (
            <Box bg="white" borderRadius="xl" p={8} shadow="2xl" mt={8}>
              <Heading size="md" mb={4} color="gray.700">Flight Search Results</Heading>
              <VStack spacing={4} align="stretch">
                {searchResults.map((flight) => (
                  <Box key={flight.id} borderWidth={1} borderRadius="lg" p={4}>
                    <Flex justifyContent="space-between" alignItems="center">
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="bold">{flight.airline}</Text>
                        <Text fontSize="sm">Departure: {flight.departure}</Text>
                        <Text fontSize="sm">Arrival: {flight.arrival}</Text>
                      </VStack>
                      <VStack align="end" spacing={1}>
                        <Text fontWeight="bold" color="green.500">${flight.price}</Text>
                        <Button size="sm" colorScheme="blue">Book Now</Button>
                      </VStack>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;