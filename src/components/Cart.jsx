
const Cart = ({selected}) => (
  <div>
    {
      selected.length === 0
      ? <h2>The courselist is empty</h2>
      : selected.map(course => (
          <div key={course}>
            {course}
          </div>
        ))
    }
  </div>
);

export default Cart;
