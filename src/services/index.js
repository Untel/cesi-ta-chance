const files = require.context('.', false, /\.js$/);
const services = {};

files.keys().forEach((key) => {
  if (key === './index.js') return;
  services[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});

const initServices = function(vue) {
  const initializedService = {};
  Object.keys(services).forEach((key) => {
    initializedService[key] = new services[key]();
    // initializedService[key].vue = vue;
  });
  return initializedService;
};

export {
  services,
  initServices,
};
