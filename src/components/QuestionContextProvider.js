import { createContext, useContext, useEffect, useState } from 'react';
export const QuestionContext = createContext();
export const useQuestionContext = () => useContext(QuestionContext);

import { getQuestions, getAllQuestions } from '../services/questions';

const QuestionContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [maximumOrder, setMaximumOrder] = useState(0);

  const handleGetQuestions = async () => {
    useEffect(async () => {
      try {
        const allQuestions = await getQuestions(window.localStorage.getItem('companyId'));
        const allCompaniesQuestions = await getAllQuestions();
        allQuestions.data.sort(function (a, b) {
          return a.attributes.order - b.attributes.order;
        });
        allCompaniesQuestions.data.data.sort(function (a, b) {
          return a.attributes.order - b.attributes.order;
        });

        window.localStorage.setItem(
          'maximumOrder',
          allCompaniesQuestions.data.data[allCompaniesQuestions.data.data.length - 1].attributes
            .order
        );
        setMaximumOrder(parseInt(window.localStorage.getItem('maximumOrder')));

        window.localStorage.setItem('allQuestions', JSON.stringify(allQuestions.data));

        setQuestions(JSON.parse(window.localStorage.getItem('allQuestions')));
      } catch (error) {
        return;
      }
    }, []);
  };

  return (
    <QuestionContext.Provider
      value={{
        questions,
        setQuestions,
        handleGetQuestions,
        maximumOrder,
        setMaximumOrder,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionContextProvider;
