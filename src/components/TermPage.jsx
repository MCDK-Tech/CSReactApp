import { useState } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList'

const terms = {
    Fall: 'Fall', 
    Winter: 'Winter', 
    Spring: 'Spring'

};

const TermPage = ({ courses }) => {
    const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
    return (
      <div>
        <TermSelector 
        selection={selection} 
        setSelection={setSelection} />
        <CourseList courses={Object.values(courses).filter((course) => course.term === selection)}/>
      </div>
    );
  }

export default TermPage;