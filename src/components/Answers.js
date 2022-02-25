import {
  Heading,
  HStack,
  VStack,
  Button,
  Box,
  FormControl,
  InputGroup,
  FormLabel,
  Input,
  Text,
  Image,
  Badge,
  Textarea,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';

import { useQuestionContext } from './QuestionContextProvider';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import leafImage from '../assets/leaf.png';
import cloudImage from '../assets/cloud.png';
import { uploadPhoto } from '../services/upload';
import { postAnswer } from '../services/answer';
const Answers = () => {
  const { register, handleSubmit, watch, setValue } = useForm();

  const { questions, handleGetQuestions } = useQuestionContext();
  handleGetQuestions();

  const [step, setStep] = useState(0);
  const filePicker = useRef(null);
  const [files, setFiles] = useState([]);
  const [allAnswers, setAllAnswers] = useState(new Array(questions.length));
  const watchFields = watch(
    Array.apply(null, Array(questions.length)).map((val, idx) => `step-${idx}`)
  );
  const [successScreen, setSuccessScreen] = useState(false);

  const handleNextButton = () => {
    setAllAnswers((previousAnswers) => {
      let newAnswers = [...previousAnswers];
      if (questions[step].attributes.type === 'image') {
        newAnswers[step] = files;
      } else {
        newAnswers[step] = watchFields[step];
      }

      return newAnswers;
    });

    if (step + 1 === questions.length) {
      return;
    } else {
      setStep((previousValue) => previousValue + 1);
    }
  };

  useEffect(() => {
    setValue(`step-${step}`, allAnswers[step]);
  }, [step]);

  const handleQuestionUp = () => {
    if (step + 1 === questions.length) {
      return;
    }
    setStep((previousValue) => previousValue + 1);
  };

  const handleQuestionDown = () => {
    if (step === 0) {
      return;
    }
    setStep((previousValue) => previousValue - 1);
  };

  const handleFileUpload = (e) => {
    setFiles((currentPickedFiles) => {
      let newFiles = [...currentPickedFiles];
      newFiles = newFiles.filter((element) => element.step != step);
      newFiles.push({ step: step, file: e.target.files });
      return newFiles;
    });
  };

  const onSubmit = async () => {
    let finalAnswers = [...allAnswers];
    if (questions[step].attributes.type === 'image') {
      finalAnswers[step] = files;
    } else {
      finalAnswers[step] = watchFields[step];
    }

    for (let i = 0; i < finalAnswers.length; i++) {
      if (finalAnswers[i] === undefined || !finalAnswers[i][0]) {
        return;
      }
    }

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].attributes.type === 'image') {
        let formData = new FormData();
        formData.append('files', finalAnswers[i][0].file[0]);
        const photoResponse = await uploadPhoto(formData);
        const photoId = photoResponse.data[0].id;
        await postAnswer(
          questions[i].id,
          window.localStorage.getItem('profileId'),
          photoId.toString()
        );
      } else {
        await postAnswer(
          questions[i].id,
          window.localStorage.getItem('profileId'),
          finalAnswers[i]
        );
      }
    }

    setSuccessScreen(true);
  };

  // In case question list is empty
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
        {successScreen ? '' : 'Answers'}
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
      {!successScreen ? (
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
                      {step + 1}/{questions.length}
                    </Text>
                    <IoMdArrowDropdown color="white" fontSize="30px" onClick={handleQuestionDown} />
                  </VStack>
                  <Text color="white" fontSize="20px">
                    {questions[step].attributes.text}
                  </Text>
                </HStack>

                <FormControl>
                  <InputGroup>
                    {questions[step].attributes.type === 'text' ? (
                      <Input
                        bg="white"
                        borderColor="white"
                        type="text"
                        placeholder="Your answer"
                        {...register(`step-${step}`, { required: true })}
                      />
                    ) : null}
                    {questions[step].attributes.type === 'long_text' ? (
                      <Textarea
                        bg="white"
                        borderColor="white"
                        type="text"
                        placeholder="Your answer"
                        {...register(`step-${step}`, { required: true })}
                      ></Textarea>
                    ) : null}
                    {questions[step].attributes.type === 'image' ? (
                      <InputGroup
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
                          {files.filter((file) => file.step == step).length > 0
                            ? files.filter((file) => file.step == step)[0].file[0].name
                            : 'Upload File'}
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
                        <Input type="file" ref={filePicker} d="none" onChange={handleFileUpload} />
                      </InputGroup>
                    ) : null}
                  </InputGroup>
                </FormControl>

                {step + 1 === questions.length ? (
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
      ) : (
        <VStack pt="14vh" w="70%">
          <VStack
            position="relative"
            borderRadius="20px"
            bg="#87d4cd"
            p="20px"
            w="100%"
            justifyContent="space-around"
            border="4px solid white"
          >
            <Text color="white" fontSize="30px" fontWeight="bold" mt="40px" mb="40px">
              Thank you for the answers!
            </Text>
          </VStack>
        </VStack>
      )}
      {allAnswers.filter((answer) => answer === undefined).length > 0 && (
        <Text color="red" fontSize="15px" mt={3}>
          All fields are required before submiting
        </Text>
      )}
    </VStack>
  );
};

export default Answers;
