export const calculateProgress = (
                            mode: string,
                            propMinutesBreak: number,
                            propMinutesWork: number,
                            propMinutesBigBreak: number,
                            minutes: number,
                            seconds: number): number => {
    let totalSeconds = 0
    if (mode === 'work') {
        totalSeconds = propMinutesWork * 60
    } else if (mode === 'break') {
        totalSeconds = propMinutesBreak * 60
    } else {
        totalSeconds = propMinutesBigBreak * 60
    }

    const secondsLeft = minutes * 60 + seconds
    return Math.round((secondsLeft / totalSeconds) * 100)
}
