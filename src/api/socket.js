import io from 'socket.io-client';

const socket = io.connect(process.env.API_URL);

export default socket;
