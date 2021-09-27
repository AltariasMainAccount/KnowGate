// Import CJS modules.

import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../../ext/knowgate.sqlite'
});

(async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

export { sequelize };
