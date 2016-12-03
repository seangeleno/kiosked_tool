var config = {};
config.local_mongo = "mongodb://localhost/kiosked";
config.mongolaburl = "mongodb://sean.esteva:obtuse.spoil.unholy@ds159767.mlab.com:59767/kiosked";
config.port = process.env.port || 3000;

module.exports = config;
