<template>
  <a-row :gutter="[8,8]">
    <a-button @click="addNodeAndEdge">使用这些图形的构造函数来创建节点/边，然后调用 graph.addNode 或 graph.addEdge 方法将其添加到画布</a-button>
    <a-button @click="test01">test01：react内置节点+selector选择器</a-button>
    <a-button @click="test02">test02：Node.Metadata+标签+selector选择器</a-button>
    <a-button @click="test03">test03：Node.Metadata+标签+selector选择器+群组选择器</a-button>
    <a-button @click="test04">test04：Node.Metadata例子</a-button>
    <a-button @click="test05">test05：使用 CSS 来定制样式</a-button>
    <a-button @click="test06">test06：鼠标点击修改内容</a-button>
    <a-button @click="test07">test07：通过控制面板修改属性</a-button>
  </a-row>

  <a-row :gutter="[16,8]" style="padding-top: 10px">
    <a-col :span="20">
     <div id="container"></div>
    </a-col>
    <!--右侧工具栏-->
    <a-col :span="4">
      <a-form :model="formState">
        <a-form-item label="标题" v-if="formState.labelText">
          <a-input v-model:value="formState.labelText" @change="onNameChange"/>
        </a-form-item>

        <a-form-item label="用户" v-if="formState.userId">
          <a-select v-model:value="formState.userId" placeholder="请选择用户">
            <a-select-option :value = 1 >张三</a-select-option>
            <a-select-option :value = 2 >李四 </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="角色" v-if="formState.roleId">
          <a-select v-model:value="formState.roleId" placeholder="请选择角色">
            <a-select-option :value = 1 > 管理员1 </a-select-option>
            <a-select-option :value = 2 > 管理员2 </a-select-option>
          </a-select>
        </a-form-item>

      </a-form>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, UnwrapRef, nextTick} from "vue";
import {Graph, Shape, Node, Cell} from '@antv/x6';

interface FormState {
  labelText: any;
  userId: any;
  roleId: any;
}

export default defineComponent({
  setup() {
    let graph: Graph;
    let curCel: Cell | null;

    const formState: UnwrapRef<FormState> = reactive({
      labelText: '',
      userId: '',
      roleId: ''
    });


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

    nextTick(()=>{
      graph.on('cell:click', ({cell}) => {

        console.log(cell.getAttrs())

        curCel?.attr('body/stroke', null)
        curCel = cell
        curCel?.attr('body/stroke', "red")

        let labelText = null;
        if (cell.getAttrs()?.text?.text) labelText = cell.getAttrs()?.text?.text
        if (cell.getAttrs()?.label?.text) labelText = cell.getAttrs()?.label?.text
        formState.labelText = labelText;

        formState.userId = cell.getData()?.userId

        formState.roleId = cell.getData()?.roleId

      });
    })


    const onNameChange = (e: Event) => {
      console.log(e)
      curCel?.attr('label/text', formState.labelText)

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
    }


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

      graph.addNode(rect);

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

      graph.addNode(metadata);

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
            selector: 'label',
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
          label: {
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
            selector: 'label',
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
          label: {
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

      graph.addNode(textBlock);

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
            text: "react", // 文字
            fill: 'blue', // 文字颜色
          },

        },
        data: {
          userId: 1,
          roleId: 1,
        }
      };
      (graph as Graph).addNode(metadata);
    }



    return {
      formState,
      onNameChange,

      addNodeAndEdge,
      test01,
      test02,
      test03,
      test04,
      test05,
      test06,
      test07,
    }
  }
})
</script>

<style scoped>
/*.x6-node rect*/
#container >>> .markupTest05Rect{
  fill: #2ECC71;
  /*stroke: #000;*/
}
</style>
