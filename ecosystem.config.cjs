module.exports = {
  apps: [
    {
      name: 'bani',
      cwd: '/var/www/bani',
      script: 'node',
      args: ['-r', 'dotenv/config', '.output/server/index.mjs'],
      env: {
        NODE_ENV: 'production',
      },
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
    },
  ],
}
