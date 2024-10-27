export const calculateProgress = (
                            mode: string,
                            propMinutesBreak: number,
                            propMinutesWork: number,
                            minutes: number,
                            seconds: number): number => {
    const totalSeconds = (mode === 'work') ? propMinutesWork * 60 : propMinutesBreak * 60
    const secondsLeft = minutes * 60 + seconds
    return Math.round((secondsLeft / totalSeconds) * 100)
}
