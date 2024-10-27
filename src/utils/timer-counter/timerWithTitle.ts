
export const timerWithTitle = (minutes: number, seconds: number, mode: string, progress: number): void => {
    document.title = `${minutes}:${String(seconds).padStart(2, '0')} - Pomodoro Timer`;

    const favicon = document.getElementById('favicon') as HTMLLinkElement;
    if (favicon) {

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 32;
        canvas.height = 32;

        if (ctx) {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = (mode === 'work') ? 'red' : 'green';
            ctx.fillRect(0, canvas.height - (canvas.height * (progress / 100)), canvas.width, canvas.height);
        }

        favicon.href = canvas.toDataURL('image/png');

    }
}
