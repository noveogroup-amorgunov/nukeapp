export { default as categoriesMock } from './__mocks__/categories.json'
export { default as productsMock } from './__mocks__/products.json'

// In production this server modules and mocks
// should not pass inside the main bundle
export { startDatabaseMigration as __serverStartDatabaseMigration } from './migration'
export { db as __serverDatabase } from './serverDb'
