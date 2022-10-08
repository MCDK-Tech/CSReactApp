import { useState } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList'

const terms = {
    Fall: 'Fall', 
    Winter: 'Winter', 
    Spring: 'Spring'

};

const TermPage = ({ courses }) => {
  const [selected, setSelected] = useState([]);
  const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
  const toggleSelected = (item) => setSelected(
    selected.includes(item)
    ? selected.filter(x => x !== item)
    : [...selected, item]
  );
    return (
      <div>
        <TermSelector 
          selection={selection}
          setSelection={setSelection} />
         <CourseList courses={Object.values(courses).filter((course) => course.term === selection)} selected={selected} toggleSelected={toggleSelected}/>
      </div>
    );
  }

export default TermPage;