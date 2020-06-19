import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axioswithAuth'
import { useParams } from 'react-router-dom'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor)

  const id = colorToEdit.id

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
      axiosWithAuth()
      .put(`/api/colors/${id}`, colorToEdit)
      .then(res => 
        console.log(res))
      .catch(err => console.log(err))
  }
 

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`, color)
    .then(res => console.log(res))
    .catch(err => console.log(err))
    .finally(
      window.location.reload()
    )
  };

  const addColor = e => {
    axiosWithAuth()
    .post('/api/colors', newColor)
    .then(res => console.log(res))
    .catch(err => console.log(err))
    .finally(
      window.location.reload()
    )
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
    <div/>
      <form onSubmit={addColor}>
        <h3>Add A Color</h3>
        <label>Color Name</label>
        <input 
          name='color'
          value={newColor.name}
          onChange={e =>
            setNewColor({ ...newColor, color: e.target.value })
          }/>
          <label>Hex Code</label>
          <input 
          name='hex-code'
          value={newColor.code.hex}
          onChange={e =>
            setNewColor({
              ...newColor,
              code: { hex: e.target.value }
            })}/>
            <button type="submit">add color</button>
      </form>
    </div>
  );
};

export default ColorList;
