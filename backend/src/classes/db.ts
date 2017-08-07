
import { dbInfo } from '../../config';


import * as  mysql from 'mysql2/promise';

module.exports = mysql.createConnection({
    "host": dbInfo.HOST,
    "port": dbInfo.PORT,
    "user": dbInfo.USER,
    "password": dbInfo.PASS,
    "database": dbInfo.NAME
  });
