const allowedOrigins = [
    // not https
    'http://localhost:5173',
    'http://localhost:3200',
    'http://localhost:3000',
    //https for production
    'https://dandrepairshop.com',
    //LAN access
    '192.168.237.1:5173',
    '*'
]

export default allowedOrigins;