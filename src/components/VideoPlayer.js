import ReactPlayer from 'react-player';

function VideoPlayer({ url, onDuration, onProgress, setIsPlaying }) {
    return (
        <div className="video-player">
            <ReactPlayer
                url={url}
                controls
                width="100%"
                onDuration={onDuration}
                onProgress={onProgress}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
        </div>
    );
};

export default VideoPlayer;
