<template>
  <a-button @click="addRect">addRect</a-button>
  <a-button @click="rectConfig">rectConfig</a-button>
  <a-button @click="toJson">toJSON</a-button>

  <div id="container"></div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from "vue";
import {Graph, Shape, Node, ObjectExt} from '@antv/x6';

export default defineComponent({
  setup() {
    let graph: Graph;

    onMounted(() => {
      graph = new Graph({
        container: document.getElementById('container') as HTMLElement,
        height: 600,
        background: {
          color: '#fffbe6', // 设置画布背景颜色
        },
        grid: {
          size: 10,      // 网格大小 10px
          visible: true, // 渲染网格背景
        },
      });

    })

    const addRect = ()=>{
      const rect = new Shape.Rect({
        x: 10,
        y: 40,
        width: 100,
        height: 45,
        attrs: {
          // 指定 text 元素的样式
          label: {
            text: 'attrs/label', // 文字
            // fill: '#333', // 文字颜色
          },
        },
      });
      graph.addNode(rect);
    }

    const rectConfig = ()=>{
      Shape.Rect.config({
        width: 80,
        height: 40,
        attrs: {
          label: {
            fill: 'red',
          }
        },
        data: {
          tableId: 1
        },
        // 通过钩子将 label 应用到 'attrs/text/text' 属性上
        propHooks(metadata) {
          console.log(metadata)
          const { data, ...others } = metadata
          if (data) {
            ObjectExt.setByPath(others, 'data/tableId', 2)
          }
          // ObjectExt.setByPath(others, 'attrs/body/fill', "green")

          return others
        },
      })
    }


    const toJson = () => {
      console.log(graph.toJSON())
    }
    return {
      addRect,
      rectConfig,
      toJson
    }
  }
})
</script>

<style scoped>
</style>
