const app = require('./App');

const PORT = 3001;
const HOST = '192.168.10.41'

app.listen(PORT, HOST, () => {
    console.log(`Listening: http://${HOST}:${PORT}`);
}); 