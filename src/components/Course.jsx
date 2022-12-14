import "./Course.css";
import { Link } from 'react-router-dom';
import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';


const using = () => {
  const [user] = useAuthState();
  return user;
};

const Course = ({id, course,  selected, unavailable, toggleSelected, profile}) => (
    <div className="course card m-1 p-2" data-cy="course" onClick={() => !selected.includes(id) && unavailable.includes(id)? '' : toggleSelected(id)}>
      <div className={`card-body  ${selected.includes(id) ? 'selected' : unavailable.includes(id) ? 'unavailable': ''}`}>
        <h5 className="card-title">{course.term} CS {course.number}</h5>
        <p className="card-text">{course.title}</p>
        {profile?.isAdmin && <p><Link to={`/CourseForm/${id}`} className="bi bi-pencil-square"> </Link></p> }
    </div>
    <div className="card-footer bg-white">
        <p className="text-center">{course.meets}</p>
    </div>
  </div>

    
  );

  export default Course;