import handleOptions from './options';
import DefinitionLayer from './layers/definition';
import NodeLayer from './layers/nodes';
import EdgeLayer from './layers/edges';
import Events from './events';

const svgPrefix = 'http://www.w3.org/2000/svg';

class GraphApp {
  constructor(options) {
    this.options = handleOptions(options);
    this.container = this.options.container;
    this.width = this.options.width;
    this.height = this.options.height;
    this.matrix = [1, 0, 0, 1, 0, 0];
    this.nodes = this.options.nodes;
    this.edges = this.options.edges;
    this.editEdges = [];

    this.state = {
      edgeDraw: { startNode: null }
    };

    this.events = new Events();
    this.edgeDrawLayer = null;

    this.svg = null;
    this.mainLayer = null;

    this.init();
    this.bindEvents();
    this.draw();
  }

  init() {
    this.createSVGContainer();
    this.createMainTransformationLayer();
    // create layer instances
    this.definitionInstance = new DefinitionLayer(this);
    this.nodesInstance = new NodeLayer(this);
    this.edgesInstance = new EdgeLayer(this);
  }

  draw() {
    this.mainLayer.appendChild(this.definitionInstance.layer);
    this.mainLayer.appendChild(this.edgesInstance.layer);
    this.mainLayer.appendChild(this.nodesInstance.layer);
  }

  bindEvents() {
    this.events.on('node:click', (e, node) => {
      const drawEdge = (e, node) => {
        if (!this.edgeDrawLayer) return;
        const mouseX = e.pageX - this.svg.getBoundingClientRect().left;
        const mouseY = e.pageY - this.svg.getBoundingClientRect().top;
        this.edgeDrawLayer.setAttribute('d', `M ${node.x} ${node.y} L ${mouseX} ${mouseY}`)
      }
      // if state.startNode is not set, start drawing
      if (!this.state.edgeDraw.startNode) {
        this.state.edgeDraw.startNode = node;
        this.createEdgeDrawLayer();
        this.mainLayer.appendChild(this.edgeDrawLayer);
        document.addEventListener('mousemove', (e) => drawEdge(e, node));
      } else {
        if (node.data.id !== this.state.edgeDraw.startNode.data.id) {
          // capture new end node and add a edit-edge
          this.editEdges.push({ source: this.state.edgeDraw.startNode.data.id, target: node.data.id, type: 'edited' });
        }
        // clear drawing edge
        this.state.edgeDraw.startNode = null;
        this.mainLayer.removeChild(this.edgeDrawLayer);
        this.edgeDrawLayer = null;
        document.removeEventListener('mousemove', (e) => drawEdge(e, node));
        // redraw new edges if any
        this.edgesInstance.draw(this);
      }
    });
  }

  createSVGContainer() {
    this.svg = document.createElementNS(svgPrefix, 'svg');
    this.svg.setAttribute('xmlns', svgPrefix);
    this.svg.setAttribute('class', 'svg-graph');
    this.svg.setAttributeNS(svgPrefix, 'viewBox', `0 0 ${this.options.width} ${this.options.height}`);
    // this.svg.setAttribute('width', this.options.width);
    // this.svg.setAttribute('height', this.options.height);
    this.svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    this.container.appendChild(this.svg);
  }

  createMainTransformationLayer() {
    this.mainLayer = document.createElementNS(svgPrefix, 'g');
    this.mainLayer.setAttribute('id', 'mainLayer');
    this.mainLayer.setAttribute('transform', `matrix(${this.matrix.join(' ')})`);
    this.svg.appendChild(this.mainLayer);
  }

  createEdgeDrawLayer() {
    // editing edge
    this.edgeDrawLayer = document.createElementNS(svgPrefix, 'path');
    this.edgeDrawLayer.setAttribute('class', 'edit-path');
    this.edgeDrawLayer.setAttribute('stroke', 'blue');
  }
}

export default GraphApp;