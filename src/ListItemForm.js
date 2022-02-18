import { useState } from 'react';
import { createListItem } from './services/fetch-utils';

export default function ListItemForm({ fetchItems }) {
  // you'll need to track the name and quantity in state
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    // make a new list item in supabase using the form values stored in state
    createListItem({
      name: itemName,
      quantity: itemQuantity,
      has_been_bought: false,
    });
    // refetch the items using the handler function passed down as a prop
    await fetchItems();
    setItemName('');
    setItemQuantity('');
    // clear the name and quantity in state to refresh the form
  }

  return (
    <div className="new-item-form-container">
      {/* on submit, call the handleSubmit function */}
      <form onSubmit={handleSubmit}>
        I need . . .
        <label>
          Quantity
          {/* on change, update the quantity in state */}
          <input
            onChange={(e) => setItemQuantity(e.target.value)}
            value={itemQuantity}
            // this should be a controlled input, soi set the value based on state
            required
            type="number"
            name="quantity"
          />
        </label>
        <label>
          Name
          {/* on change, update the name in state */}
          <input
            onChange={(e) => setItemName(e.target.value)}
            value={itemName}
            // this should be a controlled input, soi set the value based on state
            required
            name="name"
          />
        </label>
        <button>Add item</button>
      </form>
    </div>
  );
}
