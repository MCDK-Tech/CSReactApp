import { useState } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList'
import Modal from './Modal';
import Cart from './Cart.jsx';

const terms = {
    Fall: 'Fall', 
    Winter: 'Winter', 
    Spring: 'Spring'

};

const TermPage = ({ courses }) => {
  const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

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
          <div className="d-flex">
            <button className="ms-auto btn btn-outline-dark" onClick={openModal}><i className="bi bi-cart4"></i>Schedule</button>
          </div>
          <Modal open={open} close={closeModal}>
              <Cart selected={selected} />
          </Modal>
         <CourseList courses={courses} selection={selection} selected={selected} toggleSelected={toggleSelected}/>
         </div>
    );
  }

export default TermPage;