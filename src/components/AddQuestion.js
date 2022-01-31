import { Button, HStack, Input, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAuthContext } from './AuthContextProvider';

const AddQuestion = ({ addQuestion }) => {
  const { questions, setQuestions } = useAuthContext();
  const [questionIsAdded, setQuestionIsAdded] = useState(false);
  const [content, setContent] = useState('');
  const toast = useToast();
  const getUniqueOrder = () => {
    return Date.now() + (Math.random() * 100000).toFixed();
  };

  useEffect(async () => {
    if (questionIsAdded) {
      let newOrder = getUniqueOrder();
      const question = {
        text: content,
        order: newOrder,
      };
      try {
        const createdQuestion = await addQuestion(question);
        setQuestions([...questions, createdQuestion.data]);
        setContent('');
        setQuestionIsAdded(false);
      } catch (error) {
        console.log(error);
      }
    }
  }, [questionIsAdded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content) {
      toast({
        title: 'No content',

        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setQuestionIsAdded(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack mt="8">
        <Input
          variant="filled"
          placeholder="Post your question here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button colorScheme="pink" px="8" type="submit">
          Add Question
        </Button>
      </HStack>
    </form>
  );
};

export default AddQuestion;
