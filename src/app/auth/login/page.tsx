"use client";

import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { handleLogin } from "./actions";

export default function Login() {
  const [error, setError] = useState<string | null>(null);

  return (
    <Flex minH="100vh" align="center" justify="center" p={4}>
      <Box w="100%" maxW="md">
        <Stack spacing={6}>
          <Heading as="h1" size="xl" textAlign="center">
            Acesse
          </Heading>
          <Box
            as="form"
            action={async (formData: FormData) => {
              const result = await handleLogin(formData);

              if (result.error) {
                setError(result.error);
                return;
              }

              setError(null);
            }}
          >
            <FormControl id="email" mb={4} isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" placeholder="Email" />
            </FormControl>
            <FormControl id="password" mb={4} isRequired>
              <FormLabel>Senha</FormLabel>
              <Input type="password" name="password" placeholder="Senha" />
            </FormControl>
            <Button type="submit" colorScheme="teal" size="md" w="100%">
              Entrar
            </Button>
            <Text
              marginTop="2"
              color="red"
              fontWeight="bold"
              textAlign="center"
            >
              {error}
            </Text>
          </Box>
          <Box textAlign="center" mt={4}>
            <Button
              as={Link}
              href="/auth/signin"
              colorScheme="teal"
              variant="link"
            >
              Não tem uma conta? Cadastre-se
            </Button>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}
