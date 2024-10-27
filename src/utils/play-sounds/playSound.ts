export const playSound = (urlImg: string) => {
    const audio = new Audio(urlImg);
    audio.play();
}
