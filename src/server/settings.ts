const Settings = {
  swagger: {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        version: '0.0.1',
        title: 'Planner API',
        description: 'Planner API Information',
        contact: {
          name: '',
        },
        tags: [
          {
            name: 'info',
          },
          {
            name: 'user',
          },
          {
            name: 'task',
          },
        ],
      },
      servers: [
        {
          url: 'http://localhost:8080/',
        },
      ],
    },
    apis: ['./src/server/router/Router.ts'],
  },
  dbName: 'projectDb.db',
  testUsers: {
    vasya: {
      login: 'vasya',
      password: '123',
    },
    petya: {
      login: 'petya',
      password: '214',
    },
  },
};

export default Settings;
