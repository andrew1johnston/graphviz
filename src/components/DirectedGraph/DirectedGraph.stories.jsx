import React from 'react';

import DirectedGraph from './DirectedGraph';

const defaultData = {
  vertices: [
    {
      id: 1,
      label: 'Node 1',
      type: 'node',
    },
    {
      id: 2,
      label: 'Node 2',
      type: 'node',
    },
    {
      id: 3,
      label: 'Alarm 1',
      type: 'alarm',
    },
  ],
  edges: [
    {
      id: 1,
      label: 'edge n1-n2',
      type: 'link',
      source: 1,
      target: 2,
    },
    {
      id: 2,
      label: 'edge n2-a1',
      type: 'link',
      source: 2,
      target: 3,
    },
  ],
};

export default {
  component: DirectedGraph,
  title: 'Directed Graph',
  argTypes: {
    data: {
      control: {
        type: 'object',
      },
      defaultValue: defaultData,
    },
    alarmColor: { control: 'color', defaultValue: '#F43C34' },
    strokeColor: { control: 'color', defaultValue: '#000' },
    nodeColor: { control: 'color', defaultValue: '#000' },
    width: {
      control: {
        type: 'number',
      },
      defaultValue: 600,
    },
    height: {
      control: {
        type: 'number',
      },
      defaultValue: 600,
    },
    margin: {
      control: {
        type: 'object',
      },
      defaultValue: {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40,
      },
    },
  },
};

export const directedGraph = (props) => (
  <div
    style={{
      fontFamily: '"Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
    }}
  >
    <DirectedGraph {...props} />
  </div>
);
