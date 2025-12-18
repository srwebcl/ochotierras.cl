const http = require('http');

const url = 'http://127.0.0.1:8000/storage/bottles/chardonnay-reserva.webp';

console.log('Fetching:', url);

http.get(url, (res) => {
    console.log('Status Code:', res.statusCode);
    console.log('Headers:', res.headers);

    let data = [];
    res.on('data', chunk => data.push(chunk));
    res.on('end', () => {
        console.log('Total bytes received:', Buffer.concat(data).length);
    });
}).on('error', (e) => {
    console.error('Error:', e.message);
});
