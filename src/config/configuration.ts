export default () => ({
  port: parseInt(process.env.PORT, 10) || 3100,
  database: {
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10) || 5432,
  },
});
