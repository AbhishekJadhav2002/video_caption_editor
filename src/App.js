import { useState } from 'react';
import FileInput from './components/FileInput';
import SubtitleDisplay from './components/SubtitleDisplay';
import SubtitleInput from './components/SubtitleInput';
import Timeline from './components/Timeline';
import VideoPlayer from './components/VideoPlayer';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [subtitles, setSubtitles] = useState([]);
  const [currentSelection, setCurrentSelection] = useState({ start: null, end: null });
  const [currentTime, setCurrentTime] = useState(0);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  const handleSubtitleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const srtContent = event.target.result;
        const parsedSubtitles = parseSrt(srtContent);
        setSubtitles(parsedSubtitles);
      };
      reader.readAsText(file);
    }
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleProgress = (progress) => {
    setCurrentTime(progress.playedSeconds);
  };

  const handleSelect = (start, end) => {
    setCurrentSelection({ start, end });
  };

  const handleSaveSubtitle = (text) => {
    if (currentSelection.start !== null && currentSelection.end !== null) {
      const newSubtitle = {
        text,
        start: currentSelection.start,
        end: currentSelection.end,
      };
      setSubtitles([...subtitles, newSubtitle]);
      setCurrentSelection({ start: null, end: null });
    }
  };

  const parseSrt = (srtContent) => {
    const subtitles = [];
    const lines = srtContent.split('\n');
    let index = 0;

    while (index < lines.length) {
      const sequence = lines[index++];
      const time = lines[index++].split(' --> ');
      const text = [];

      while (index < lines.length && lines[index].trim()) {
        text.push(lines[index++]);
      }

      index++; // Skip the blank line

      if (time.length === 2) {
        const start = time[0].replace(',', '.');
        const end = time[1].replace(',', '.');
        subtitles.push({ text: text.join(' '), start: parseTime(start), end: parseTime(end) });
      }
    }

    return subtitles;
  };

  const parseTime = (time) => {
    const [hours, minutes, seconds] = time.split(':');
    return parseFloat(hours) * 3600 + parseFloat(minutes) * 60 + parseFloat(seconds);
  };

  const convertToSrt = (subtitles) => {
    return subtitles.map((subtitle, index) => {
      const start = new Date(subtitle.start * 1000).toISOString().substr(11, 12).replace('.', ',');
      const end = new Date(subtitle.end * 1000).toISOString().substr(11, 12).replace('.', ',');
      return `${index + 1}\n${start} --> ${end}\n${subtitle.text}\n`;
    }).join('\n');
  };

  const downloadSrtFile = (srtContent) => {
    const blob = new Blob([srtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subtitles.srt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="App">
        <h1>Video Caption Editor</h1>
        <FileInput onVideoUpload={handleVideoUpload} onSubtitleUpload={handleSubtitleUpload} />
        {videoUrl && (
          <>
            <VideoPlayer url={videoUrl} onDuration={handleDuration} onProgress={handleProgress} setIsPlaying={setIsPlaying} />
            {!isPlaying && currentSelection.start !== null && currentSelection.end !== null && (
              <>
                <Timeline duration={duration} onSelect={handleSelect} />
                <SubtitleInput onSaveSubtitle={handleSaveSubtitle} currentSelection={currentSelection} onSelect={handleSelect} duration={duration} />
              </>
            )}
          </>
        )}
        <SubtitleDisplay subtitles={subtitles} currentTime={currentTime} />
        <button onClick={() => downloadSrtFile(convertToSrt(subtitles))}>Download SRT</button>
      </div>

      <footer>
        <p>
          <a href="https://github.com/AbhishekJadhav2002/video_caption_editor" target="_blank" rel="noopener noreferrer">
            Source Code by AbhishekJadhav2002
          </a>
        </p>
      </footer>
    </>
  );
};

export default App;
