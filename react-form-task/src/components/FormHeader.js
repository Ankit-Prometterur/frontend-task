const FormHeader = ({ title, description, onChangeInput }) => {
  return (
    <div className="form-header">
      <input
        className="form-title"
        placeholder="Untitled form"
        value={title}
        onChange={(e) => onChangeInput("title", e.target.value)}
      />
      <input
        className="form-description"
        placeholder="Form description"
        value={description}
        onChange={(e) => onChangeInput("description", e.target.value)}
      />
    </div>
  );
};

export default FormHeader;
