export interface Questions {
    response_code: number;
    results:       Result[];
}

export interface Result {
    category:          string;
    type:              Type;
    difficulty:        Difficulty;
    question:          string;
    correct_answer:    string;
    incorrect_answers: string[];
}

export enum Difficulty {
    Easy = "easy",
    Medium = "medium",
    Hard = "hard"
}

export enum Type {
    Boolean = "boolean",
    Multiple = "multiple",
}
