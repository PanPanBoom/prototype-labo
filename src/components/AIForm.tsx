import { useRef } from "react";
import Question, { type QuestionRef } from "./Question";

type FormCategory =
  | "competences"
  | "formations"
  | "experiences_professionnelles"
  | "langues";

type QuestionType =
  | "text"
  | "radio"
  | "date"
  | "number"
  | "textarea"
  | "checkbox";

export interface FormQuestion {
    id: string;
    question: string;
    type: QuestionType;
    options?: string[];
    category: FormCategory;
    placeholder: string;
    required: boolean;
}

type AIFormProps = {
    data: FormQuestion[];
    onSubmit: (newTags: {}) => void;
}

const AIForm = (props: AIFormProps) => {
    const childRef = useRef<QuestionRef[]>([]);

    const onSubmit = () => {
        const merged = mergeArrayOfObjects(childRef.current?.map((ref) => ref?.getAnswers()));

        props.onSubmit(merged);
    }

    function mergeArrayOfObjects(arr: []) {
        const result = {};

        arr.forEach((obj) => {
            const key = Object.keys(obj)[0];
            const value = obj[key];

            if (value === null || (Array.isArray(value) && value.length === 0)) return;

            if (result[key]) {
            // Si clé déjà présente, fusionner
            const existing = Array.isArray(result[key]) ? result[key] : [result[key]];
            const toAdd = Array.isArray(value) ? value : [value];
            result[key] = existing.concat(toAdd);
            } else {
            // Première occurrence
            result[key] = Array.isArray(value) ? value : [value];
            }
        });

        return result;
        }

    return (
        <article className="bg-white text-black rounded-lg p-3">
            <ul>
                {props.data.map((question, index) => {
                    return (
                        <li className="py-2" key={index}>
                            <Question data={question} index={index + 1} ref={(el) => { childRef.current[index] = el!; }}/>
                        </li>
                    )
                })}
            </ul>

            <button className="text-white" onClick={onSubmit}>Valider</button>
        </article>
    )
}

export default AIForm