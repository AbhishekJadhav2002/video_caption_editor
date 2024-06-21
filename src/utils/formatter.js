export const formatTime = (time) => {
    if (time < 0) return '0:00:00';
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 1000);
    const format = (val) => (val < 10 ? `0${val}` : val);
    return `${format(hours)}:${format(minutes)}:${format(seconds)}.${milliseconds}`;
};