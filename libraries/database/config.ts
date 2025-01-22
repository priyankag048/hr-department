export default {
  database: 'applications',
  user: 'postgres',
  password: '***',
  port: 6024,
  max: 20, // set pool max size to 20
  idleTimeoutMillis: 1000, // close idle clients after 1 second
  connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
  maxUses: 7500,
}