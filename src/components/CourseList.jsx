import Course from "./Course.jsx";
import './Course.css';


const CourseList = ({ courses, selection, selected, unavailable, toggleSelected }) => (
  <div className = "course_list">
    { Object.entries(courses).filter((course) => course[1].term === selection)
    .map(([id, course]) => <Course key={id} id={id} course={course} selected={selected} unavailable={unavailable} toggleSelected={toggleSelected}/>
    )}
  </div>
);

export default CourseList;