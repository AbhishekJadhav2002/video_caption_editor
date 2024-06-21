function FileInput({ onVideoUpload, onSubtitleUpload }) {
    return (
        <div className="file-input">
            <div>
                <label>Upload Video:</label>
                <input type="file" accept="video/*" onChange={onVideoUpload} />
            </div>
            <div>
                <label>Upload SRT:</label>
                <input type="file" accept=".srt" onChange={onSubtitleUpload} />
            </div>
        </div>
    );
};

export default FileInput;
