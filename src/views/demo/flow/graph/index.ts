import { Graph, Addon, FunctionExt, Shape } from '@antv/x6';
import './shape';
import graphData from './data';

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
        type: 'doubleMesh',
        args: [
          {
            color: '#cccccc',
            thickness: 1,
          },
          {
            color: '#5F95FF',
            thickness: 1,
            factor: 4,
          },
        ],
      },
      // 画布平移
      scroller: {
        enabled: true,
        pageVisible: true,
        pageBreak: true,
        pannable: false,
      },
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
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        highlight: true,
        snap: true,
        createEdge() {
          return new Shape.Edge({
            attrs: {
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
              name: 'manhattan',
            },
          });
        },
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
      highlighting: {
        magnetAvailable: {
          name: 'stroke',
          args: {
            padding: 4,
            attrs: {
              strokeWidth: 4,
              // stroke: 'rgba(223,234,255)',
              stroke: 'skyblue',
            },
          },
        },
      },
      snapline: true, //设置为 true，表示启用了对齐线（snapline）功能
      history: true, //  --------------------------------------------------------------暂时没写----------
      clipboard: {
        enabled: true,
      },
      keyboard: {
        enabled: true,
      },
      embedding: {
        enabled: true,
        findParent({ node }) {
          const bbox = node.getBBox();
          return this.getNodes().filter((node) => {
            // 只有 data.parent 为 true 的节点才是父节点
            const data = node.getData<any>();
            if (data && data.parent) {
              const targetBBox = node.getBBox();
              return bbox.isIntersectWithRect(targetBBox);
            }
            return false;
          });
        },
      },
    });
    this.initStencil();
    this.initShape();
    this.initGraphShape();
    this.initEvent();
    return this.graph;
  }
  //搜索功能
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
          graphHeight: 200,
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
      //测试数据
      data: {
        attrsName: ['流程1', '流程2', '流程3'],
        attrsValue: [],
      },
    });
    const r3 = graph.createNode({
      shape: 'flow-chart-rect',
      width: 52,
      height: 52,
      angle: 45,
      //测试数据
      data: {
        attrsName: ['判断1', '判断2', '判断3'],
        attrsValue: [],
      },
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

    const c1 = graph.createNode({
      shape: 'flow-chart-image-rect',
    });
    const c2 = graph.createNode({
      shape: 'flow-chart-title-rect',
    });
    // const c3 = graph.createNode({
    //   shape: 'flow-chart-animate-text',
    // });

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
    this.stencil.load([c1, c2], 'combination');
    this.stencil.load([g1], 'group');
    // this.stencil.render();
    // this.stencil.unload([c3],'combination')
  }

  // 初始化画布
  private static initGraphShape() {
    this.graph.fromJSON(graphData as any);
  }

  private static showPorts(ports: NodeListOf<SVGAElement>, show: boolean) {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden';
    }
  }

  private static initEvent() {
    const { graph } = this;
    const container = document.getElementById('container')!;

    // 右键编辑文本
    graph.on('node:contextmenu', ({ cell, view }) => {
      console.log(view.container);
      const oldText = cell.attr('text/text') as string;
      cell.attr('text/style/display', 'none');
      const elem = view.container.querySelector('.x6-edit-text') as HTMLElement;
      if (elem) {
        elem.innerText = oldText;
        elem.focus();
      }
      const onBlur = () => {
        cell.attr('text/text', elem.innerText);
      };
      if (elem) {
        elem.addEventListener('blur', () => {
          onBlur();
          elem.removeEventListener('blur', onBlur);
        });
      }
    });
    //鼠标移入显示端口
    graph.on(
      'node:mouseenter',
      FunctionExt.debounce(() => {
        const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGAElement>;
        this.showPorts(ports, true);
      }),
      500,
    );
    //鼠标移出隐藏端口
    graph.on('node:mouseleave', () => {
      const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGAElement>;
      this.showPorts(ports, false);
    });

    graph.on('node:collapse', ({ node, e }: any) => {
      e.stopPropagation();
      node.toggleCollapse();
      const collapsed = node.isCollapsed();
      const cells = node.getDescendants();
      cells.forEach((n: any) => {
        if (collapsed) {
          n.hide();
        } else {
          n.show();
        }
      });
    });
    // backspace
    graph.bindKey('delete', () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.removeCells(cells);
      }
    });
  }
}
