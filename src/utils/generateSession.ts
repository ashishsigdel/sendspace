export const generateSessionId = (length: number) => {
  const characters = "0123456789abcdefghijklmnopqrstuvwxyz";
  let SessionId = "";

  for (let i = 0; i < length; i++) {
    SessionId += characters[Math.floor(Math.random() * characters.length)];
  }

  return SessionId;
};
