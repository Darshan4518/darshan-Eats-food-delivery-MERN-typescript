export const generateVerificationToken = (length = 6): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let verifiactionCode = "";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    verifiactionCode += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return verifiactionCode;
};
