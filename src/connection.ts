import { createConnection, getConnection } from 'typeorm'

// somewhere in your app, better where you bootstrap express and other things
createConnection() // read config from ormconfig.json or pass them here
