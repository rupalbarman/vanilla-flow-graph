const svgPrefix = 'http://www.w3.org/2000/svg';

class DefinitionLayer {
  constructor(app) {
    this.layer = null;
    this.init();
  }

  init() {
    this.layer = document.createElementNS(svgPrefix, 'defs');
    this.layer.innerHTML = this.definitions();
  }

  definitions() {
    return (
      `<marker
        class='arrow-head-right'
        id='arrow-head-right'
        refX=4.5
        refY=3
        markerWidth=6
        markerHeight=6
        orient='auto'>
        <path d='M 0,0 L0,6 L6,3 Z' fill='orange'/>
      </marker>
      <marker
        class='arrow-head-right-highlight'
        id='arrow-head-right-highlight'
        refX=4.5
        refY=3
        markerWidth=6
        markerHeight=6
        orient='auto'>
        <path d='M 0,0 L0,6 L6,3 Z' />
      </marker>
      <marker
        class='arrow-error-head-right'
        id='arrow-error-head-right'
        refX=4.5
        refY=3
        markerWidth=6
        markerHeight=6
        orient='auto'>
        <path d='M 0,0 L0,6 L6,3 Z' />
      </marker>
      <marker
        class='arrow-error-head-right-highlight'
        id='arrow-error-head-right-highlight'
        refX=4.5
        refY=3
        markerWidth=6
        markerHeight=6
        orient='auto'>
        <path d='M 0,0 L0,6 L6,3 Z' />
      </marker>
      <g class='generic-deprecation-badge' id='deprecation-badge'>
        <title>'This object is marked deprecated'</title>
        <polygon
          class='deprecation-poly'
          points='14,1 6,1 1,6 1,14 6,19 14,19 19,14 19,6'
        />
        <path class='deperecation-line' d='M5,10 L15,10' />
      </g>`
    );
  }
}

export default DefinitionLayer;