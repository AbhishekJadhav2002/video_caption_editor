function SubtitleDisplay({ subtitles, currentTime }) {
    const currentSubtitle = subtitles.find(subtitle => currentTime >= subtitle.start && currentTime <= subtitle.end);

    console.log(currentSubtitle);
    return (
        <div className="subtitle-display">
            {currentSubtitle ? (
                <div className="subtitle">
                    {currentSubtitle.text.split('\n').map((line, index) => (
                        <span key={index}>{line}</span>
                    ))}
                </div>
            ) : (
                <div className="subtitle">
                    <span>No Subtitle</span>
                </div>
            )}
        </div>
    );
};

export default SubtitleDisplay;
