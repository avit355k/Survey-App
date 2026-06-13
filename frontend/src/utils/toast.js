import toast from "react-hot-toast";

export const showSuccess = (message) => {
  toast.success(message, {
    duration: 3000, // 3 seconds
  });
};

export const showError = (message) => {
  toast.error(message, {
    duration: 4000, // 4 seconds
  });
};