import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        const updatedColors = colors.map(color => {
          if (color.id === colorToEdit.id) {
            return res.data;
          } else {
            return color;
          }
        });
        updateColors(updatedColors);
      })
      .catch(err => console.log(err));
  };

  const deleteColor = colorToDelete => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${colorToDelete.id}`, colorToDelete.id)
      .then(res => {
        updateColors(colors.filter(color => colorToDelete.id !== color.id));
      })
      .catch(err => console.log(err));
  };


  return (
    <div className="colors-wrap">
      <ul className="color-list">
        {colors.map(color => (
          <li
            className="color"
            key={color.color}
            onClick={() => editColor(color)}
          >
            <span className="delete-container">
              <span
                className="delete"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
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
        <form className="edit-form" onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label className="form-label">
            color name:
            <input
              className="form-input"
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label className="form-label">
            hex code:
            <input
              className="form-input"
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
      
    </div>
  );
};

export default ColorList;