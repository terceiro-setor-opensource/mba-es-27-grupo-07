"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { handleSignIn } from "./actions";

export default function SignIn() {
  return (
    <Flex minH="100vh" align="center" justify="center" p={4}>
      <Box w="100%" maxW="md">
        <Stack spacing={6}>
          <Heading as="h1" size="xl" textAlign="center">
            Meu Cadastro
          </Heading>
          <Box as="form" action={handleSignIn}>
            <FormControl id="name" mb={4} isRequired>
              <FormLabel>Nome</FormLabel>
              <Input type="text" name="name" placeholder="Nome" />
            </FormControl>
            <FormControl id="email" mb={4} isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" placeholder="Email" />
            </FormControl>
            <FormControl id="password" mb={4} isRequired>
              <FormLabel>Senha</FormLabel>
              <Input type="password" name="password" placeholder="Senha" />
            </FormControl>
            <FormControl id="phoneNumber" mb={4} isRequired>
              <FormLabel>Número de Telefone</FormLabel>
              <Input
                type="text"
                name="phoneNumber"
                placeholder="Número de Telefone"
              />
            </FormControl>
            <FormControl id="apartment" mb={4} isRequired>
              <FormLabel>Apartamento</FormLabel>
              <Input type="number" name="apartment" placeholder="Apartamento" />
            </FormControl>
            <FormControl id="block" mb={4} isRequired>
              <FormLabel>Bloco</FormLabel>
              <Input type="text" name="block" placeholder="Bloco" />
            </FormControl>
            <Button type="submit" colorScheme="teal" size="md" w="100%">
              Cadastrar
            </Button>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}
