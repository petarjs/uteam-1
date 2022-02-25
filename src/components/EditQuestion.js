import { Button, HStack, Input, Text, Select, VStack, Heading } from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { useQuestionContext } from './QuestionContextProvider';
import { editQuestion } from '../services/questions';
import { getQuestions } from '../services/questions';
import { useToast } from '@chakra-ui/react';

const EditQuestions = () => {
  const toast = useToast();
  const { setQuestions } = useQuestionContext();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await editQuestion(window.localStorage.getItem('questionId'), data.text, data.option);

      const allQuestions = await getQuestions();
      setQuestions(allQuestions.data);
      toast({
        title: 'Question edited.',

        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VStack pt="14vh">
      <Heading
        mb={['32px !important']}
        fontWeight="bold"
        size="2xl"
        bgGradient="linear(to-r, #87d4cd, #38C6BD, #87d4cd)"
        bgClip="text"
        position="relative"
        zIndex="1"
        pb="6px"
      >
        Edit Questions
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack>
          <Input
            variant="filled"
            placeholder={window.localStorage.getItem('questionText')}
            type="text"
            {...register('text', { required: true })}
          />
          <Button bg="#87d4cd" px="8" type="submit" color="white" cursor="pointer">
            Edit Question
          </Button>
        </HStack>
        {errors.text && (
          <Text color="red" fontSize="15px" mt={3}>
            This field is required
          </Text>
        )}
        <Select
          color="gray.400"
          mt="30px"
          variant="filled"
          w="67%"
          placeholder="Select question type"
          {...register('option', { required: true })}
        >
          <option value="text">Text</option>
          <option value="long_text">Long text</option>
          <option value="image">Image</option>
        </Select>
        {errors.option && (
          <Text color="red" fontSize="15px" mt={3}>
            This field is required
          </Text>
        )}
      </form>
    </VStack>
  );
};

export default EditQuestions;
