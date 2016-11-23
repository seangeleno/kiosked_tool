var config = {};
config.db = {};
config.mongolab = {};
config.server = {};

config.server.port = process.env.PORT || 3000;

config.mongolab.username = '<insert_username_here>';
config.mongolab.password = '<insert_password_here>';
config.mongolab.host = '<insert_host_here>';
config.mongolab.port = '<insert_port_here>';
config.mongolab.name = '<insert_name_here>';

config.db.database = '<insert_type_of_database_aka_mongo_here>';
config.db.host = '<insert_local_host_name_here>';
config.db.name = '<insert_local_database_name_here>';

module.exports = config;
