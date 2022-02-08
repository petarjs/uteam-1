import {
  HStack,
  VStack,
  Text,
  IconButton,
  StackDivider,
  Spacer,
  Badge,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { useQuestionContext } from './QuestionContextProvider';
import { deleteQuestions } from '../services/questions';

const QuestionList = () => {
  const { questions, setQuestions } = useQuestionContext();
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

  const setQuestion = async (id, text) => {
    window.localStorage.setItem('questionId', id);
    window.localStorage.setItem('questionText', text);
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
      {questions.map((questions, questionNumber = 0) => (
        <HStack key={questions.id}>
          <VStack alignItems="flex-start">
            <Text fontSize="10px" color="gray.300">
              Question {questionNumber + 1} - {questions.attributes.type}
            </Text>

            <Text>{questions.attributes.text}</Text>
          </VStack>

          <Spacer />
          <Link to="/editQuestions">
            <Button onClick={() => setQuestion(questions.id, questions.attributes.text)}>
              Edit
            </Button>
          </Link>

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
