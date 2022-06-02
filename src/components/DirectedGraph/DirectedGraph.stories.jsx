import React from 'react';

import DirectedGraph from './DirectedGraph';

// const defaultData = {
//   vertices: [
//     {
//       id: 1, // TODO: 'n1'
//       label: 'Node 1',
//       type: 'node',
//     },
//     {
//       id: 2,
//       label: 'Node 2',
//       type: 'node',
//     },
//     {
//       id: 3,
//       label: 'Node 3',
//       type: 'node',
//     },
//     {
//       id: 4,
//       label: 'Node 4',
//       type: 'node',
//     },
//     {
//       id: 5,
//       label: 'Node 5',
//       type: 'node',
//     },
//     {
//       id: 6,
//       label: 'Node 6',
//       type: 'alarm',
//     },
//     {
//       id: 7,
//       label: 'Node 7',
//       type: 'alarm',
//     },
//     {
//       id: 8,
//       label: 'Node 8',
//       type: 'alarm',
//     },
//     {
//       id: 9,
//       label: 'Node 9',
//       type: 'alarm',
//     },
//     {
//       id: 10,
//       label: 'Node 10',
//       type: 'alarm',
//     },
//   ],
//   edges: [
//     {
//       id: 'e1',
//       label: 'edge n1-n2',
//       type: 'link',
//       source_id: 1, // 'n1'
//       target_id: 2, // 'n2'
//     },
//     {
//       id: 'e2',
//       label: 'edge n1-n5',
//       type: 'link',
//       source_id: 1,
//       target_id: 5,
//     },
//     {
//       id: 'e3',
//       label: 'edge n1-n6',
//       type: 'link',
//       source_id: 1,
//       target_id: 6,
//     },
//     {
//       id: 'e4',
//       label: 'edge n2-n3',
//       type: 'link',
//       source_id: 2,
//       target_id: 3,
//     },
//     {
//       id: 'e5',
//       label: 'edge n2-n7',
//       type: 'link',
//       source_id: 2,
//       target_id: 7,
//     },
//     {
//       id: 'e6',
//       label: 'edge n3-n4',
//       type: 'link',
//       source_id: 3,
//       target_id: 4,
//     },
//     {
//       id: 'e7',
//       label: 'edge n8-n1',
//       type: 'link',
//       source_id: 8,
//       target_id: 3,
//     },
//     {
//       id: 'e8',
//       label: 'edge n4-n5',
//       type: 'link',
//       source_id: 4,
//       target_id: 5,
//     },
//     {
//       id: 'e9',
//       label: 'edge n4-n9',
//       type: 'link',
//       source_id: 4,
//       target_id: 9,
//     },
//     {
//       id: 'e10',
//       label: 'edge n5-n10',
//       type: 'link',
//       source_id: 5,
//       target_id: 10,
//     },
//   ],
// };

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
      source_id: 1,
      target_id: 2,
    },
    {
      id: 2,
      label: 'edge n2-a1',
      type: 'link',
      source_id: 2,
      target_id: 3,
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
    strokeColor: { control: 'color', defaultValue: '#FFFF' },
    nodeColor: { control: 'color', defaultValue: '#156773' },
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
      background: '#A2DCE7',
    }}
  >
    <DirectedGraph {...props} />
  </div>
);
