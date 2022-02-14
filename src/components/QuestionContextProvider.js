import { createContext, useContext, useEffect, useState } from 'react';
export const QuestionContext = createContext();
export const useQuestionContext = () => useContext(QuestionContext);

import { getQuestions } from '../services/questions';

const QuestionContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  const handleGetQuestions = async () => {
    useEffect(async () => {
      try {
        const allQuestions = await getQuestions(window.localStorage.getItem('companyId'));
        window.localStorage.setItem('allQuestions', JSON.stringify(allQuestions.data));
        setQuestions(JSON.parse(window.localStorage.getItem('allQuestions')));
      } catch (error) {
        return;
      }
    }, []);
  };

  return (
    <QuestionContext.Provider value={{ questions, setQuestions, handleGetQuestions }}>
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionContextProvider;
