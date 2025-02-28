import { Server } from 'http';
import app from './app'; // Express অ্যাপ ইমপোর্ট
import config from './config'; // কনফিগারেশন ফাইল ইমপোর্ট
import { initializeSocket } from './app/socket/socket.index.';

let server: Server;

async function main() {
    try {
        server = app.listen(config.port, () => {
            console.log(`✅ Server is running on port ${config.port}`);
        });


        initializeSocket(server);

        const exitHandler = () => {
            if (server) {
                server.close(() => {
                    console.info("⚠️ Server closed!");
                });
            }
            process.exit(1);
        };

        process.on('uncaughtException', (error) => {
            console.error("❌ Uncaught Exception:", error);
            exitHandler();
        });

        process.on('unhandledRejection', (error) => {
            console.error("❌ Unhandled Rejection:", error);
            exitHandler();
        });

    } catch (error) {
        console.error("🚨 Error while starting the server:", error);
        process.exit(1);
    }
}

main();
