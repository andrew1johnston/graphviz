import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import * as d3 from 'd3';
import lang from './DirectedGraph.lang';

const NodeType = {
  node: 'node',
  alarm: 'alarm',
};


/**
 * Force-directed graph
 */
const DirectedGraph = ({
  data : originalData, width, height, margin, alarmColor, nodeColor, nodeRadius, strokeColor,
}) => {
  const actualWidth = width - margin.left - margin.right;
  const actualHeight = height - margin.top - margin.bottom;

  const data = JSON.parse(JSON.stringify(originalData));

  useEffect(() => {
    // clear root graphic
    const graphic = d3.select('#directedGraphGraphic');
    graphic.selectAll('g').remove();

    //
    // Initialize links AKA edges
    //

    // add graphic for lines
    const links = graphic.append('g')
      .selectAll('g')
      .data(data.edges)
      .enter()
      .append('g');
    
    // append arrow heads for direction
    const lines = links.append('line')
      .style('stroke', strokeColor)
      .attr('marker-end', 'url(#arrowhead)');

    // add labels to lines
    const lineLabels = links.append('text')
      .text((d) => d.label)
      .attr('text-anchor', 'middle')
      .style('font-size', '0.9em')
      .style('font-style', 'italic');

    //
    // Initialize nodes AKA vertices
    //

    // add graphic for nodes
    const nodes = graphic.append('g')
      .selectAll('g')
      .data(data.vertices)
      .enter()
      .append('g');

    // add icons to nodes - see https://fontawesome.com/v5/cheatsheet for unicode values
    nodes.append('text')
      .attr('font-family', 'FontAwesome')
      .attr('font-size', '1.25em')
      .attr('font-weight', 'normal')
      .style('fill', (d) => (d.type === NodeType.alarm ? alarmColor : nodeColor))
      .attr('dominant-baseline', 'middle')
      .attr('text-anchor', 'middle')
      .text((d) => (d.type === NodeType.alarm ? '\uf071' : '\uf013'));

    // add labels for nodes
    nodes.append('text')
      .text((d) => d.label)
      .style('text-anchor', 'middle')
      .attr('x', 0)
      .attr('y', `${nodeRadius + 10}px`);

    //
    // Reposition nodes and edges to avoid collisions 
    //   
    /**
     * Updates the positions of the vertices and edges in each iteration of the force algorithm
     */
    function ticked() {
      lines // links
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      lineLabels
        .attr('x', (d) => (d.source.x + d.target.x) / 2)
        .attr('y', (d) => (d.source.y + d.target.y) / 2);

      nodes
        .attr('transform', (d) => `translate(${d.x},${d.y})`);
    }

    // create new simulation with forces
    const simulation = d3.forceSimulation(data.vertices)
      .force('link', d3.forceLink().id((d) => d.id).links(data.edges)) // provide links between nodes
      .force('charge', d3.forceManyBody().strength(-8000)) // add repulsion between nodes
      .force('center', d3.forceCenter(actualWidth / 2, actualHeight / 2)) // attract nodes to the center of the svg area
      .on('end', ticked);

    // run the simulation
    simulation.tick(1000);
  }, [actualHeight, actualWidth, alarmColor, data.edges, data.vertices, nodeColor, nodeRadius, strokeColor]);

  return (
    <svg id="directedGraphSvg" width={width + margin.left + margin.right} height={height + margin.top + margin.bottom} aria-describedby="directedGraphTitle">
      <title id="directedGraphTitle">{lang.title}</title>
      <defs>
        <marker id="arrowhead" viewBox="-0 -5 10 10" refX="13" refY="0" orient="auto" markerWidth="13" markerHeight="13" xoverflow="visible">
          <path d="M 0,-5 L 10 ,0 L 0,5" fill="#000" />
        </marker>
      </defs>
      <g id="directedGraphGraphic" transform={`translate(${margin.left},${margin.top})`}>
      </g>
    </svg>
  );
};

DirectedGraph.propTypes = {
  /** Color of alarm nodes */
  alarmColor: PropTypes.string,
  /** Input data */
  data: PropTypes.shape({
    /** Nodes */
    vertices: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        label: PropTypes.string,
        type: PropTypes.oneOf(['node', 'alarm']),
      })
    ),
    /** Lines between nodes */
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        label: PropTypes.string,
        type: PropTypes.string,
        source: PropTypes.number,
        target: PropTypes.number,
      })
    ),
  }).isRequired,
  /** Width of the chart */
  width: PropTypes.number,
  /** Height of the chart */
  height: PropTypes.number,
  /** Margin of chart */
  margin: PropTypes.shape({
    /** Left margin */
    left: PropTypes.number,
    /** Right margin */
    right: PropTypes.number,
    /** Top margin */
    top: PropTypes.number,
    /** Bottom margin */
    bottom: PropTypes.number,
  }),
  /** Line color */
  strokeColor: PropTypes.string,
  /** Fill color for nodes */
  nodeColor: PropTypes.string,
  /** Radius of vertices */
  nodeRadius: PropTypes.number,
};

DirectedGraph.defaultProps = {
  alarmColor: '#F43C34',
  nodeColor: '#000',
  height: 600,
  strokeColor: '#000',
  width: 600,
  margin: {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40,
  },
  nodeRadius: 20,
};

export default DirectedGraph;
