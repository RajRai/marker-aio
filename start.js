const concurrently = require('concurrently');

// Run both marker_gui and marker_server processes concurrently
const processes = concurrently([
    { command: 'marker_gui', name: 'gui', cwd: '/app' },
    { command: 'marker_server --port 8001', name: 'server', cwd: '/app' }
], {
    killOthers: ['failure', 'success'], // Terminate all processes if one fails or succeeds
    restartTries: 3,                   // Restart a process up to 3 times if it fails
});

// Ensure that we capture SIGINT and SIGTERM and forward them to child processes
process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down...');
    processes.kill();
    process.exit();
});

process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down...');
    processes.kill();
    process.exit();
});

// Handle process results and errors
processes.result
    .then(() => {
        console.log('All processes exited successfully.');
    })
    .catch(error => {
        console.error('Error occurred in one of the processes', error);
    });
