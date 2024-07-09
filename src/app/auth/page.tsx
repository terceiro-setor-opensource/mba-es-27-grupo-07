"use client";

import { Image, Link } from "@chakra-ui/next-js";
import { Flex, HStack, Stack, Text, Icon, Button } from "@chakra-ui/react";
import {
  ContactRoundIcon,
  EarthIcon,
  LockKeyholeIcon,
  SmartphoneIcon,
} from "lucide-react";

export default function Auth() {
  return (
    <Stack minHeight="100vh" align="center" justify="center" padding={4}>
      <Image src="/logo.png" alt="Logo" width={268} height={240} />
      <Stack gap="10" fontSize="sm" maxWidth="96">
        <HStack gap="3">
          <Icon color="orange.400" as={EarthIcon} fontSize="48" />
          <Text lineHeight="4">
            <b>Conecte-se com sua comunidade:</b> Encontre e anuncie produtos
            com facilidade, conectando-se diretamente com seus vizinhos. Sem
            mais confusão em grupos de WhatsApp!
          </Text>
        </HStack>
        <HStack gap="3">
          <Icon color="orange.400" as={SmartphoneIcon} fontSize="48" />
          <Text lineHeight="4">
            <b>Anúncios rápidos e fáceis:</b> Publique seus produtos com imagens
            e detalhes em minutos. Simples, prático e acessível a todos os
            moradores do condomínio.
          </Text>
        </HStack>
        <HStack gap="3">
          <Icon color="orange.400" as={LockKeyholeIcon} fontSize="48" />
          <Text lineHeight="4">
            <b>Acesso exclusivo para moradores:</b> Navegue pelos anúncios mais
            recentes e encontre o que precisa sem sair do condomínio. Segurança
            e comodidade na palma da sua mão.
          </Text>
        </HStack>
        <HStack gap="3">
          <Icon color="orange.400" as={ContactRoundIcon} fontSize="48" />
          <Text lineHeight="4">
            <b>Contatos diretos e seguros:</b> Veja os detalhes dos produtos e
            entre em contato direto com o anunciante. Tudo de forma rápida,
            segura e organizada.
          </Text>
        </HStack>
      </Stack>
      <Stack marginTop="6" width="96" p="4" gap="2">
        <Button
          as={Link}
          href="/auth/login"
          colorScheme="orange"
          variant="solid"
          size="lg"
          borderRadius="50"
        >
          Faça login
        </Button>
        <Button
          as={Link}
          href="/auth/signin"
          colorScheme="teal"
          variant="solid"
          size="lg"
          borderRadius="50"
        >
          Crie sua conta
        </Button>
      </Stack>
    </Stack>
  );
}
