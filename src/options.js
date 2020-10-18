
const handleOptions = (config) => {
  const options = {};
  options.container = config.container || document.getElementById('graphapp');
  options.nodes = config.nodes || [];
  options.edges = config.edges || [];
  options.width = config.width || 720;
  options.height = config.height || 480;
  return options;
};

export default handleOptions;