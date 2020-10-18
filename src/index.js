import 'css/main.css';
import GraphApp from './graph';

new GraphApp({
    container: document.getElementById('graph'),
    width: 1000,
    height: 800,
    nodes: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }],
    edges: [
        { source: 1, target: 5 },
        { source: 3, target: 6 },
        { source: 10, target: 8 },
        { source: 9, target: 2 },
        { source: 7, target: 2 },
        { source: 6, target: 1 },
        { source: 5, target: 2 },
        { source: 4, target: 3 },
        { source: 2, target: 4 },
    ],
})