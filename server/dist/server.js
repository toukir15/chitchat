"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app")); // Express অ্যাপ ইমপোর্ট
const config_1 = __importDefault(require("./config")); // কনফিগারেশন ফাইল ইমপোর্ট
const socket_index_1 = require("./app/socket/socket.index.");
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // সার্ভার চালু করা হচ্ছে
            server = app_1.default.listen(config_1.default.port, () => {
                console.log(`✅ Server is running on port ${config_1.default.port}`);
            });
            // সোকেট.io ইনিশিয়ালাইজ করা হচ্ছে
            (0, socket_index_1.initializeSocket)(server);
            // সার্ভার বন্ধ করার ফাংশন
            const exitHandler = () => {
                if (server) {
                    server.close(() => {
                        console.info("⚠️ Server closed!");
                    });
                }
                process.exit(1);
            };
            // আনকট এক্সেপশন ধরার হ্যান্ডলার
            process.on('uncaughtException', (error) => {
                console.error("❌ Uncaught Exception:", error);
                exitHandler();
            });
            // আনহ্যান্ডেল্ড রিজেকশন ধরার হ্যান্ডলার
            process.on('unhandledRejection', (error) => {
                console.error("❌ Unhandled Rejection:", error);
                exitHandler();
            });
        }
        catch (error) {
            console.error("🚨 Error while starting the server:", error);
            process.exit(1);
        }
    });
}
main();
