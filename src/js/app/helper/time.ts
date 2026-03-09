const helperTime = {
  diffString(start: number, end: number): string {
    const timeDiffSeconds = (end - start) / 1000;
    const timeMinutes = Math.floor(timeDiffSeconds / 60) % 60;
    const timeHours = Math.floor(timeDiffSeconds / 3600);
    return `${timeHours}:${String(timeMinutes).padStart(2, '0')}`;
  },
};

export default helperTime;
