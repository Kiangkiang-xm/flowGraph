<template>
  <a-button @click="addNodeAndEdge">使用这些图形的构造函数来创建节点/边，然后调用 graph.addNode 或 graph.addEdge 方法将其添加到画布</a-button>
  <a-button @click="test01">test01：react内置节点+selector选择器</a-button>
  <a-button @click="test02">test02：自定义节点+标签+selector选择器</a-button>
  <a-button @click="test03">test03：自定义节点+标签+selector选择器+群组选择器</a-button>
  <a-button @click="test04">test04：自定义节点例子</a-button>
  <a-button @click="test05">test05：使用 CSS 来定制样式</a-button>
  <a-button @click="test06">test06：鼠标点击修改内容</a-button>
  <a-button @click="test07">test07：鼠标点击修改内容</a-button>

  <div id="container"></div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from "vue";
import {Graph, Shape, Node, Dom} from '@antv/x6';
export default defineComponent({
  setup() {
    let graph: any = {}
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

      // graph.on('blank:click', () => {
      //   type.value = "grid"
      // })
      // (graph as Graph).on('cell:click', ({ cell }) => {
      //
      //   console.log(cell)
      //
      //   // type.value = cell.isNode() ? "node" : "edge"
      //   // id.value = cell.id
      // });

      // Shape.Rect.config({
      //   width: 80,
      //   height: 40,
      //   markup: [
      //     {
      //       tagName: 'rect',
      //       selector: 'body',
      //     },
      //     {
      //       tagName: 'text',
      //       selector: 'label',
      //     },
      //   ],
      //   attrs: {
      //     body: {
      //       fill: '#fff',
      //       stroke: '#000',
      //       strokeWidth: 2,
      //     },
      //     label: {
      //       fontSize: 14,
      //       fill: '#333',
      //       fontFamily: 'Arial, helvetica, sans-serif',
      //       textAnchor: 'middle',
      //       textVerticalAnchor: 'middle',
      //     }
      //   },
      // })
      //
      // // 只修改边框的默认颜色
      // Shape.Rect.config({
      //   attrs: {
      //     body: {
      //       stroke: 'red',
      //     },
      //   },
      // })
      //
      // // 只修改默认文本颜色
      // Shape.Rect.config({
      //   attrs: {
      //     label: {
      //       fill: 'blue',
      //       // 覆盖上面定义的 red
      //       stroke: '#000',
      //     },
      //   },
      // })
      //
      // graph.addNode({
      //   x: 100,
      //   y: 100,
      //   attrs: {
      //     label: {
      //       text: 'rect1',
      //     },
      //   },
      // })

      // rect.attr('label/text', 'hello');
      // // 等同于
      // rect.attr('label', {
      //   text: 'hello'
      // });
      // // 等同于
      // rect.attr({
      //   label: {
      //     text: 'hello'
      //   }
      // });
      // // 当传入的属性值为 null 时可以移除该属性。
      // rect.attr('label/text', null);

      // (graph as Graph).addNode({
      //   x: 320,
      //   y: 120,
      //   width: 96,
      //   height: 96,
      //   markup: [
      //     {
      //       tagName: 'rect',
      //       selector: 'body',
      //     },
      //     {
      //       tagName: 'text',
      //       selector: 'title',
      //     },
      //   ],
      //
      //   attrs: {
      //     title: {
      //       text: 'Node',
      //       refX: 40,
      //       refY: 14,
      //       fill: 'rgba(0,0,0,0.85)',
      //       fontSize: 12,
      //       'text-anchor': 'start',
      //     }
      //   }
      // });

      // (graph as Graph).addNode({
      //   x: 500,
      //   y: 200,
      //   width: 96,
      //   height: 96,
      //   markup: [
      //     {
      //       tagName: 'rect',
      //       selector: 'body',
      //       groupSelector: 'group1',
      //     },
      //     {
      //       tagName: 'rect',
      //       selector: 'wrap',
      //       groupSelector: 'group1',
      //     },
      //     {
      //       tagName: 'text',
      //       selector: 'label',
      //     },
      //   ],
      //
      //   attrs: {
      //     group1: {
      //       fill: '#2ECC71',
      //     },
      //   }
      // });

      // (graph as Graph).addNode(new Shape.Rect({
      //   x: 140,
      //   y: 140,
      //   width: 100,
      //   height: 140,
      //   data: {
      //     bizID: 125,
      //     date: '20200630',
      //     price: 89.00,
      //   }
      // }));

    })


    const addNodeAndEdge = ()=>{
      const rect = new Shape.Rect({
        id: 'node1',
        x: 10,
        y: 40,
        width: 100,
        height: 40,
        label: 'rect',
        zIndex: 2,
        attrs: {
          // 指定 rect 元素的样式
          body: {
            stroke: '#000', // 边框颜色
            fill: '#fff',   // 填充颜色
          },
          // 指定 text 元素的样式
          label: {
            text: 'rect', // 文字
            fill: '#333', // 文字颜色
          },
        },
      });
      const circle = new Shape.Circle({
        id: 'node2',
        x: 200,
        y: 30,
        width: 60,
        height: 60,
        label: 'circle',
        zIndex: 2,
      });
      const edge = new Shape.Edge({
        id: 'edge1',
        source: rect,
        target: circle,
        zIndex: 1,
      });
      (graph as Graph).addNode(rect);
      (graph as Graph).addNode(circle);
      (graph as Graph).addEdge(edge);
    }

    const test01 = () => {
      const rect = new Shape.Rect({
        x: 10,
        y: 100,
        width: 100,
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
          // 指定 rect 元素的样式
          body: {
            stroke: '#000', // 边框颜色
            fill: '#fff',   // 填充颜色
            refWidth: '100%',
            refHeight: '100%',
          },
          // 指定 text 元素的样式
          label: {
            text: 'rect', // 文字
            fill: 'blue', // 文字颜色
          },
        },
      });

      (graph as Graph).addNode(rect);

    }

    const test02 = () =>{
      const metadata: Node.Metadata  = {
        x: 10,
        y: 150,
        width: 200,
        height: 60,
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
            fill: '#000',
            fontSize: 14,
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
            pointerEvents: 'none',
          },

          rect: {
            fill: '#fff',
            rx: 3,
            ry: 3,
            refWidth: 1,
            refHeight: 1,
            refX: 0,
            refY: 0,
          },
          // 指定 rect 元素的样式
          body: {
            stroke: '#000', // 边框颜色
            fill: '#fff',   // 填充颜色
            refWidth: '100%',
            refHeight: '100%',
          },
          // 指定 text 元素的样式
          label: {
            text: 'rect', // 文字
            fill: 'blue', // 文字颜色
          },

        },
      };

      (graph as Graph).addNode(metadata);

    }

    const test03 = () =>{
      const metadata: Node.Metadata  = {
        x: 10,
        y: 220,
        width: 200,
        height: 60,
        markup: [
          {
            tagName: 'rect',
            selector: 'body',
          },
          {
            tagName: 'text',
            selector: 'title',
            groupSelector: 'textGroup',
          },
          {
            tagName: 'text',
            selector: 'content',
            groupSelector: 'textGroup',
          },
        ],
        attrs: {
          body: {
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: 'rgba(95,149,255,0.05)',
          },
          title: {
            text: 'Node',
            refX: 40,
            refY: 14,
            // fill: 'rgba(0,0,0,0.85)',
            fontSize: 12,
            'text-anchor': 'start',
          },
          // 优先级最大
          content: {
            text: 'this is content text',
            refX: 40,
            refY: 38,
            fontSize: 12,
            // fill: 'red',
            'text-anchor': 'start',
          },
          // 优先级次之
          textGroup: {
            fill: 'rgba(0,0,0,0.6)',
          },
          // 标签 优先级最小
          // text:{
          //   text: 'this is content text',
          //   fill: '#5F95FF',
          // },
        },
      };

      (graph as Graph).addNode(metadata);
    }

    const test04 = () =>{
      const metadata: Node.Metadata  = {
        x: 10,
        y: 300,
        width: 200,
        height: 60,
        markup: [
          {
            tagName: 'rect',
            selector: 'body',
          },
          {
            tagName: 'image',
            selector: 'image',
          },
          {
            tagName: 'text',
            selector: 'title',
          },
          {
            tagName: 'text',
            selector: 'text',
          },
        ],
        attrs: {
          body: {
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: 'rgba(95,149,255,0.05)',
          },
          image: {
            'xlink:href':
                'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
            width: 16,
            height: 16,
            x: 12,
            y: 12,
          },
          title: {
            text: 'Node',
            refX: 40,
            refY: 14,
            fill: 'rgba(0,0,0,0.85)',
            fontSize: 12,
            'text-anchor': 'start',
          },
          text: {
            text: 'this is content text',
            refX: 40,
            refY: 38,
            fontSize: 12,
            fill: 'rgba(0,0,0,0.6)',
            'text-anchor': 'start',
          },
        },
      };
      (graph as Graph).addNode(metadata);
    }

    const test05 = () =>{
      const metadata: Node.Metadata  = {
        x: 10,
        y: 370,
        width: 200,
        height: 60,
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
            fill: '#000',
            // text: 'rect',
            fontSize: 14,
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
            pointerEvents: 'auto',
            // class: 'x6-edit-text',
          },
          rect: {
            class: 'markupTest05Rect',
            fill: '#fff',
            rx: 3,
            ry: 3,
            refWidth: 1,
            refHeight: 1,
            refX: 0,
            refY: 0,
          },
          // 指定 rect 元素的样式
          // body: {
          //   stroke: '#000', // 边框颜色
          //   fill: '#fff',   // 填充颜色
          //   refWidth: '100%',
          //   refHeight: '100%',
          // },
          // 指定 text 元素的样式
          label: {
            text: 'rect', // 文字
            fill: 'blue', // 文字颜色
          },
        },
      };

      (graph as Graph).addNode(metadata);
    }

    const test06 = () =>{
      const textBlock = new Shape.TextBlock({
        shape: 'text-block', // 使用 text-block 渲染 https://x6.antv.vision/zh/examples/node/native-node#text-block
        text: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
        attrs: {
          label:{
            contenteditable: "true",
          },
          body: {
            fill: '#efdbff',
            stroke: '#9254de',
            rx: 4,
            ry: 4,
          },
        },
        x: 300,      // Number，必选，节点位置的 x 值
        y: 40,      // Number，必选，节点位置的 y 值
        width: 360,   // Number，可选，节点大小的 width 值
        height: 120,  // Number，可选，节点大小的 height 值
      });

      (graph as Graph).addNode(textBlock);

      // (graph as Graph).on('node:contextmenu', ({ cell, view }) => {
      //   console.log(view.container);
      //   const elem = view.container.querySelector('label') as unknown as HTMLElement
      //   if (elem) {
      //     elem.focus()
      //   }
      //   const onBlur = () => {
      //     console.log(elem.innerText)
      //     // cell.attr('text/text', elem.innerText)
      //     cell.attr('label/text', elem.innerText)
      //   }
      //   elem.addEventListener('blur', () => {
      //     onBlur()
      //     elem.removeEventListener('blur', onBlur)
      //   })
      // })
    }

    const test07 = () =>{
      const metadata: Node.Metadata  = {
        x: 300,
        y: 200,
        width: 200,
        height: 60,
        markup: [
          {
            tagName: 'rect',
            selector: 'body',
          },
          {
            tagName: 'text',
            selector: 'label',
          },
          {
            tagName: 'foreignObject',
            selector: 'fo',
            children: [
              {
                ns: Dom.ns.xhtml,
                tagName: 'body',
                selector: 'foBody',
                children: [
                  {
                    tagName: 'div',
                    selector: 'editText',
                  },
                ],
              },
            ],
          },
        ],
        attrs: {
          rect: {
            fill: '#fff',
            rx: 3,
            ry: 3,
            refWidth: 1,
            refHeight: 1,
            refX: 0,
            refY: 0,
          },
          text: {
            fill: '#000',
            fontSize: 14,
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
            pointerEvents: 'none',
          },

          // 指定 rect 元素的样式
          body: {
            stroke: '#000', // 边框颜色
            fill: '#fff',   // 填充颜色
            refWidth: '100%',
            refHeight: '100%',
          },
          // 指定 text 元素的样式
          label: {
            // text: 'rect', // 文字
            fill: 'blue', // 文字颜色
          },

          fo: {
            refWidth: '100%',
            refHeight: '100%',
          },
          foBody: {
            xmlns: Dom.ns.xhtml,
            style: {
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          },

          editText: {
            text: "11111111111",
            contenteditable: 'true',
            class: 'x6-edit-text',
            style: {
              width: '100%',
              textAlign: 'center',
              fontSize: 12,
              color: 'rgba(0,0,0,0.85)',
            },
          },

        },
      };

      (graph as Graph).addNode(metadata);
    }

    return {
      addNodeAndEdge,
      test01,
      test02,
      test03,
      test04,
      test05,
      test06,
      test07
    }
  }
})
</script>

<style scoped>
/*.x6-node rect*/
#container >>> .markupTest05Rect{
  fill: #2ECC71;
  stroke: #000;
}
</style>
