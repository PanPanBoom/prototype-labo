import {
  forwardRef,
  useImperativeHandle,
  useState,
  type ForwardedRef,
  ChangeEvent,
} from "react";
import type { FormQuestion } from "./AIForm";

type QuestionProps = {
  data: FormQuestion;
  index: number;
};

export type QuestionRef = {
  getAnswers: () => any;
};

const Question = forwardRef<QuestionRef, QuestionProps>(
  ({ data, index }, ref: ForwardedRef<QuestionRef>) => {
    const [selectedAnswer, setSelectedAnswer] = useState(0);
    const [inputs, setInputs] = useState<boolean[]>(Array(data.options?.length || 0).fill(false));
    const [inputValue, setInputValue] = useState("");

    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSelectedAnswer(parseInt(event.target.value));
    };

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
      const i = parseInt(event.target.value);
      const updatedInputs = [...inputs];
      updatedInputs[i] = !updatedInputs[i];
      setInputs(updatedInputs);
    };

    useImperativeHandle(ref, () => ({
      getAnswers() {
        const res: Record<string, string | string[] | null> = {};

        if (data.type === "radio") {
          res[data.category] = data.options?.[selectedAnswer] ?? null;
        } else if (data.type === "checkbox") {
          res[data.category] =
            data.options?.filter((_, i) => inputs[i]) ?? [];
        } else {
          res[data.category] = inputValue === "" ? null : inputValue;
        }

        return res;
        
      },
    }));

    return (
      <section>
        <h4>
          {index}. {data.question}
        </h4>
        {data.options && data.options.length > 0 ? (
          <ul>
            {data.options.map((answer, i) => (
              <li key={i}>
                <label>
                  <input
                    type={data.type}
                    name={data.id}
                    value={i}
                    checked={
                      data.type === "radio"
                        ? selectedAnswer === i
                        : inputs[i]
                    }
                    onChange={
                      data.type === "radio"
                        ? handleRadioChange
                        : handleCheckboxChange
                    }
                  />
                  {answer}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <input
            type={data.type}
            className="border-1 rounded-md p-1"
            placeholder={data.placeholder}
            id="text"
            onChange={(e) => setInputValue(e.target.value)}
          />
        )}
      </section>
    );
  }
);

export default Question;
