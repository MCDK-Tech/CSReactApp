import { useFormData } from '../utilities/useFormData';
// import { useDbUpdate } from '../utilities/firebase';
import { Link, useNavigate } from 'react-router-dom';

const validateUserData = (key, val) => {
  switch (key) {
    case 'coursename':
      return /(^\w\w)/.test(val) ? '' : 'must be least two characters';
    case 'meet':
      return /^\w+@\w+[.]\w+/.test(val) ? '' : 'must contain time';
    default: return '';
  }
};

const InputField = ({name, text, state, change}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className="form-control" id={name} name={name} 
      defaultValue={state.values?.[name]} onChange={change} />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);

const ButtonBar = ({message, disabled}) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
      <span className="p-2">{message}</span>
    </div>
  );
};

const CourseForm = ({user}) => {
  // const [update, result] = useDbUpdate(`/users/${user.id}`);
  const [state, change] = useFormData(validateUserData, user);
  const submit = (evt) => {
    // evt.preventDefault();
    // if (!state.errors) {
    //   update(state.values);
    // }
  };

  return (
    <form onSubmit={submit} noValidate className={state.errors ? 'was-validated' : null}>
      <InputField name="coursename" text="Course Name" state={state} change={change} />
      <InputField name="meet" text="Meet" state={state} change={change} />
      <ButtonBar message={""} />
    </form>
  )
};

export default CourseForm;