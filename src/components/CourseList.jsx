import Course from "./Course.jsx";
import './Course.css';


const CourseList = ({ courses, selected, toggleSelected }) => (
  <div className = "course_list">
    { Object.entries(courses).map(([id, course]) => <Course key={id} id={id} course={course} selected={selected} toggleSelected={toggleSelected}/>) }
  </div>
);

export default CourseList;