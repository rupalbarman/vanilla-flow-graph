const svgPrefix = 'http://www.w3.org/2000/svg';
const randRange = (min, max) => Math.floor(Math.random() * max) + min;

class Node {
  constructor(nodeData, app) {
    this.app = app;
    this.data = nodeData;
    this.r = randRange(10, 50);
    this.x = randRange(10, 1400);
    this.y = randRange(10, 700);
    this.hightlighted = false;
    this.g = null;

    this.events = {
      'click': (e) => { this.onClick(e) },
      'mouseenter': (e) => {
        this.hightlight(true);
      },
      'mouseleave': (e) => {
        this.hightlight(false);
      },
    };
  }

  onClick(e) {
    this.app.events.emit('node:click', [e, this]);
  }

  draw() {
    // wrapper
    this.g = document.createElementNS(svgPrefix, 'g');
    this.g.setAttribute('id', this.data.id);
    this.g.setAttribute('class', 'node');
    this.g.setAttribute('transform', `translate(${this.x} ${this.y}) scale(1)`);
    // shape detail
    const circle = document.createElementNS(svgPrefix, 'circle');
    circle.setAttribute('r', this.r);
    circle.setAttribute('fill', 'yellow');
    circle.setAttribute('stroke', 'orange');
    // add shapes
    this.g.appendChild(circle);
    // bind events
    this.addEvents();
    return this.g;
  }

  hightlight(showHighlight) {
    this.hightlighted = showHighlight;
    if (showHighlight) {
      this.g.setAttribute('transform', `translate(${this.x} ${this.y}) scale(1.5)`);
    } else {
      this.g.setAttribute('transform', `translate(${this.x} ${this.y}) scale(1)`);
    }
  }

  addEvents() {
    Object.keys(this.events).forEach((event) => {
      this.g.addEventListener(event, this.events[event]);
    });
  }

  removeEvents() {
    Object.keys(this.events).forEach((event) => {
      this.g.removeEventListener(event, this.events[event]);
    });
  }
}

class NodeLayer {
  constructor(app) {
    this.layer = null;
    this.instances = {};

    this.init();
    this.draw(app);
  }

  init() {
    this.layer = document.createElementNS(svgPrefix, 'g');
    this.layer.setAttribute('class', 'nodes');
  }

  draw(app) {
    let nodeInstance = null;
    app.nodes.forEach((node) => {
      nodeInstance = new Node(node, app);
      this.instances[node.id] = nodeInstance;
      this.layer.appendChild(nodeInstance.draw());
    });
  }
}

export default NodeLayer;