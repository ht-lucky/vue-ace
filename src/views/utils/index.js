let width = 1920

export const useFontSize = (res) => {
    let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = 100 * (clientWidth / width);
    return res * fontSize;
}