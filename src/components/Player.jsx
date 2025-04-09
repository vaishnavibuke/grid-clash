import { useState } from "react";

function Player({ initialName, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  // Toggles editing state and updates name when saved
  function handleEditClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) onChangeName(symbol, playerName);
  }

  //input handler for name change
  function handleChange(e) {
    return setPlayerName(e.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        placeholder="name"
        required
        value={playerName}
        onChange={handleChange}
      />
    );
  }
  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}

export default Player;
