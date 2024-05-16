import { Graph, Shape, Addon } from '@antv/x6';

export default class FlowGraph {
  public static graph: Graph;
  private static stencil: Addon.Stencil;

  public static init() {
    this.graph = new Graph({
      container: document.getElementById('container')!,
      width: 1000,
      height: 800,
      grid: {
        size: 10,
        visible: true,
        type: 'doubleMesh', //表示网格是双网格
        args: [
          {
            color: '#f0f0f0',
            thickness: 1,
          },
          {
            color: '#d3d3d3',
            thickness: 1,
            factor: 4,
          },
        ],
      },
      //画布滚动条
      scroller: {
        enabled: true, //滚动条是否启动
        pageVisible: true, //表示是否在滚动条中显示分页   （直接尝试一下就知道是什么了）
        pageBreak: true, //用于控制是否在滚动时进行分页
        pannable: false, //允许拖拽来移动画布
      },
      // 滚动鼠标滚轮来缩放图形编辑器的视图
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
        minScale: 0.5,
        maxScale: 2,
      },
      selecting: {
        enabled: true, //启用选择功能
        multiple: true, //是否允许同时选择多个图形元素
        rubberband: true, //橡皮筋选择：允许用户通过拖拽鼠标来创建一个矩形选择区域，所有再这个区域内的元素都被选中
        movable: true, //一旦被选中，用户可以通过拖拽操作来移动这些选中的元素
        showNodeSelectionBox: true, //在选中的节点周围显示一个可视的选择框，帮助用户识别哪些元素已经被选中
      },
      connecting: {
        anchor: 'center', //定义了连接点（anchor）的位置，这里是 'center'，表示连接点位于节点的中心
        connectionPoint: 'anchor', //定义了连接点的类型，这里同样使用 'anchor'，表示使用锚点作为连接点
        allowBlank: false, //是否允许创建没有源节点或目标节点的边。这里设置为 false，意味着每条边都必须有明确的源节点和目标节点
        highlight: true, //设置为 true 表示当鼠标悬停在连接点上时，会高亮显示连接点
        snap: true, //设置为 true 表示连接点会吸附到最近的锚点，以便于用户连接
        //createEdge方法用于创建新的边
        createEdge() {
          return new Shape.Edge({
            attrs: {
              //attrs: 定义了边的样式，包括线的颜色（stroke）、线宽（strokeWidth）和目标标记（targetMarker）的样式和大小
              line: {
                stroke: '#5F95FF',
                strokeWidth: 1,
                targetMarker: {
                  name: 'classic',
                  size: 8,
                },
              },
            },
            router: {
              //router: 定义了边的路由方式，这里是 'manhattan'，意味着边将沿着水平或垂直方向绘制，类似于曼哈顿街道的布局
              name: 'manhattan',
            },
          });
        },
        //validateConnection: 一个方法，用于验证两个图形元素之间的连接是否有效
        validateConnection({ sourceView, targetView, sourceMagnet, targetMagnet }) {
          if (sourceView === targetView) {
            return false;
          }
          if (!sourceMagnet) {
            return false;
          }
          if (!targetMagnet) {
            return false;
          }
          return true;
        },
      },
      snapline: true, //设置为 true，表示启用了对齐线（snapline）功能
      //enabled: true: 表示启用剪贴板功能，允许用户对图形元素执行复制、粘贴、剪切等操作。
      clipboard: {
        enabled: true,
      },
      //enabled: true: 表示启用键盘快捷键功能，允许用户通过键盘操作来执行图形编辑器中的各种命令，提高操作效率。
      keyboard: {
        enabled: true,
      },
    });
    this.initStencil();
    this.initShape();
    return this.graph;
  }

  private static initStencil() {
    this.stencil = new Addon.Stencil({
      target: this.graph,
      stencilGraphWidth: 280,
      search: { rect: true },
      collapsable: true,
      groups: [
        {
          name: 'basic',
          title: '基础节点',
          graphHeight: 180,
        },
        {
          name: 'combination',
          title: '组合节点',
          layoutOptions: {
            columns: 1,
            marginX: 60,
          },
          graphHeight: 260,
        },
        {
          name: 'group',
          title: '节点组',
          graphHeight: 100,
          layoutOptions: {
            columns: 1,
            marginX: 60,
          },
        },
      ],
    });
    const stencilContainer = document.querySelector('#stencil');
    stencilContainer?.appendChild(this.stencil.container);
  }

  private static initShape() {
    console.log(this);
    const { graph } = this;
    console.log(graph);
    //基础节点
    const r1 = graph.createNode({
      shape: 'flow-chart-rect',
      attrs: {
        body: {
          rx: 24,
          ry: 24,
        },
        text: {
          text: '起始节点1',
        },
      },
    });
    const r2 = graph.createNode({
      shape: 'flow-chart-rect',
      attrs: {
        text: {
          text: '流程节点',
        },
      },
    });
    const r3 = graph.createNode({
      shape: 'flow-chart-rect',
      width: 52,
      height: 52,
      angle: 45,
      attrs: {
        'edit-text': {
          style: {
            transform: 'rotate(-45deg)',
          },
        },
        text: {
          text: '判断节点',
          transform: 'rotate(-45deg)',
        },
      },
      ports: {
        groups: {
          top: {
            position: {
              name: 'top',
              args: {
                dx: -26,
              },
            },
          },
          right: {
            position: {
              name: 'right',
              args: {
                dy: -26,
              },
            },
          },
          bottom: {
            position: {
              name: 'bottom',
              args: {
                dx: 26,
              },
            },
          },
          left: {
            position: {
              name: 'left',
              args: {
                dy: 26,
              },
            },
          },
        },
      },
    });
    const r4 = graph.createNode({
      shape: 'flow-chart-rect',
      width: 70,
      height: 70,
      attrs: {
        body: {
          rx: 35,
          ry: 35,
        },
        text: {
          text: '链接节点',
        },
      },
    });
    //组合节点
    const c1 = graph.createNode({
      shape: 'flow-chart-image-rect',
    });
    const c2 = graph.createNode({
      shape: 'flow-chart-title-rect',
    });
    const c3 = graph.createNode({
      shape: 'flow-chart-animate-text',
    });
    //节点组
    const g1 = graph.createNode({
      shape: 'groupNode',
      attrs: {
        text: {
          text: 'Group Name',
        },
      },
      data: {
        parent: true,
      },
    });
    this.stencil.load([r1, r2, r3, r4], 'basic');
    this.stencil.load([c1, c2, c3], 'combination');
    this.stencil.load([g1], 'group');
  }
}
