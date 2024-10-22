'use client'

import { Flex, Heading, chakra } from '@chakra-ui/react'

const Page = () => {
  return <Flex
    w="100vw" h="100vh"
    gap="20px"
    p="40px"
  >
    <Flex 
      flex="1" h="100%"
    >

    </Flex>

    <Flex 
      flex="2" h="100%"
    >
      <Heading size="2xl">
        Today <chakra.span fontSize="0.6em" color="grey">(5)</chakra.span>
      </Heading>
    </Flex>

    <Flex 
      flex="1" h="100%"
    >

    </Flex>
  </Flex>
}

export default Page
