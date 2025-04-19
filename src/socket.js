import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // make sure this matches your backend port

export default socket;
