<template>
  <a-tabs defaultActiveKey="1">
    <!-- 节点 -->
    <a-tab-pane tab="节点" key="1">
      <a-row align="middle">
        <a-col :span="8">边框颜色</a-col>
        <a-col :span="14">
          <a-input type="color" :value="globalGridAttr.nodeStroke" style="width: 100%" @change="onStrokeChange" />
        </a-col>
      </a-row>
      <a-row align="middle">
        <a-col :span="8">边框宽度</a-col>
        <a-col :span="12">
          <a-slider :min="1" :max="5" :step="1" :value="globalGridAttr.nodeStrokeWidth" @change="onStrokeWidthChange" />
        </a-col>
        <a-col :span="2">
          <div class="result">{{ globalGridAttr.nodeStrokeWidth }}</div>
        </a-col>
      </a-row>
      <a-row align="middle">
        <a-col :span="8">填充</a-col>
        <a-col :span="14">
          <a-input type="color" :value="globalGridAttr.nodeFill" style="width: 100%" @change="onFillChange" />
        </a-col>
      </a-row>
    </a-tab-pane>

    <!-- 文本 -->
    <a-tab-pane tab="文本" key="2">
      <a-row align="middle">
        <a-col :span="8">Font Size</a-col>
        <a-col :span="12">
          <a-slider :min="8" :max="16" :step="1" :value="globalGridAttr.nodeFontSize" @change="onFontSizeChange" />
        </a-col>
        <a-col :span="2">
          <div class="result">{{ globalGridAttr.nodeFontSize }}</div>
        </a-col>
      </a-row>
      <a-row align="middle">
        <a-col :span="8">Font Color</a-col>
        <a-col :span="14">
          <a-input type="color" :value="globalGridAttr.nodeColor" style="width: 100%" @change="onColorChange" />
        </a-col>
      </a-row>
    </a-tab-pane>

    <!-- 属性 -->
    <a-tab-pane tab="属性" key="3">
      <a-row align="middle" v-for="(item, index) in globalGridAttr.nodeAttrsName" :key="index">
        <a-col :span="8">{{ item }}</a-col>
        <a-col :span="14">
          <a-input v-model:value="globalGridAttr.nodeAttrsValue[index]" style="width: 100%" />
        </a-col>
      </a-row>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
  import { defineComponent, inject, watch } from 'vue';
  import { Cell } from '@antv/x6';
  import { nodeOpt } from './method';

  export default defineComponent({
    name: 'Index',
    setup() {
      const globalGridAttr: any = inject('globalGridAttr');
      const id: any = inject('id');
      let curCel: Cell;

      watch(
        [() => id.value],
        () => {
          //调用 nodeOpt 函数来更新当前节点的属性
          curCel = nodeOpt(id, globalGridAttr);
          // console.log('看看globalGridAttr的值：',globalGridAttr);
          console.log('nodeAttrsName的值是：', globalGridAttr.nodeAttrsName);
          console.log('nodeAttrsValue的值是：', globalGridAttr.nodeAttrsValue);
        },
        {
          immediate: false,
          deep: false,
        },
      );
      watch(
        () => globalGridAttr.nodeAttrsValue,
        (val) => {
          curCel.setData({
            attrsValue: val,
          });
          console.log(222, curCel.getData().attrsValue);
        },
        {
          deep: true,
        },
      );

      //tab“节点”的边框颜色
      const onStrokeChange = (e: any) => {
        console.log(e);
        console.log(e.target);
        console.log(e.target.value);
        const val = e.target.value;
        globalGridAttr.nodeStroke = val;
        curCel?.attr('body/stroke', val);
      };
      //tab“节点”的边框宽度
      const onStrokeWidthChange = (val: number) => {
        globalGridAttr.nodeStrokeWidth = val;
        curCel?.attr('body/strokeWidth', val);
      };
      //tab“节点”的填充
      const onFillChange = (e: any) => {
        const val = e.target.value;
        globalGridAttr.nodeFill = val;
        curCel?.attr('body/fill', val);
      };

      //tab“文本”Font Size
      const onFontSizeChange = (val: number) => {
        globalGridAttr.nodeFontSize = val;
        curCel?.attr('text/fontSize', val);
      };
      //tab“文本”Font Color
      const onColorChange = (e: any) => {
        const val = e.target.value;
        globalGridAttr.nodeColor = val;
        curCel?.attr('text/fill', val);
      };

      return {
        globalGridAttr,
        onStrokeChange,
        onStrokeWidthChange,
        onFillChange,
        onFontSizeChange,
        onColorChange,
      };
    },
  });
</script>

<style lang="less" scoped></style>
