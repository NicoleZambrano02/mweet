/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: "#F3F4F6",
        gray2: "#6B7280",
        button: "#6A73C5",
      },
      width: {
        485: "485px",
        button: "147px",
        20: "20%",
        40: "40%",
        50: "50%",
        60: "60%",
        70: "70%",
        loading: "20px",
        full: "100%",
      },
      borderRadius: {
        6: "6px",
      },
      padding: {
        buttonPY: "13px",
        9: "9px",
        13: "13px",
        18: "18px",
        24: "24px",
        30: "30px",
        40: "40px",
      },
      fontSize: {
        14: "14px",
        24: "24px",
      },
    },
  },
  plugins: [],
};
