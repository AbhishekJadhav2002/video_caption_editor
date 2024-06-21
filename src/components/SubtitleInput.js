import { useState } from 'react';
import { formatTime } from '../utils/formatter';

function SubtitleInput({ onSaveSubtitle, currentSelection, onSelect, duration }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveSubtitle(text);
    setText('');
  };

  const onChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    if (id === 'start') {
      onSelect(value, currentSelection.end);
    } else {
      onSelect(currentSelection.start, value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {currentSelection.start !== null && currentSelection.end !== null && (
          <>
            <div>
              <label for="start">Start Time:</label>
              <input
                type="number"
                id="start"
                min={0}
                max={duration}
                step={0.01}
                value={currentSelection.start}
                onChange={onChange}
              />
            </div>
            <div>
              <label for="end">End Time:</label>
              <input
                type="number"
                id="end"
                min={0}
                max={duration}
                step={0.01}
                value={currentSelection.end}
                onChange={onChange}
              />
            </div>
            <div>
              <p>Selected Duration: {formatTime(currentSelection.start)} - {formatTime(currentSelection.end)}</p>
            </div>
          </>
        )}
        <label>Subtitle Text:</label>
        <textarea
          maxLength="100"
          cols="30"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Subtitle</button>
    </form>
  );
};

export default SubtitleInput;
