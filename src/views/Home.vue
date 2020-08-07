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
    <img alt="Vue logo" src="../assets/logo.png">
    <Button type="primary">Primary</Button>
    <Page :current="1" :total="100"></Page>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>
