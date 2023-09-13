const QuestionAndAnswers = ({ questionIndex, questions, answers, nextQuestion } : any) => {
  
  return (
    <div>
    <h1>{questionIndex + 1}. Question </h1><h1 dangerouslySetInnerHTML={{ __html: questions.results[questionIndex].question}}></h1>
    {answers.map((answer: string, index: number) =>
      <button key={index} className="bg-blue-200 ml-2" value={answer} onClick={() => nextQuestion(answer)} dangerouslySetInnerHTML={{ __html: answer }}></button>
    )}
  </div>
  )
}

export default QuestionAndAnswers