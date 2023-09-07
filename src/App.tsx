import { useState } from "react"
import WelcomeDescription from "./components/WelcomeDescription"
import QuestionChoose from "./components/QuestionChoose"
import QuestionsAndAnswers from "./components/QuestionsAndAnswers"

function App() {
  const [questions, setQuestions] = useState([] as any)
  const [isSubmitted, setisSubmitted] = useState(false)
  const [questionIndex, setquestionIndex] = useState(0)
  const [answers, setAnswers] = useState([] as string[])
  const [correctAnswers, setCorrectAnswers] = useState(0)

  function getValues(): { categoryValue: string | null, difficultyValue: string | null, typeValue: string | null } {
    const categoryValue = (document.getElementById("categories") as HTMLSelectElement)?.value;
    const difficultyValue = (document.getElementById("difficulty") as HTMLSelectElement)?.value;
    const typeValue = (document.getElementById("type") as HTMLSelectElement)?.value;
    return { categoryValue, difficultyValue, typeValue };
  }

  function shuffleArray(array: string[]) {
    if (array.length > 2) {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    }
    return ["True", "False"];
  }


  async function getQuestions() {
    const { categoryValue, difficultyValue, typeValue } = getValues();

    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${categoryValue}&difficulty=${difficultyValue}&type=${typeValue}`);
      const data = await response.json();
      const allAnswers = data.results[0].incorrect_answers.concat(data.results[0].correct_answer)
      setQuestions(data);
      setAnswers(shuffleArray(allAnswers));
      setisSubmitted(true);
      setquestionIndex(0);
      setCorrectAnswers(0);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }


  function nextQuestion(answer: string) {
    const currentQuestion = questions.results[questionIndex]

    if (questionIndex < 9) {
      const nextQuestion = questions.results[questionIndex + 1];
      const nextAnswers = nextQuestion.incorrect_answers.concat(nextQuestion.correct_answer);

      setquestionIndex(questionIndex + 1);
      setAnswers(shuffleArray(nextAnswers));
    }
    if (answer === currentQuestion.correct_answer) {
      setCorrectAnswers(correctAnswers + 1);
    }
    setquestionIndex(questionIndex + 1);
  }


  return (
    <>
      <div className="w-[80%] h-[100%] bg-red-200 flex flex-col m-auto">
        <h1 className="text-4xl">Ultimate Quiz Challenge!</h1>
        <QuestionChoose handleOnClick={getQuestions} />
        {questionIndex === 10 ?
          <h1>Your points: {correctAnswers}/10</h1> :
          (isSubmitted ?
           <QuestionsAndAnswers questionIndex={questionIndex} questions={questions} answers={answers} nextQuestion={nextQuestion} correctAnswers={correctAnswers} /> :
            <WelcomeDescription />
          )}
      </div>
    </>
  )
}

export default App
