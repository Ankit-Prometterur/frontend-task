import { useState } from "react";
import QuestionCard from "./QuestionCard";
import FormHeader from "./FormHeader";

const FormBuilder = () => {

  // 🔥 Question Factory
  const createQuestion = (type = "multiple") => {
    const base = {
      id: Date.now(),
      type,
      question: "",
      required: false,
    };

    switch (type) {
      case "multiple":
      case "checkboxes":
      case "dropdown":
        return {
          ...base,
          options: ["Option 1"],
        };

      case "scale":
        return {
          ...base,
          scale: {
            min: 1,
            max: 5,
            minLabel: "",
            maxLabel: "",
          },
        };

      case "short":
      case "paragraph":
        return {
          ...base,
          answer: "",
        };

      default:
        return base;
    }
  };

  const [form, setForm] = useState({
    title: "Untitled form",
    description: "",
    questions: [createQuestion("multiple")],
  });

  const [activeQuestionId, setActiveQuestionId] = useState(
    form.questions[0]?.id
  );

  const updateQuestion = (id, field, value) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      ),
    }));
  };

  const changeQuestionType = (id, newType) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === id
          ? {
              ...createQuestion(newType), 
              id: q.id,                   
              question: q.question,       
              required: q.required,       
            }
          : q
      ),
    }));
  };

  const addOption = (id) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === id
          ? {
              ...q,
              options: [...(q.options || []), `Option ${(q.options?.length || 0) + 1}`],
            }
          : q
      ),
    }));
  };

  const deleteOption = (id, index) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === id
          ? {
              ...q,
              options: q.options.filter((_, i) => i !== index),
            }
          : q
      ),
    }));
  };

  const addQuestion = (type = "multiple") => {
    const newQuestion = createQuestion(type);

    setForm((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));

    setActiveQuestionId(newQuestion.id);
  };

  const deleteQuestion = (id) => {
    setForm((prev) => {
      const updated = prev.questions.filter((q) => q.id !== id);
      return { ...prev, questions: updated };
    });

    setActiveQuestionId(null);
  };

  const duplicateQuestion = (id) => {
    const q = form.questions.find((q) => q.id === id);

    const copy = JSON.parse(JSON.stringify(q));
    copy.id = Date.now();

    setForm((prev) => ({
      ...prev,
      questions: [...prev.questions, copy],
    }));
  };

  const handleHeaderChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  console.log(form);

  return (
    <div className="form-container">
      <FormHeader
        title={form.title}
        description={form.description}
        onChangeInput={handleHeaderChange}
      />
      {form.questions.length === 0 && (
        <div className="header-toolbar-floating">
          <button onClick={() => addQuestion()} className="toolbar-btn">
            ➕
          </button>
        </div>
      )}

      {form.questions.map((q) => (
        <div className="question-wrapper" key={q.id}>
          <QuestionCard
            question={q}
            updateQuestion={updateQuestion}
            changeQuestionType={changeQuestionType}  
            addOption={addOption}
            deleteOption={deleteOption}
            isActive={q.id === activeQuestionId}
            setActiveQuestion={setActiveQuestionId}
            addQuestion={addQuestion}
            deleteQuestion={deleteQuestion}
            duplicateQuestion={duplicateQuestion}
          />
        </div>
      ))}
    </div>
  );
};

export default FormBuilder;