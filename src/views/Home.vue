<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-07-22 16:18:46
 * @LastEditors: 王强
 * @LastEditTime: 2020-07-22 17:02:04
--> 
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Button type="primary">Primary</Button>
    <Page :current="1" :total="100"></Page>

    <Button type="primary" @click="goPDF">跳转到预览pdf文件</Button>
    <Button type="primary" @click="handleTx">webview通信</Button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  // mounted () {
  //   const instance = axios.create({
  //     baseURL: 'http://localhost:2345',
  //     timeout: 3000,
  //     headers: {'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InpoYW5nc2FuIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE1OTc3MTUxNTYsImV4cCI6MTU5ODMxOTk1Nn0.I4ojaSnfB7zp2zHeKjpAi6i1c9ctOPqSstwBbZhFmaA'}
  //   });
  //   instance.post('/users/user', {})
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  //   //  instance.post('/users/login', {
  //   //    username:'wq',
  //   //    password:'123456'
  //   //  })
  //   // .then(function (response) {
  //   //   console.log(response);
  //   // })
  //   // .catch(function (error) {
  //   //   console.log(error);
  //   // });
  //    instance.post('/users/test')
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // },
  mounted() {
    //  document.addEventListener('UniAppJSBridgeReady', function() {
    //     uni.postMessage({
    //       data: {
    //         action: 'message'
    //       }
    //     });
    //     uni.getEnv(function(res) {
    //       console.log('当前环境：' + JSON.stringify(res));
    //     });
    // });
  },
  methods: {
    goPDF() {
      this.$router.push("/pdf");
    },
    handleTx() {
      uni.postMessage({
        data: {
          action: "你好呀，我是H5的内容！",
          type: 'back'
        }
      });
    }

  }
};
</script>
