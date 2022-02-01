import { createContext, useContext, useEffect, useState } from 'react';
export const QuestionContext = createContext();
export const useQuestionContext = () => useContext(QuestionContext);

import { getQuestions } from '../services/questions';

const QuestionContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(async () => {
    try {
      const allQuestions = await getQuestions();
      setQuestions(allQuestions.data);
    } catch (error) {
      return;
    }
  }, []);
  return (
    <QuestionContext.Provider value={{ questions, setQuestions }}>
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionContextProvider;
