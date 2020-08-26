<template>
  <div class="up-box">
    <p class="up-txt">Node + H5 实现大文件分片上传、断点续传</p>
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div class="wrap btn btn-default">
            <input type="file" id="file" @change="fileChange" />
          </div>
        </div>
      </div>
      <div class="row" id="process1" :style="{display: dis1}">
        <div class="col-md-4">校验文件进度</div>
        <div class="col-md-8">
          <div class="progress">
            <div id="checkProcessStyle" class="progress-bar" :style="{width:w1}"></div>
            <p id="checkProcessValue" class="value">{{percent1}}%</p>
          </div>
        </div>
      </div>
      <div class="row" id="process2" :style="{display: dis2}">
        <div class="col-md-4">上传文件进度</div>
        <div class="col-md-8">
          <div class="progress">
            <div id="uploadProcessStyle" class="progress-bar" :style="{width:w2}"></div>
            <p id="uploadProcessValue" class="value">{{percent2}}%</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let baseUrl = "http://localhost:5000";
let chunkSize = 5 * 1024 * 1024;
let fileSize = 0;
let file = null;
let hasUploaded = 0;
let chunks = 0;
import SparkMD5 from "../lib/spark-md5.min.js";
import axios from "axios";
export default {
  data() {
    return {
      percent1: 0,
      percent2: 0,
      dis1: false,
      dis2: false,
      w1: 0,
      w2: 0,
    };
  },
  methods: {
    // file 原生事件
    fileChange(e) {
      let file = e.target.files[0];
      fileSize = file.size;
      // console.log('文件信息',file)
      this.responseChange(file);
    },
    // 0.响应点击
    async responseChange(file) {
      // 第一步：按照 修改时间+文件名称+最后修改时间-->MD5
      // 显示文件校验进度
      this.dsi1 = true;
      // 开始校验
      let fileMd5Value = await this.md5File(file);
      // 第二步：校验文件的MD5
      let result = await checkFileMD5(file.name, fileMd5Value);
      // // 如果文件已存在, 就秒传
      // if (result.file) {
      //     alert('文件已秒传')
      //     return
      // }
      // // 显示文件上传进度
      //  this.dsi2 = true
      // // 第三步：检查并上传MD5
      // await checkAndUploadChunk(fileMd5Value, result.chunkList)
      // // 第四步: 通知服务器所有分片已上传完成
      // notifyServer(fileMd5Value)
    },
    // 1.修改时间+文件名称+最后修改时间-->MD5
    md5File(file) {
      let that = this;
      return new Promise((resolve, reject) => {
        var blobSlice =
            File.prototype.slice ||
            File.prototype.mozSlice ||
            File.prototype.webkitSlice,
          //chunkSize = 2097152, // Read in chunks of 2MB
          chunkSize = file.size / 100,
          //chunks = Math.ceil(file.size / chunkSize),
          chunks = 100,
          currentChunk = 0,
          spark = new SparkMD5.ArrayBuffer(),
          fileReader = new FileReader();

        fileReader.onload = function (e) {
          console.log("read chunk nr", currentChunk + 1, "of", chunks);
          spark.append(e.target.result); // Append array buffer
          currentChunk++;

          if (currentChunk < chunks) {
            loadNext();
          } else {
            let cur = +new Date();
            console.log("finished loading");
            // alert(spark.end() + '---' + (cur - pre)); // Compute hash
            let result = spark.end();
            resolve(result);
          }
        };

        fileReader.onerror = function () {
          console.warn("oops, something went wrong.");
        };

        function loadNext() {
          var start = currentChunk * chunkSize,
            end =
              start + chunkSize >= file.size ? file.size : start + chunkSize;

          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
          that.w1 = currentChunk + 1 + "%";
          that.percent1 = currentChunk + 1;
          that.w2 = currentChunk + 1 + "%";
          that.percent2 = currentChunk + 1;
        }

        loadNext();
      });
    },
    // 2.校验文件的MD5
    checkFileMD5(fileName, fileMd5Value) {
      return new Promise((resolve, reject) => {
        let url =
          baseUrl +
          "/check/file?fileName=" +
          fileName +
          "&fileMd5Value=" +
          fileMd5Value;
        axios
          .post(url)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    },
    // 3.上传chunk
    async checkAndUploadChunk(fileMd5Value, chunkList) {
      chunks = Math.ceil(fileSize / chunkSize);
      hasUploaded = chunkList.length;
      for (let i = 0; i < chunks; i++) {
        let exit = chunkList.indexOf(i + "") > -1;
        // 如果已经存在, 则不用再上传当前块
        if (!exit) {
          let index = await upload(i, fileMd5Value, chunks);
          hasUploaded++;
          let radio = Math.floor((hasUploaded / chunks) * 100);
          $("#uploadProcessStyle").css({
            width: radio + "%",
          });
          $("#uploadProcessValue").html(radio + "%");
        }
      }
    },

    // 3-2. 上传chunk
    upload(i, fileMd5Value, chunks) {
      return new Promise((resolve, reject) => {
        //构造一个表单，FormData是HTML5新增的
        let end =
          (i + 1) * chunkSize >= file.size ? file.size : (i + 1) * chunkSize;
        let form = new FormData();
        form.append("data", file.slice(i * chunkSize, end)); //file对象的slice方法用于切出文件的一部分
        form.append("total", chunks); //总片数
        form.append("index", i); //当前是第几片
        form.append("fileMd5Value", fileMd5Value);
        $.ajax({
          url: baseUrl + "/upload",
          type: "POST",
          data: form, //刚刚构建的form数据对象
          async: true, //异步
          processData: false, //很重要，告诉jquery不要对form进行处理
          contentType: false, //很重要，指定为false才能形成正确的Content-Type
          success: function (data) {
            resolve(data.desc);
          },
        });
      });
    },

    // 第四步: 通知服务器所有分片已上传完成
    notifyServer(fileMd5Value) {
      let url =
        baseUrl +
        "/merge?md5=" +
        fileMd5Value +
        "&fileName=" +
        file.name +
        "&size=" +
        file.size;
      $.getJSON(url, function (data) {
        alert("上传成功");
      });
    },

    getDate() {
      let d = new Date();
      return d.getMinutes() + ":" + d.getSeconds() + " " + d.getMilliseconds();
    },
  },
};
</script>

<style lang="scss" scoped>
.up-box {
  height: 100vh;
  width: 100vw;
  .up-txt {
    font-size: 16px;
    font-weight: bold;
    color: orangered;
    margin: 20px;
  }
}
</style>>
