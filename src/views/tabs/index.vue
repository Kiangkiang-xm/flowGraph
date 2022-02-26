<template>
  <div>
    <a-tabs
        style="margin-top:0"
        default-active-key="flow"
        tab-position="top"
        :destroy-inactive-tab-pane="true"
        size="small">

      <a-tab-pane key="flow" tab="流程图" >
        <flow/>
      </a-tab-pane>

      <a-tab-pane key="quickStart01" tab="快速上手01" >
        <quick-start01/>
      </a-tab-pane>
      <a-tab-pane key="quickStart02" tab="快速上手02" >
        <quick-start02/>
      </a-tab-pane>
      <a-tab-pane key="quickStart03" tab="快速上手03" >
        <quick-start03/>
      </a-tab-pane>

    </a-tabs>
  </div>
</template>

<script>
import flow from '../flow'
import quickStart01 from '../quickStart/index01'
import quickStart02 from '../quickStart/index02'
import quickStart03 from '../quickStart/index03'

export default {
  name: "index",
  components:{
    flow,
    quickStart01,
    quickStart02,
    quickStart03
  }
}
</script>

<style scoped>

</style>
