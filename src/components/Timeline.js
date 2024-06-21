import { useEffect, useRef, useState } from 'react';
import { formatTime } from "../utils/formatter";

function Timeline({ duration, onSelect }) {
    const timelineRef = useRef(null);
    const [selection, setSelection] = useState({ start: null, end: null });
    const [hoverTime, setHoverTime] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });

    const handleClick = (e) => {
        const rect = timelineRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        let clickTime = (clickX / rect.width) * duration;

        if (clickTime < 0) {
            clickTime = 0;
        } else if (clickTime > duration) {
            clickTime = duration;
        }

        if (selection.start === null) {
            setSelection({ start: clickTime, end: null });
        } else if (selection.end === null) {
            setSelection({ start: selection.start, end: clickTime });
            onSelect(selection.start, clickTime);
        } else {
            setSelection({ start: clickTime, end: null });
        }
    };

    const handleMouseMove = (e) => {
        const rect = timelineRef.current.getBoundingClientRect();
        let hoverX = e.clientX - rect.left;
        if (hoverX < 0) {
            hoverX = 0;
        } else if (hoverX > rect.width) {
            hoverX = rect.width;
        }
        const hoverTime = (hoverX / rect.width) * duration;
        setHoverTime(hoverTime);
        setTooltipPosition({ left: hoverX, top: rect.top });
    };

    useEffect(() => {
        setSelection({ start: null, end: null });
    }, [duration]);

    return (
        <div
            ref={timelineRef}
            className="timeline"
            onClick={handleClick}
            onMouseMove={handleMouseMove}
        >
            {selection.start !== null && (
                <div
                    style={{
                        position: 'absolute',
                        left: `${(selection.start / duration) * 100}%`,
                        width: selection.end !== null ? `${((selection.end - selection.start) / duration) * 100}%` : '2px',
                        height: '100%',
                        background: selection.end !== null ? 'rgba(0, 123, 255, 0.5)' : '#007bff',
                    }}
                ></div>
            )}
            <div
                className="tooltip"
                style={{
                    left: `${tooltipPosition.left}px`,
                }}
            >
                {formatTime(hoverTime)}
            </div>
        </div>
    );
};

export default Timeline;
