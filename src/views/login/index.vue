<template>
  <div class="login-container">
    <div class="content">
      <a-card title="欢迎登陆CX工作流设计器" style="width: 100%;height: 100%">
        <a-form  :model="loginForm" @submit="handleSubmit"><!--@submit.native.prevent-->
          <a-form-item>
            <a-input v-model:value="loginForm.username" placeholder="Username" style="width: 350px" >
              <template #prefix><UserOutlined style="color:rgba(0,0,0,.25)"/></template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input v-model:value="loginForm.password" type="password" placeholder="Password" style="width: 350px">
              <template #prefix><LockOutlined style="color:rgba(0,0,0,.25)"/></template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" :disabled="loginForm.username === '' || loginForm.password === ''" style="width: 350px">
              登陆
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts">
import '../../reset.less'
import '../../global.css'
import {defineComponent, reactive} from "vue";
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: "index",
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup(){
    const loginForm = reactive({
      username: '',
      password:''
    })

    const handleSubmit  = (e: Event)=> {
      console.log(e)
      console.log(loginForm);
    }
    return{
      loginForm,
      handleSubmit
    }
  }
})
</script>

<style lang="less" scoped>
/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/cool-background.png");
  .content {
    position: absolute;
    width:400px;
    height:300px;
    left:50%;
    top:50%;
    margin-left:-200px;
    margin-top:-150px;

    border-radius: 10px;
    background: #f6efef;
    box-shadow:  5px 5px 10px #626060,
      -2px -2px 2px #de18ff;
  }
}


</style>
