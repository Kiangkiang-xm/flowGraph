<template>
  <div id="container"></div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive} from "vue";
import { Graph } from '@antv/x6';
export default defineComponent({
  setup() {
    const data = {
      // 节点
      nodes: [
        {
          id: 'node1', // String，可选，节点的唯一标识
          shape: 'rect', // 使用 rect 渲染
          x: 100,       // Number，必选，节点位置的 x 值
          y: 200,       // Number，必选，节点位置的 y 值
          width: 80,   // Number，可选，节点大小的 width 值
          height: 40,  // Number，可选，节点大小的 height 值
          label: '矩形', // String，节点标签
        },
        {
          id: 'node2', // String，节点的唯一标识
          shape: 'ellipse', // 使用 ellipse 渲染
          x: 300,      // Number，必选，节点位置的 x 值
          y: 200,      // Number，必选，节点位置的 y 值
          width: 80,   // Number，可选，节点大小的 width 值
          height: 40,  // Number，可选，节点大小的 height 值
          label: '椭圆', // String，节点标签
        },
        {
          id: 'node3', // String，节点的唯一标识
          shape: 'circle', // 使用 circle 渲染
          x: 500,      // Number，必选，节点位置的 x 值
          y: 200,      // Number，必选，节点位置的 y 值
          width: 80,   // Number，可选，节点大小的 width 值
          height: 40,  // Number，可选，节点大小的 height 值
          label: '圆形', // String，节点标签
        },

        {
          id: 'node4', // String，节点的唯一标识
          shape: 'polygon', // 使用 polygon 渲染
          x: 700,      // Number，必选，节点位置的 x 值
          y: 200,      // Number，必选，节点位置的 y 值
          width: 80,   // Number，可选，节点大小的 width 值
          height: 40,  // Number，可选，节点大小的 height 值
          label: '多边形', // String，节点标签
          attrs: {
            body: {
              fill: '#efdbff',
              stroke: '#9254de',
              // 指定 refPoints 属性，多边形顶点随图形大小自动缩放
              // https://x6.antv.vision/zh/docs/api/registry/attr#refpointsresetoffset
              refPoints: '0,10 10,0 20,10 10,20',
            },
          },
        },
        {
          id: 'node5', // String，节点的唯一标识
          shape: 'path', // 使用 path 渲染
          x: 900,      // Number，必选，节点位置的 x 值
          y: 200,      // Number，必选，节点位置的 y 值
          width: 80,   // Number，可选，节点大小的 width 值
          height: 40,  // Number，可选，节点大小的 height 值
          label: '路径', // String，节点标签
          path: 'M 0 5 10 0 C 20 0 20 20 10 20 L 0 15 Z',
        },

      ],
      // 边
      edges: [
        {
          source: 'node1', // String，必须，起始节点 id
          target: 'node2', // String，必须，目标节点 id
        },
        {
          source: 'node2', // String，必须，起始节点 id
          target: 'node3', // String，必须，目标节点 id
        },
        {
          source: 'node3', // String，必须，起始节点 id
          target: 'node4', // String，必须，目标节点 id
        },
        {
          source: 'node4', // String，必须，起始节点 id
          target: 'node5', // String，必须，目标节点 id
        },
      ],
    };
    let graph = {}
    onMounted(() => {
      graph = new Graph({
        container: document.getElementById('container') as HTMLElement,
        width: 2800,
        height: 600,
        autoResize:true,
        background: {
          color: '#fffbe6', // 设置画布背景颜色
        },
        grid: {
          size: 10,      // 网格大小 10px
          visible: true, // 渲染网格背景
        },
      });
      (graph as Graph).fromJSON(data)
    })
    return {
    }
  }
})
</script>

<style scoped>

</style>
