const QuestionCard = ({
  question,
  addQuestion,
  updateQuestion,
  addOption,
  deleteOption,
  deleteQuestion,
  duplicateQuestion,
  isActive,
  setActiveQuestion,
}) => {
  //   const [type, setType] = useState(question.type);
  return (
    <div
      className={`question-card ${isActive ? "active" : ""}`} tabIndex={0}   
      onClick={() => setActiveQuestion(question.id)}
    >
      {isActive && (
        <div className="toolbar">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addQuestion();
            }}
          >
            ➕
          </button>
          <button onClick={() => duplicateQuestion(question.id)}>📋</button>
          <button onClick={() => deleteQuestion(question.id)}>🗑</button>
        </div>
      )}

      <div className="question-top">
        <input
          type="text"
          placeholder="Question"
          className="question-input"
          value={question.question}
          onChange={(e) =>
            updateQuestion(question.id, "question", e.target.value)
          }
        />
        <select
          id=""
          className="question-type"
          value={question.type}
          onChange={(e) => updateQuestion(question.id, "type", e.target.value)}
        >
          <option value="short">Short answer</option>
          <option value="paragraph">Paragraph</option>
          <option value="multiple">Multiple choice</option>
          <option value="checkboxes">Checkboxes</option>
          <option value="dropdown">Dropdown</option>
          <option value="scale">Linear scale</option>
          <option value="rating">Rating</option>
          <option value="choice-grid">Multiple choice grid</option>
          <option value="checkbox-grid">Checkbox grid</option>
          <option value="date">Date</option>
          <option value="time">Time</option>
        </select>
      </div>

      {question.type === "multiple" && (
        <div className="options">
          {question.options.map((opt, i) => (
            <div key={i} className="option">
              <input type="radio" disabled />
              <input
                type="text"
                value={opt}
                onChange={(e) => {
                  const newOptions = [...question.options];
                  newOptions[i] = e.target.value;
                  updateQuestion(question.id, "options", newOptions);
                }}
              />
              <span
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteOption(question.id, i);
                }}
              >
                ✕
              </span>
            </div>
          ))}

          <div
            className="option add-option-row"
            onClick={() => addOption(question.id)}
          >
            <input type="radio" disabled />

            <span className="add-option-text">
              Add option or <span className="add-other">add "Other"</span>
            </span>
          </div>
        </div>
      )}

      {question.type === "short" && (
        <input
          type="text"
          placeholder="Short answer text"
          className="answer-input"
          disabled
        />
      )}

      {question.type === "paragraph" && (
        <input
          type="text"
          placeholder="Long answer text"
          className="answer-input"
          disabled
        />
      )}

      {question.type === "checkboxes" && (
        <div className="options">
          {question.options.map((opt, i) => (
            <div key={i} className="option">
              <input type="checkbox" disabled />
              <input
                type="text"
                value={opt}
                onChange={(e) => {
                  const newOptions = [...question.options];
                  newOptions[i] = e.target.value;
                  updateQuestion(question.id, "options", newOptions);
                }}
              />
              <span
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteOption(question.id, i);
                }}
              >
                ✕
              </span>
            </div>
          ))}

          <div
            className="option add-option-row"
            onClick={() => addOption(question.id)}
          >
            <input type="checkbox" disabled />
            <span className="add-option-text">
              Add option or <span className="add-other">add "Other"</span>
            </span>
          </div>
        </div>
      )}


      {question.type === "dropdown" && (
        <div className="options">
  
          {question.options.map((opt, i) => (
            <div key={i} className="option">
              {/* <input type="" disabled /> */}
              <span className="option-index">{i + 1}.</span>
              <input
                type="text"
                value={opt}
                onChange={(e) => {
                  const newOptions = [...question.options];
                  newOptions[i] = e.target.value;
                  updateQuestion(question.id, "options", newOptions);
                }}
              />
              <span
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteOption(question.id, i);
                }}
              >
                ✕
              </span>
            </div>
          ))}

          <div
            className="option add-option-row"
            onClick={() => addOption(question.id)}
          >
            {/* <input type="" disabled /> */}
            <span className="option-index">{question.options.length + 1}.</span>

            <span className="add-option-text">
              Add option
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
