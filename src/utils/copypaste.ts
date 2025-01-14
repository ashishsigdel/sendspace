export const handleCopy = (
  text: string,
  setCopied: (value: boolean) => void
) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    })
    .catch((err) => console.error("Failed to copy text: ", err));
};

export const handlePaste = async (
  setText: any,
  setPasting: (value: boolean) => void
) => {
  try {
    const clipboardText = await navigator.clipboard.readText();
    setText((prev: string) => prev + clipboardText);
    setPasting(true);
    setTimeout(() => setPasting(false), 1500);
  } catch (error) {
    console.error("Failed to paste", error);
  }
};
