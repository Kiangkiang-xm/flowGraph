<template>
  <a-button @click="test01">添加边的同时添加标签</a-button>
  <a-button @click="test02">二次设置标签</a-button>
  <a-button @click="test03">定制样式</a-button>
  <a-button @click="busRoutes">实例：公交路线</a-button>
  <div id="container"></div>
</template>

<script lang="ts">
import {Graph,} from '@antv/x6';
import {defineComponent, onMounted} from "vue";

export default defineComponent({
  setup() {
    let graph: Graph;
    onMounted(() => {
      graph = new Graph({
        container: document.getElementById('container') as HTMLElement,
        height: 1200,
        background: {
          color: '#fffbe6', // 设置画布背景颜色
        },
        grid: {
          size: 10,      // 网格大小 10px
          visible: true, // 渲染网格背景
        },
        // 当源/目标是画布上的点时，需要开启 allowBlank 选项（默认已经开启）才能生效
        connecting: {
          allowBlank: false,
        },
      });

    })

    const test01 = () => {
      const edge1 = graph.addEdge({
        source: {x: 200, y: 100},
        target: {x: 200, y: 300},
        labels: [
          {
            attrs: {
              label: { text: '标签1' }
            },
            position: {
              distance: 0.3, // 位置
            },
          },
          {
            attrs: {
              label: { text: '标签2' }
            },
            position: {
              distance: 0.7, // 位置
            },
          },
          {
            attrs: {
              label: { text: '标签3' }
            },
            position: {
              distance: 0.5, // 位置
            },
          },
        ],
      })
      const edge2 = graph.addEdge({
        source: {x: 250, y: 100},
        target: {x: 250, y: 300},
        labels: [
          '标签1',
          '标签2'
        ], // 通过 labels 可以设置多个标签，当只设置标签文本是可以简化为此写法
      })
      const edge3 = graph.addEdge({
        source: {x: 300, y: 100},
        target: {x: 300, y: 300},
        label: '标签', // 通过 label 设置单个标签，当只设置标签文本是可以简化为此写法
      })
    }

    const test02 = () => {
      const edge = graph.addEdge({
        source: {x: 350, y: 100},
        target: {x: 350, y: 300},
      })
      // 设置标签
      edge.setLabels([{
        attrs: { label: { text: 'edge1' } },
        position: {
          distance: 0.1, // 位置
        },
      }])
      // 或
      edge.setLabels(['edge2'])

      // 添加单个标签
      edge.appendLabel({
        attrs: {
          label: { text: 'edge3' },
        },
        position: {
          distance: 0.7, // 位置
        },
      })
      // 或
      edge.appendLabel('edge4')
    }

    const test03 = () => {
      graph.addEdge({
        source: { x: 400, y: 100 },
        target: { x: 400, y: 300 },
        attrs: {
          line: {
            stroke: "#7c68fc", // 指定 path 元素的填充色
            sourceMarker: 'block', // 实心箭头
            targetMarker: {
              name: 'ellipse', // 椭圆
              rx: 10, // 椭圆箭头的 x 半径
              ry: 6,  // 椭圆箭头的 y 半径
            },
          },
        },
      })
    }


    const busRoutes = () => {
      graph.addEdge({
        source: {x: 100, y: 50},
        target: {x: 1400, y: 50},
        labels: [
          {
            markup: [
              {
                tagName: "circle",
                selector: "dot"
              },
              {
                tagName: "text",
                selector: "txt"
              }
            ],
            attrs: {
              txt: {
                fill: "#7c68fc",
                textAnchor: "middle",
                textVerticalAnchor: "middle",
                refX: 0,
                refY: 20,
                text: "始发站"
              },
              dot: {
                fill: "#fff",
                stroke: "red",
                strokeWidth: 1,
                r: 5,
                cx: 0,
                cy: 0,
              }
            },
            position: {
              distance: 0, // 位置
            }
          },
          {
            markup: [
              {
                tagName: "circle",
                selector: "dot"
              },
              {
                tagName: "text",
                selector: "txt"
              }
            ],
            attrs: {
              txt: {
                fill: "#7c68fc",
                textAnchor: "middle",
                textVerticalAnchor: "middle",
                refX: 0,
                refY: 20,
                text: "站点A"
              },
              dot: {
                fill: "#fff",
                stroke: "#000",
                strokeWidth: 1,
                r: 5,
                cx: 0,
                cy: 0,
              }
            },
            position: {
              distance: 0.2, // 位置
            }
          },
          {
            markup: [
              {
                tagName: "circle",
                selector: "dot"
              },
              {
                tagName: "text",
                selector: "txt"
              }
            ],
            attrs: {
              txt: {
                fill: "#7c68fc",
                textAnchor: "middle",
                textVerticalAnchor: "middle",
                refX: 0,
                refY: 20,
                text: "站点B（车辆当前位置）"
              },
              dot: {
                fill: "green",
                stroke: "#000",
                strokeWidth: 1,
                r: 5,
                cx: 0,
                cy: 0,
              }
            },
            position: {
              distance: 0.5, // 位置
            }
          },
          {
            markup: [
              {
                tagName: "circle",
                selector: "dot"
              },
              {
                tagName: "text",
                selector: "txt"
              }
            ],
            attrs: {
              txt: {
                fill: "#7c68fc",
                textAnchor: "middle",
                textVerticalAnchor: "middle",
                refX: 0,
                refY: 20,
                text: "终点站"
              },
              dot: {
                fill: "#fff",
                stroke: "red",
                strokeWidth: 1,
                r: 5,
                cx: 0,
                cy: 0,
              }
            },
            position: {
              distance: 1, // 位置
            }
          },
        ],
        attrs:{
          line: {
            stroke: "#7c68fc",
            sourceMarker: '',
            targetMarker: '',
          },
        }
      })
    }

    return {
      test01,
      test02,
      test03,
      busRoutes
    }
  }
})
</script>

<style scoped>

</style>