const QuestionCard = ({
  question,
  addQuestion,
  updateQuestion,
  addOption,
  deleteOption,
  deleteQuestion,
  duplicateQuestion,
  changeQuestionType,
  isActive,
  setActiveQuestion,
}) => {
  //   const [type, setType] = useState(question.type);
  const getIcon = (type) => {
    switch(type){
      case "heart":
        return "♡";
      case "like":
        return "👍🏻"  
      default:
        return "☆";
    }
  }
  return (
    <div
      className={`question-card ${isActive ? "active" : ""}`}
      tabIndex={0}
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
        {isActive ? (
          <input
            type="text"
            placeholder="Question"
            className="question-input"
            value={question.question}
            onChange={(e) =>
              updateQuestion(question.id, "question", e.target.value)
            }
          />
        ) : (
          <div className="question-text">{question.question || "Question"}</div>
        )}

        {isActive && (
          <select
            id=""
            className="question-type"
            value={question.type}
            onChange={(e) => changeQuestionType(question.id, e.target.value)}
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
        )}
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

            <span className="add-option-text">Add option</span>
          </div>
        </div>
      )}

      {question.type === "scale" && (
        <div className="scale-container">
          {isActive ? (
            <>
              <div className="scale-range">
                <select
                  value={question.scale.min}
                  onChange={(e) =>
                    updateQuestion(question.id, "scale", {
                      ...question.scale,
                      min: Number(e.target.value),
                    })
                  }
                >
                  {[0, 1].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>

                <span>to</span>

                <select
                  value={question.scale.max}
                  onChange={(e) =>
                    updateQuestion(question.id, "scale", {
                      ...question.scale,
                      max: Number(e.target.value),
                    })
                  }
                >
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div className="scale-labels">
                <div className="scale-label-item">
                  <span className="range-que">{question.scale.min}</span>
                  <input
                    type="text"
                    placeholder="Label (optional)"
                    value={question.scale.minLabel}
                    onChange={(e) =>
                      updateQuestion(question.id, "scale", {
                        ...question.scale,
                        minLabel: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="scale-label-item">
                  <span className="range-que">{question.scale.max}</span>
                  <input
                    type="text"
                    placeholder="Label (optional)"
                    value={question.scale.maxLabel}
                    onChange={(e) =>
                      updateQuestion(question.id, "scale", {
                        ...question.scale,
                        maxLabel: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="scale-options">
                {Array.from(
                  { length: question.scale.max - question.scale.min + 1 },
                  (_, i) => {
                    const value = question.scale.min + i;
                    return (
                      <div key={value} className="scale-item">
                        <span>{value}</span>
                        <input type="radio" disabled />
                      </div>
                    );
                  },
                )}
              </div>

              <div className="scale-label-row">
                <span>{question.scale.minLabel}</span>
                <span>{question.scale.maxLabel}</span>
              </div>
            </>
          )}
        </div>
      )}

      {question.type === "rating" && (
        <div className="rating-container">
          {isActive ? (
            <>
            <div className="rating-settings">
              <select
                value={question.rating.max}
                onChange={(e) =>
                  updateQuestion(question.id, "rating", {
                    ...question.rating,
                    max: Number(e.target.value),
                  })
                }
              >
                {[3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              <select
                value={question.rating.icon}
                onChange={(e) =>
                  updateQuestion(question.id, "rating", {
                    ...question.rating,
                    icon: e.target.value,
                  })
                }
              >
                <option value="star">⭐</option>
                <option value="heart">❤️</option>
                <option value="like">👍</option>
              </select>
            </div>

            <div className="rating-numbers">
              {Array.from({
                length: question.rating.max
              }, (_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>

            <div className="rating-icons">
              {Array.from({length: question.rating.max}, (_, i) => {
                const value = i + 1;
                return(
                  <span key={value} className="rating-icon">
                    {getIcon(question.rating.icon)}
                  </span>
                )
              })}
            </div>
            </>

            
          ) : (
            <div className="rating-icons">
                {Array.from({length: question.rating.max}, (_, i) => {
                  const value = i + 1;
                  return(
                    <div key={value} className="rating-icon">
                      <span className="rating-num">{value}</span>
                      {getIcon(question.rating.icon)}
                    </div>
                  )
                })}
            </div>
          )}

          
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
