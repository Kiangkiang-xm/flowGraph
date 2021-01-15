import {reactive} from "vue";

export const globalGridAttr = reactive({
    type: 'mesh',
    size: 10,
    color: '#e5e5e5',
    thickness: 1,
    colorSecond: '#d0d0d0',
    thicknessSecond: 1,
    factor: 4,
    bgColor: '#e5e5e5',
    showImage: true,
    repeat: 'watermark',
    angle: 30,
    position: 'center',
    bgSize: JSON.stringify({ width: 150, height: 150 }),
    opacity: 0.1,

    stroke:'#5F95FF',
    strokeWidth:1,
    connector:'normal',


    nodeStroke: '#5F95FF',
    nodeStrokeWidth: 1,
    nodeFill: 'rgba(95,149,255,0.05)',
    nodeFontSize: 12,
    nodeColor: 'rgba(0,0,0,0.85)'

})

//转化颜色
export function getHexColor(color: string) {
    const values: any = color
        .replace(/rgba?\(/, '')
        .replace(/\)/, '')
        .replace(/[\s+]/g, '')
        .split(',')
    const a = parseFloat(values[3] || 1),
        r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
        g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
        b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255)
    return '#' +
        ('0' + r.toString(16)).slice(-2) +
        ('0' + g.toString(16)).slice(-2) +
        ('0' + b.toString(16)).slice(-2)
}
