export const fitTextArea = textArea => {
    textArea.style.height = "1px";
    textArea.style.height = (textArea.scrollHeight - 4) + "px";
};