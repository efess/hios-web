const time = {
  secondsToDuration(seconds: number): string {
    const timeMinutes = Math.floor(seconds / 60) % 60;
    const timeHours = Math.floor(seconds / 3600);
    return `${timeHours}:${String(timeMinutes).padStart(2, '0')}`;
  },
};

export default time;
