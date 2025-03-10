/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primaryColor: '#007BFF',
                iconColor: '#333333',
                textGray: '#757575',
                icon: '#3395FF',
                textYellow: '#FFAB3E',
                // primaryText: '#1F1F1F',

                // stoke: '#00369A',
            },
            backgroundColor: {
                bgBlue: '#D6EAFF', // Custom background color mapping
                primaryBg: '#3395FF',
                primary: ' #007BFF',
                bgHeader: '#FFF7EC',
                bgYellow: '#FFAB3E',
                bgModal: '#F8F8F8',
                inputBg: '#F8F8F8',
                authBg: '#FFC400',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                outfit: ['Outfit', 'sans-serif'],
            },
            borderColor: {
                borderYellow: '#FFAB3E',
            },
        },
    },
    plugins: [],
};
