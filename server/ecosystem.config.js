module.exports = {
    apps: [
      {
        name: 'File storage application Backend',
        script: './dist/server/index.js',
        env_qa: {
          PORT: 3001,
          NODE_ENV: 'production',
        },
        env_production: {
          PORT: 3001,
          NODE_ENV: 'production',
        },
      },
    ],
  };