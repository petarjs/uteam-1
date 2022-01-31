import { HStack, VStack, Text, IconButton, StackDivider, Spacer, Badge } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { useAuthContext } from './AuthContextProvider';
import { deleteQuestions } from '../services/questions';

const QuestionList = () => {
  const { questions, setQuestions } = useAuthContext();
  if (!questions.length) {
    return (
      <Badge colorScheme="green" p="4" m="4" borderRadius="lg">
        No Questions yet!
      </Badge>
    );
  }
  const deleteQuestion = (id) => {
    deleteQuestions(id);
    const newQuestions = questions.filter((question) => {
      return question.id !== id;
    });
    setQuestions(newQuestions);
  };
  return (
    <VStack
      divider={<StackDivider />}
      borderColor="gray.100"
      borderWidth="2px"
      p="4"
      borderRadius="lg"
      w="100%"
      maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
      alignItems="stretch"
    >
      {questions.map((questions) => (
        <HStack key={questions.id}>
          <Text>{questions.attributes.text}</Text>
          <Spacer />
          <IconButton
            icon={<FaTrash />}
            isRound="true"
            onClick={() => deleteQuestion(questions.id)}
          />
        </HStack>
      ))}
    </VStack>
  );
};

export default QuestionList;
