const securityConfig = {
  database: {
    name: "app_db",
  },
  jwtToken: {
    jwtSecret: "!!0Naught_Nil.None!!",
    jwtExpirationInSeconds: 60 * 60, // 1 hour
  },
};

export default securityConfig;
