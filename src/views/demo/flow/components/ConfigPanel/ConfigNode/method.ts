import FlowGraph from '../../../graph/index';

export function nodeOpt(id: any, globalGridAttr: any) {
  let curCel: any = null;
  if (id.value) {
    const { graph } = FlowGraph;
    //使用 FlowGraph 中的 graph 对象通过 getCellById(id.value) 方法查找对应 ID 的节点（Cell）
    const cell = graph.getCellById(id.value);
    //如果没有找到节点或找到的对象不是节点（!cell || !cell.isNode()），函数将提前返回，不执行任何操作
    if (!cell || !cell.isNode()) {
      return;
    }
    curCel = cell;
    globalGridAttr.nodeStroke = cell.attr('body/stroke');
    globalGridAttr.nodeStrokeWidth = cell.attr('body/strokeWidth');
    globalGridAttr.nodeFill = cell.attr('body/fill');
    globalGridAttr.nodeFontSize = cell.attr('text/fontSize');
    globalGridAttr.nodeColor = cell.attr('text/fill');
    globalGridAttr.nodeUsers = cell.attr('approve/users');
    globalGridAttr.nodeAttrsName = cell.attr('data/attrsName');
    globalGridAttr.nodeAttrsValue = cell.attr('data/attrsValue');
  }
  return curCel;
}
