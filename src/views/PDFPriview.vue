<template>
  <div style="width:100%;height:100%;">
    <div class="arrow">
      <!-- 上一页 -->
      <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage==1}">上一页</span>
      <span class="turn">{{currentPage}} / {{pageCount}}</span>
      <!-- 下一页 -->
      <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage==pageCount}">下一页</span>
    </div>
    <!-- <pdf
      :src="url"
      :page="currentPage"
      @num-pages="pageCount=$event"
      @page-loaded="currentPage=$event"
      @loaded="loadPdfHandler"
    /> -->
    <Button type="primary" @click="modal9 = true">在ifrime 预览</Button>
    <Modal title="Title" v-model="modal9" class-name="vertical-center-modal">
        <iframe :src="url" name = "iframeMap"
               width="100%" height="100%" id="ifrime"
               frameborder="0" scrolling="no"
      ></iframe>
    </Modal>
   
  </div>
</template>

<script>
import pdf from "vue-pdf";
export default {
  data() {
    return {
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: "pdf", // 文件类型
      url: "http://lc-3resyvee.cn-n1.lcfile.com/85a472a191f63fc52952/test.pdf", // pdf地址
      modal9: false,
    };
  },
  components: {
    pdf,
  },
  methods: {
    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    changePdfPage(val) {
      // console.log(val)
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
        // console.log(this.currentPage)
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
        // console.log(this.currentPage)
      }
    },

    // pdf加载时
    loadPdfHandler() {
      this.currentPage = 1; // 加载的时候先加载第一页
    },
  },
};
</script>

<style lang="scss">
.arrow {
  width: 100%;
  margin: 30px auto;
  .turn {
    width: 100px;
    text-align: center;
    font-size: 20px;
  }
}
.ifrime{
 height: 100%;
    width: 100%;
}
.ivu-modal{
    width: 70vw !important;
    height: 85vh !important;
}
.ivu-modal-content{
    height: 83vh !important;
}
.ivu-modal-body{
    height: 70vh !important;
}
.vertical-center-modal {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
</style>