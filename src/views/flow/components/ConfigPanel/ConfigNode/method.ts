import FlowGraph from "@/views/flow/graph";
import {getHexColor} from "@/views/flow/models/global";

export function nodeOpt(id: any, globalGridAttr: any){
    let curCel: any = null;
    if (id.value) {
        const { graph } = FlowGraph
        const cell = graph.getCellById(id.value)
        if (!cell || !cell.isNode()) {
            return
        }
        curCel = cell
        globalGridAttr.nodeStroke = cell.attr('body/stroke')
        globalGridAttr.nodeStrokeWidth = cell.attr('body/strokeWidth')
        globalGridAttr.nodeFill = getHexColor(cell.attr('body/fill'))
        globalGridAttr.nodeFontSize = cell.attr('text/fontSize')
        globalGridAttr.nodeColor = getHexColor(cell.attr('text/fill'))
        globalGridAttr.nodeUsers = cell.attr('approve/users')

    }
    return curCel;
}
