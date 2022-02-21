import {
  Heading,
  HStack,
  VStack,
  Button,
  Box,
  FormControl,
  InputGroup,
  InputLeftElement,
  FormLabel,
  Input,
  Text,
  Image,
  Badge,
  Textarea,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { useAuthContext } from './AuthContextProvider';
import { useQuestionContext } from './QuestionContextProvider';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import leafImage from '../assets/leaf.png';
import cloudImage from '../assets/cloud.png';
import { uploadPhoto } from '../services/upload';
const Answers = () => {
  const { questions, handleGetQuestions } = useQuestionContext();

  handleGetQuestions();
  const [questionNumber, setQuestionNumber] = useState(1);
  const questionMaxNumber = questions.length;
  const [errorVisible, setErrorVisible] = useState(false);
  const filePicker = useRef(null);
  const [files, setFiles] = useState();
  const [allAnswers, setAllAnswers] = useState([]);

  const handleQuestionUp = () => {
    if (questionNumber < questionMaxNumber) {
      console.log(questionNumber);
      setQuestionNumber(questionNumber + 1);
      console.log(questionNumber);
      if (questions[questionNumber - 1].attributes.type !== 'image') {
        console.log(questionNumber);
        document.getElementById(questions[questionNumber - 1].id).value = '';
        const myAnswer = allAnswers.filter((answerr) => {
          return answerr.questionId === questions[questionNumber - 1].id;
        });
        console.log(myAnswer);

        // console.log(questions[questionNumber - 1].id);
      }
    }
  };

  const handleQuestionDown = () => {
    if (questionNumber > 1) {
      setQuestionNumber(questionNumber - 1);
    }
  };

  const handleNextButton = async () => {
    if (questions[questionNumber - 1].attributes.type === 'image') {
      const formData = new FormData();

      if (!files) {
        setErrorVisible(true);
        return;
      }
      const newAnswers = allAnswers.filter((answer) => {
        return answer.questionId !== questions[questionNumber - 1].id;
      });
      setAllAnswers(newAnswers);

      formData.append('files', files[0]);
      const photoResponse = await uploadPhoto(formData);
      setErrorVisible(false);

      setAllAnswers((currentArray) => {
        let newArray = [...currentArray];
        newArray.push({
          questionId: questions[questionNumber - 1].id,
          profileId: parseInt(window.localStorage.getItem('profileId')),
          answer: photoResponse.data[0].id,
        });
        return newArray;
      });
    } else {
      let answerText = document.getElementById(questions[questionNumber - 1].id).value;

      if (document.getElementById(questions[questionNumber - 1].id).value === '') {
        setErrorVisible(true);
        return;
      }

      const newAnswers = allAnswers.filter((answerr) => {
        return answerr.questionId !== questions[questionNumber - 1].id;
      });
      setAllAnswers(newAnswers);

      setErrorVisible(false);
      setAllAnswers((currentArray) => {
        let newArray = [...currentArray];
        newArray.push({
          questionId: questions[questionNumber - 1].id,
          profileId: parseInt(window.localStorage.getItem('profileId')),
          answer: answerText,
        });

        return newArray;
      });
    }
    handleQuestionUp();
  };
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    handleNextButton();
  };
  if (!questions.length) {
    return (
      <VStack mt="14vh">
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
          Answers
        </Heading>
        <Badge colorScheme="green" p="4" m="4" borderRadius="lg">
          No Questions yet!
        </Badge>
      </VStack>
    );
  }

  return (
    <VStack mt="14vh">
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
        Answers
      </Heading>
      <Image
        src={leafImage}
        alt="brand"
        position="absolute"
        top="0px"
        left="90px"
        zIndex="0"
        height="30vh"
      />
      <Image
        src={cloudImage}
        alt="brand"
        position="absolute"
        bottom="-100px"
        right="60px"
        zIndex="0"
        height="30vh"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack
          border="4px solid white"
          pt="0px"
          pb="20px"
          bg="#87d4cd"
          borderRadius="20px"
          w="60vw"
          position="relative"
        >
          <Box bg="gray.200" borderRadius="13px" w="100%" p="10px" mb="10px" textAlign="center">
            <Text color="#3e9e98" fontWeight="bold" fontSize="20px">
              Enter your answers
            </Text>
          </Box>

          <HStack w="80%">
            <VStack w="100%">
              <HStack alignItems="center">
                <VStack mr="2">
                  <IoMdArrowDropup color="white" fontSize="30px" onClick={handleQuestionUp} />
                  <Text alignSelf="flex-start" color="white" fontSize="20px">
                    {questionNumber}/{questionMaxNumber}
                  </Text>
                  <IoMdArrowDropdown color="white" fontSize="30px" onClick={handleQuestionDown} />
                </VStack>

                <Text color="white" fontSize="20px">
                  {questions[questionNumber - 1].attributes.text}
                </Text>
              </HStack>

              <FormControl>
                <InputGroup>
                  {questions[questionNumber - 1].attributes.type === 'text' ? (
                    <Input
                      id={questions[questionNumber - 1].id}
                      bg="white"
                      borderColor="white"
                      type="text"
                      placeholder="Your answer"
                    />
                  ) : null}
                  {questions[questionNumber - 1].attributes.type === 'long_text' ? (
                    <Textarea
                      id={questions[questionNumber - 1].id}
                      bg="white"
                      borderColor="white"
                      type="text"
                      placeholder="Your answer"
                      {...register(`question-${questionNumber}`, { required: true })}
                    ></Textarea>
                  ) : null}
                  {questions[questionNumber - 1].attributes.type === 'image' ? (
                    <InputGroup
                      id={questions[questionNumber - 1].id}
                      justifyContent="space-between"
                      alignItems="center"
                      mt="2"
                      border="1px solid"
                      borderColor="#2FE1D6"
                      borderRadius="5"
                      p={1.5}
                      bg="white"
                    >
                      <FormLabel
                        htmlFor="file-upload"
                        fontSize="14"
                        color="#CBD5E0"
                        fontWeight="semibold"
                      >
                        {files ? files[0].name : 'Upload File'}
                      </FormLabel>
                      <Button
                        _focus="outline-none"
                        _hover={{
                          background: '#2FE1D6',
                        }}
                        color="white"
                        textShadow="1px 1px #e0e0e0"
                        bg="#2FE1D6"
                        h="1.75rem"
                        size="sm"
                        onClick={() => {
                          filePicker.current.click();
                        }}
                      >
                        Choose Photo
                      </Button>
                      <Input
                        id="photo"
                        type="file"
                        ref={filePicker}
                        d="none"
                        onChange={(e) => setFiles(e.target.files)}
                      />
                    </InputGroup>
                  ) : null}
                </InputGroup>
              </FormControl>
              {errorVisible && (
                <Text color="red" fontSize="15px" mt={3}>
                  This field is required
                </Text>
              )}

              {questionNumber === questionMaxNumber ? (
                <Button
                  style={{ marginTop: '35px' }}
                  _hover={{
                    background: '#e0e0e0',
                  }}
                  color="gray"
                  textShadow="1px 1px #e0e0e0"
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  bg="white"
                  borderRadius="10px"
                >
                  Save
                </Button>
              ) : (
                <Button
                  style={{ marginTop: '35px' }}
                  _hover={{
                    background: '#e0e0e0',
                  }}
                  color="gray"
                  textShadow="1px 1px #e0e0e0"
                  borderRadius={0}
                  type="button"
                  variant="solid"
                  bg="white"
                  borderRadius="10px"
                  onClick={handleNextButton}
                >
                  Next
                </Button>
              )}
            </VStack>
          </HStack>
        </VStack>
      </form>
    </VStack>
  );
};

export default Answers;
