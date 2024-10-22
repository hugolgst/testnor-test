import { Flex, Heading, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react'

import useTasksStore from '@/store/tasks'

interface TagList {
  activeTags: Array<string>
  setActiveTags: (tags: Array<string>) => void
}

const TagList = ({ activeTags, setActiveTags }: TagList) => {
  const { tags } = useTasksStore()

  return <Flex 
    direction="column"
    gap="20px"
  >
    <Heading fontSize="1.6em">Filter by tags</Heading>

    <Flex 
      direction="column"
      gap="10px"
    >
      {Object.entries(tags).map(([ tag, color ]) => (<Tag
        key={tag}
        backgroundColor={color}
        w="min-content"
        size="lg"
        cursor="pointer"
        onClick={() => {
          if (activeTags.includes(tag)) {
            setActiveTags(activeTags.filter(_tag => _tag !== tag))
          } else {
            setActiveTags([ ...activeTags, tag ])
          }
        }}
      >
        <TagLabel>{tag}</TagLabel>
        { activeTags.includes(tag) && <TagCloseButton /> }
      </Tag>))}
    </Flex>
  </Flex>
}

export default TagList
