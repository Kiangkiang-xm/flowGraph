<template>
  <div class="config">
    <config-grid v-show="type === 'grid'" />
    <!-- <config-node v-show="type === 'node'" :node-attrs="nodeAttrs" @update:nodeAttrs="updateNodeAttrs"/> -->
    <config-node v-show="type === 'node'" />

    <config-edge v-show="type === 'edge'" />
  </div>
</template>

<script lang="ts">
  import ConfigGrid from './ConfigGrid/index.vue';
  import ConfigNode from './ConfigNode/index.vue';
  import ConfigEdge from './ConfigEdge/index.vue';
  import FlowGraph from '../../graph/index';
  import './index.less';
  import { defineComponent, ref, provide } from 'vue';
  import { globalGridAttr } from '../../models/global';

  export default defineComponent({
    name: 'Index',
    components: {
      ConfigGrid,
      ConfigNode,
      ConfigEdge,
    },
    setup() {
      const type = ref('grid');
      const id = ref('');

      // 待优化
      const boundEvent = function (): void {
        const { graph } = FlowGraph;
        graph.on('blank:click', () => {
          type.value = 'grid';
        });

        graph.on('cell:click', ({ cell }) => {
          // console.log('cell：',cell);
          type.value = cell.isNode() ? 'node' : 'edge';
          // console.log('不同节点其对应的属性内容：',cell.getData());

          globalGridAttr.nodeAttrsName = cell.getData().attrsName;
          globalGridAttr.nodeAttrsValue = cell.getData().attrsValue;

          // globalGridAttr.nodeAttrsValue = cell.getData().attrsValue == null ? [] : cell.getData().attrsValue;
          cell?.attr('data/attrsName', cell.getData().attrsName);
          cell?.attr('data/attrsValue', cell.getData().attrsValue == null ? [] : cell.getData().attrsValue);
          // console.log('打印globalGridAttr.nodeAttrsName的值：',globalGridAttr.nodeAttrsName);
          // console.log('打印globalGridAttr.nodeAttrsValue的值：',globalGridAttr.nodeAttrsValue);

          id.value = cell.id;
        });
      };

      boundEvent();
      provide('globalGridAttr', globalGridAttr);
      provide('id', id);

      return {
        type,
        id,
      };
    },
  });
</script>

<style lang="less" scoped></style>
