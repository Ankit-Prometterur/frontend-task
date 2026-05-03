import { useState } from "react";
import QuestionCard from "./QuestionCard";
import FormHeader from "./FormHeader";

const FormBuilder = () => {
  const [form, setForm] = useState({
    title: "Untitled form",
    description: "",
    questions: [
      {
        id: Date.now(),
        type: "multiple",
        question: "",
        options: ["Option 1"],
        required: false,
      },
    ],
  });

  const [activeQuestionId, setActiveQuestionId] = useState(
    form.questions[0]?.id,
  );

  // console.log(form);

  const updateQuestion = (id, field, value) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q,
      ),
    }));
  };

  const addOption = (id) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === id
          ? { ...q, options: [...q.options, `Option ${q.options.length + 1}`] }
          : q,
      ),
    }));
  };

  const deleteOption = (id, index) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === id
          ? { ...q, options: q.options.filter((_, i) => i !== index) }
          : q,
      ),
    }));
  };

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      type: "multiple",
      question: "",
      options: ["Option 1"],
      required: false,
    };

    setForm((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));

    setActiveQuestionId(newQuestion.id);
  };

  const handleHeaderChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const deleteQuestion = (id) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== id),
    }));
  };

  const duplicateQuestion = (id) => {
    const q = form.questions.find((q) => q.id === id);
    const copy = { ...q, id: Date.now() };

    setForm((prev) => ({
      ...prev,
      questions: [...prev.questions, copy],
    }));
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
          <button onClick={addQuestion} className="toolbar-btn">
            ➕
          </button>
        </div>
      )}

      {form.questions.map((q) => (
        <div className="question-wrapper" key={q.id}>
          <QuestionCard
            question={q}
            updateQuestion={updateQuestion}
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
