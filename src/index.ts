import { DataSource } from "typeorm";
import { AppDataSource, createRepositories } from "./app.config";




AppDataSource.initialize()
    .then(async (data: DataSource) => {
        console.log('Data Source has been initialized!');
    })
    .catch((error) => {
        console.error('Error during Data Source initialization:', error);
    });

const repositories = createRepositories();