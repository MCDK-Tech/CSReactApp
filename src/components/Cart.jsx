const Cart = ({courses, selected}) => (
  <div>
    {
      selected.length === 0
      ? <h2>The courselist is empty; Please select courses to add to this list</h2>
      : selected.map(course => (
          <div key={course}>
            {courses[course].term} CS: {courses[course].number} | {courses[course].title} - {courses[course].meets} 
            
          </div>
        ))
    }
     </div>
  );
  export default Cart;