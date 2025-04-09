function Log({ turns }) {
  return (
    <ol id="log">
      {/* shows a list of moves with row and column 1-based index */}
      
      {turns.map((turn) => (
        <li key={`${turn.square.row} ${turn.square.col}`}>
          {turn.player} selected {turn.square.row + 1}, {turn.square.col + 1}
        </li>
      ))}
    </ol>
  );
}

export default Log;
