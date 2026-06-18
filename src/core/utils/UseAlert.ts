export const useAlert = () => {
  return {
    success: (message: string) => alert(message),
    error: (message: string) => alert(message),
  };
};
