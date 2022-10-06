import Course from "./Course";
import './Course.css'

const CourseList = ({ courses}) => (
  <div className = "course_list">
    { Object.entries(courses).map(([id, course]) => <Course key={id} course={course} />) }
  </div>
);

export default CourseList;