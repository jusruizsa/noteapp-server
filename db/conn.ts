import mysql from 'mysql2/promise';
import { Pool, PoolOptions } from 'mysql2/typings/mysql/lib/Pool';

const access: PoolOptions = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'noteapp'
};

const conn = mysql.createPool(access);

export default conn;