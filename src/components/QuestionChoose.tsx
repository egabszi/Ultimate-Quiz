import { questionCategories, questionDifficulties, questionTypes } from "../assets/question_options"

// change types to something else from any
const QuestionChoose = ({handleOnClick}: any) => {
    return (
        <div>
            {/* when making component, make a [{value: categorynumber, label: categoryname}] and map through */}
            <select name="categories" id="categories">
                {questionCategories.map((category: any) => (
                    <option key={category.number} value={category.number}>{category.name}</option>
                ))}
            </select>
            <select name="difficulty" id="difficulty">
                {questionDifficulties.map((difficulty: any) => (
                    <option key={difficulty.difficulty} value={difficulty.difficulty}>{difficulty.name}</option>
                ))}
            </select>
            <select name="type" id="type">
                {questionTypes.map((type: any) => (
                    <option key={type.type} value={type.type}>{type.name}</option>
                ))}
            </select>
            <button className="bg-blue-200" onClick={handleOnClick}>Submit</button>
        </div>
    )
}

export default QuestionChoose;