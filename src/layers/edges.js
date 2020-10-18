import './../css/edge.css';

const svgPrefix = 'http://www.w3.org/2000/svg';

class Edge {
  constructor(sourceNode, targetNode, type) {
    this.source = sourceNode;
    this.target = targetNode;
    this.type = type;
    this.path = this.generatePath();
    this.layer = null;

    this.draw();
  }

  draw() {
    this.layer = document.createElementNS(svgPrefix, 'path');
    this.layer.setAttribute('class', `edge ${this.type}`);
    this.layer.setAttribute('marker-end', (this.type === 'normal' ? 'url(#arrow-head-right)' : 'url(#arrow-head-right-highlight)'));
    this.layer.setAttribute('d', this.path);
    return this.layer;
  }

  generatePath() {
    // source is center of source node
    const sourceX = this.source.x;
    const sourceY = this.source.y;
    // target should be closest point on circle from the source
    const targetX = this.target.x;
    const targetY = this.target.y;
    const vX = targetX - sourceX;
    const vY = targetY - sourceY;
    const vMag = Math.sqrt(vX * vX + vY * vY);
    const closestTargetX = targetX - vX / vMag * this.target.r;
    const closestTargetY = targetY - vY / vMag * this.target.r;
    return `M ${sourceX} ${sourceY} L ${closestTargetX} ${closestTargetY}`;
  }
}


class EdgeLayer {
  constructor(app) {
    this.layer = null;
    this.instances = {};

    this.init();
    this.draw(app);
  }

  init() {
    this.layer = document.createElementNS(svgPrefix, 'g');
    this.layer.setAttribute('class', 'edges');
  }

  draw(app) {
    const nodeInstances = app.nodesInstance.instances;
    const getEdgeID = (edge) => `${edge.source}-${edge.target}`;
    let edgeInstance = null;
    let sourceNode = null;
    let targetNode = null;
    let edgeType = null;

    app.edges.concat(app.editEdges).forEach(edge => {
      sourceNode = nodeInstances[edge.source];
      targetNode = nodeInstances[edge.target];
      if (!sourceNode || !targetNode) return;
      edgeType = edge.type || 'normal';
      edgeInstance = new Edge(sourceNode, targetNode, edgeType);
      this.instances[getEdgeID(edge)] = edgeInstance;
      this.layer.appendChild(edgeInstance.draw());
    });
  }
}

export default EdgeLayer;