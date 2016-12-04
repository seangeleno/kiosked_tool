var config = {};
config.db = {};
config.mongolab = {};
config.server = {};

config.server.port = process.env.PORT || 3000;

config.mongolab.username = 'sean.esteva';
config.mongolab.password = 'obtuse.spoil.unholy';
config.mongolab.host = 'ds159767.mlab.com';
config.mongolab.port = '59767';
config.mongolab.name = 'kiosked';

config.db.database = 'mongodb';
config.db.host = 'localhost';
config.db.name = 'test';

module.exports = config;
