
export const CAT_COLOR = {
    GOOD: '#55a84f',
    SATISFACTORY: '#a3c853',
    MODERATE: '#fff833',
    POOR: '#f29c33',
    VERY_POOR: '#e93f33',
    SEVERE: '#af2d24',
    DEFAULT: '#aaaaaa'
}


export const APP = {
    TITLE: 'Proximity Lab AQI',
    SOCKET_SERVER_URL: 'wss://city-ws.herokuapp.com',
    CATEGORIES: [
        { name: 'GOOD', startRange: 0, endRange: 50, color: CAT_COLOR.GOOD },
        { name: 'SATISFACTORY', startRange: 51, endRange: 100, color: CAT_COLOR.SATISFACTORY },
        { name: 'MODERATE', startRange: 101, endRange: 200, color: CAT_COLOR.MODERATE },
        { name: 'POOR', startRange: 201, endRange: 300, color: CAT_COLOR.POOR },
        { name: 'VERY POOR', startRange: 301, endRange: 400, color: CAT_COLOR.VERY_POOR },
        { name: 'SEVERE', startRange: 401, endRange: 500, color: CAT_COLOR.SEVERE }
    ],
    DEFAULT_CATEGORY: { name: 'DEFAULT', color: CAT_COLOR.DEFAULT }
};