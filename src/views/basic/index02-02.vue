<template>
  <a-button @click="addRect">addRect</a-button>
  <a-button @click="rectConfig">rectConfig</a-button>
  <a-button @click="addCustomNode">addCustomNode</a-button>
  <a-button @click="customNodeConfig">customNodeConfig</a-button>
  <div id="container"></div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from "vue";
import {Graph, Shape, Node, Cell, ObjectExt} from '@antv/x6';

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
        height: 40,
        label: 'label',
        markup: [
          {
            tagName: 'rect',
            selector: 'body',
          },
          {
            tagName: 'text',
            selector: 'label',
          },
        ],
        attrs: {
          // 指定 rect 元素的样式
          body: {
            // stroke: '#000', // 边框颜色
            fill: '#fff',   // 填充颜色
          },
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
        markup: [
          {
            tagName: 'rect',
            selector: 'body',
          },
          {
            tagName: 'text',
            selector: 'label',
          },
        ],
        attrs: {
          body: {
            fill: '#fff',
            stroke: '#000',
            strokeWidth: 2,
          },
          label: {
            fontSize: 14,
            fill: 'red',
            fontFamily: 'Arial, helvetica, sans-serif',
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
          }
        },
      })

      Shape.Rect.config({
        // 通过钩子将 label 应用到 'attrs/text/text' 属性上
        propHooks(metadata) {
          console.log(metadata)
          const { label, ...others } = metadata
          if (label) {
            ObjectExt.setByPath(others, 'attrs/text/text', label)
          }
          return others
        },
      })
    }


    const addCustomNode = () => {
      const customNode: Node = new Node({
        x: 100,
        y: 200,
        width: 200,
        height: 60,
        shape: 'circle',
        markup: [
          {
            tagName: 'rect',
            selector: 'body',
          },
          {
            tagName: 'text',
            selector: 'label',
          },
        ],
        attrs: {
          text: {
            // fill: '#000',
            fontSize: 14,
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
          },
          rect: {
            ref: 'label',
            stroke: '#000',
            fill: '#fff',
            rx: 3,
            ry: 3,
            refWidth: 100,
            refHeight: 100,
            refX: -50,
            refY: -50,
          },
          label: {
            text: "自定义node", // 文字
          },
        },
      });
      graph.addNode(customNode);

      const metadata: Node.Metadata = {
        x: 200,
        y: 200,
        label: 'rect',
        shape: 'rect',
        width: 200,
        height: 60,
      }
      graph.addNode(metadata)

    }

    const customNodeConfig = () => {
      // 只修改边框的默认颜色
      Node.config({
        attrs: {
          label: {
            fill: 'blue',
          },
        },
      })
    }

    return {
      addRect,
      rectConfig,
      addCustomNode,
      customNodeConfig

    }
  }
})
</script>

<style scoped>
</style>
