<template>
  <div class="wrap">
    <!-- 左侧工具栏 -->
    <div class="sider" id="stencil"></div>
    <!-- 流程图画板 -->
    <div class="x6-graph" id="container"></div>
    <!-- 右侧工具栏 -->
    <div class="config"></div>
  </div>
</template>

<script lang="ts" setup>
  import FlowGraph from './graphKiangkiang';

  const getContainerSize = () => {
    return {
      width: document.body.offsetWidth - 590, //这个值是从何而来？下同
      height: document.body.offsetHeight - 50,
    };
  };

  const initGraph = function (): Function {
    const graph = FlowGraph.init();
    const resizeFn = () => {
      const { width, height } = getContainerSize();
      graph.resize(width, height);
    };
    resizeFn();
    window.addEventListener('resize', resizeFn);
    return () => {
      window.removeEventListener('resize', resizeFn);
    };
  };

  onMounted(() => {
    initGraph();
  });
</script>

<style lang="less" scoped>
  .wrap {
    width: 100%;
    height: 100%;
    display: flex;

    .sider {
      position: relative;
      width: 20%;
      height: 100vh;
      background-color: skyblue;
    }

    .x6-graph {
      width: 60%;
      height: 100vh;
      // background-color: gray;
    }

    .config {
      width: 20%;
      height: 100vh;
      background-color: seagreen;
    }
  }
</style>
