<template>
  <a-button @click="translate">平移</a-button>
  <a-button @click="reduce">缩小0.5</a-button>
  <a-button @click="zoom">放大0.5</a-button>
  <div id="container"></div>
</template>

<script lang="ts" setup>
  import { Graph } from '@antv/x6';
  import { onMounted } from 'vue';
  const data = ref({
    //节点
    nodes: [
      {
        id: 'node1',
        x: 0, // Number，必选，节点位置的 x 值
        y: 0, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        label: 'hello', // String，节点标签
      },
      {
        id: 'node2',
        x: 100, // Number，必选，节点位置的 x 值
        y: 100, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        label: 'world', // String，节点标签
      },
    ],
    //边
    edges: [
      {
        source: 'node1',
        target: 'node2',
      },
    ],
  });

  //初始化网格
  let graph: Graph;
  onMounted(() => {
    graph = new Graph({
      container: document.getElementById('container') as HTMLElement,
      width: 800,
      height: 600,
      background: {
        color: '#ffffff', // 设置画布背景颜色
      },
      grid: {
        size: 10, // 网格大小 10px
        visible: true, // 渲染网格背景
      },
      panning: true, //拖动画布
      //鼠标滚轮可以缩放画布，得按ctrl＋滚轮
      mousewheel: {
        enabled: true,
        modifiers: 'Ctrl',
        maxScale: 4,
        minScale: 0.2,
      },
    });
    graph.fromJSON(data.value);
  });
  const translate = () => {
    (graph as Graph).translate(100, 50);
  };
  const reduce = () => {
    (graph as Graph).zoom(-0.5);
  };
  const zoom = () => {
    (graph as Graph).zoom(0.5);
  };
</script>
