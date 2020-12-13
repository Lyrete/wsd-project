let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
    config.database = {};
  } else {
    config.database = {
      hostname: "lyrete.me",
      database: "tommidb",
      user: "tommidb",
      password: "morso",
      port: 5432
    };
  }

export { config }; 