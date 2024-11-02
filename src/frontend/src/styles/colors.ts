import * as Colors from '@mui/material/colors';

const addTransparent = (hex: string, opacity: number) => {
    if (hex.length === 4) {
        hex = `#${hex.slice(1).split('').map(char => char + char).join('')}`;
    }

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const originalColors = {
    primary: {
        main: Colors.yellow[900],
    },
    secondary: {
        main: Colors.common.black,
    },
    background: {
        default: Colors.grey[100],
        paper: addTransparent(Colors.common.white, 0.6),
    },
    text: {
        primary: Colors.grey[900],
        secondary: Colors.grey[600],
    },
    error: {
        main: Colors.red[500],
    },
    success: {
        main: Colors.green[500],
    },
    warning: {
        main: Colors.orange[500],
    },
    info: {
        main: Colors.blue[500],
    },
    common: {
        white: Colors.common.white,
        black: Colors.common.black,
    },
};

const darkColors = {
    primary: {
        main: Colors.yellow[500],
    },
    secondary: {
        main: Colors.grey[900],
    },
    background: {
        default: Colors.grey[900],
        paper: addTransparent(Colors.grey[800], 0.6),
    },
    text: {
        primary: Colors.common.white,
        secondary: Colors.grey[300],
    },
    error: {
        main: Colors.red[300],
    },
    success: {
        main: Colors.green[300],
    },
    warning: {
        main: Colors.orange[300],
    },
    info: {
        main: Colors.blue[300],
    },
    common: {
        white: Colors.common.white,
        black: Colors.common.black,
    },
};

const colors = {
    light: {
        ...originalColors,
    },
    dark: {
        ...darkColors,
    },
};

export default colors;
