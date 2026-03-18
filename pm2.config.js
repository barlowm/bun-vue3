// pm2.config.js
export default {
    apps: [
        {
            name: 'Home',
            script: 'index.html', // the path to your application's entry point
            interpreter: 'bun', // explicitly set bun as the runtime
            cwd: 'D:\__Code\_2026 Code\repos\bun-vue3', // essential for ES modules and relative paths
            autorestart: true,
            instances: 1,
            exec_mode: 'fork', // PM2 cluster mode is not supported with Bun
            env: {
                // PATH: `${process.env.HOME}/.bun/bin:${process.env.PATH}` // ensure bun is in PATH for PM2
                PATH: `${process.env.PATH}` // ensure bun is in PATH for PM2
            }
        }
    ]
};// JavaScript source code
