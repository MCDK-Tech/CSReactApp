import Course from "./Course.jsx";
import './Course.css';


const CourseList = ({ courses, selection, selected, toggleSelected }) => (
  <div className = "course_list">
    { Object.entries(courses).filter((course) => course[1].term === selection)
    .map(([id, course]) => <Course key={id} id={id} course={course} selected={selected} toggleSelected={toggleSelected}/>
    )}
  </div>
);

export default CourseList;