import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import * as d3 from 'd3';

const NodeType = {
  node: 'node',
  alarm: 'alarm',
};

/**
 *
 * Returns data suitable for d3
 */
const mapData = (data) => ({
  ...data,
  edges: data.edges.map((e) => ({
    ...e,
    // TODO IDs
    source: e.source_id,
    target: e.target_id,
  })),
});

// TODO:
// node label
// stoke label
// node icon
// alarm icon
// data validation
// initial view

// TODO: move functions to d3.util?

/**
 * Force-directed graph
 */
const DirectedGraph = ({
  data, width, height, margin, alarmColor, nodeColor, nodeRadius, strokeColor,
}) => {
  const actualWidth = width - margin.left - margin.right;
  const actualHeight = height - margin.top - margin.bottom;

  const mappedData = mapData(data);

  useEffect(() => {
    const graphic = d3.select('#directedGraphGraphic');
    graphic.selectAll('g').remove(); // TODO: rename

    // Initialize links
    const link = graphic.append('g')
      .selectAll('g')
      .data(mappedData.edges)
      .enter()
      .append('g');

    // TODO: rename these lines not line etc

    const line = link.append('line')
      .style('stroke', strokeColor)
      .attr('marker-end', 'url(#arrowhead)');

    // TODO: move style to css
    const labelLine = link.append('text')
      .text((d) => d.label)
      .attr('text-anchor', 'middle')
      .style('font-size', '0.9em')
      .style('font-style', 'italic');

    // Initialize nodes AKA vertices
    const node = graphic.append('g')
      .selectAll('g')
      .data(mappedData.vertices)
      .enter()
      .append('g');

    // // add circles for nodes
    // node.append('circle')
    //   .attr('r', nodeRadius)
    //   .style('fill', '#fff')
    //   .style('stroke', '#fff');

    // https://fontawesome.com/v5/cheatsheet
    // add icons to nodes
    const nodeIcon = node.append('text')
      .attr('font-family', 'FontAwesome')
      .attr('font-size', '1.25em')
      .attr('font-weight', 'normal')
      .style('fill', (d) => (d.type === NodeType.alarm ? alarmColor : nodeColor))
      .attr('dominant-baseline', 'middle')
      .attr('text-anchor', 'middle')
      .text((d) => (d.type === NodeType.alarm ? '\uf071' : '\uf013'));

    // add labels for nodes
    node.append('text')
      .text((d) => d.label)
      .style('text-anchor', 'middle')
      .attr('x', 0)
      .attr('y', `${nodeRadius + 10}px`);

    /**
     * Runs in each iteration of the force algorithm, updating the positions of the vertices
     * and edges
     */
    function ticked() {
      line // link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      labelLine
        .attr('x', (d) => (d.source.x + d.target.x) / 2)
        .attr('y', (d) => (d.source.y + d.target.y) / 2);

      node
        .attr('transform', (d) => `translate(${d.x},${d.y})`);
    }

    const simulation = d3.forceSimulation(mappedData.vertices)
      .force('link',
        d3.forceLink() // This force provides links between nodes
          .id((d) => d.id)
          .links(mappedData.edges))
      .force('charge', d3.forceManyBody().strength(-8000)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
      .force('center', d3.forceCenter(actualWidth / 2, actualHeight / 2)) // This force attracts nodes to the center of the svg area
      .on('end', ticked);
      // .stop();

    simulation.tick(1000); // TODO: what does this number mean? Something to with number of tries to reposition elements

    // drag handler
    // d is the node
    function drag_start(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.x = d.x;
      d.y = d.y;
    }

    function drag_drag(event, d) {
      d.x = event.x;
      d.y = event.y;
    }

    function drag_end(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.x = null;
      d.y = null;
    }

    const drag_handler = d3.drag()
      .on('start', drag_start)
      .on('drag', drag_drag)
      .on('end', drag_end);

    // same as using .call on the node variable as in https://bl.ocks.org/mbostock/4062045
    drag_handler(nodeIcon);
  }, [actualHeight, actualWidth, alarmColor, mappedData.edges, mappedData.vertices, nodeColor, nodeRadius, strokeColor]);

  return (
    <svg id="directedGraphSvg" width={width + margin.left + margin.right} height={height + margin.top + margin.bottom} aria-describedby="directedGraphTitle">
      <title id="directedGraphTitle">Directed graph of nodes</title>
      <defs>
        <marker id="arrowhead" viewBox="-0 -5 10 10" refX="13" refY="0" orient="auto" markerWidth="13" markerHeight="13" xoverflow="visible">
          <path d="M 0,-5 L 10 ,0 L 0,5" fill="#FFFF" />
        </marker>
      </defs>
      <g id="directedGraphGraphic" transform={`translate(${margin.left},${margin.top})`}>
        {/*
          { data.links.map((link, i) => <line key={i} style={{ stroke: strokeColor }} />)}
          { data.vertices.map((node, i) => <circle key={i} r="20" cx={i} cy={i} style={{ fill: nodeColor }} />)}
          */}
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
    vertices: PropTypes.arrayOf({
      id: PropTypes.number,
      label: PropTypes.string,
      type: PropTypes.oneOf(['node', 'alarm']),
    }),
    /** Lines between nodes */
    edges: PropTypes.arrayOf({
      source_id: PropTypes.number,
      target_id: PropTypes.string,
    }),
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
  nodeColor: '#156773',
  height: 600,
  strokeColor: '#FFFFF',
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
