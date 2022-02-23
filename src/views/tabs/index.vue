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
    </a-tabs>
  </div>
</template>

<script>
import flow from '../flow/index'

export default {
  name: "index",
  components:{
    flow,
  }
}
</script>

<style scoped>

</style>
