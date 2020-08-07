<template>
  <div id="app">
    <div class="result">{{result}}</div>
    <div class="voice-input-button-wrapper">
      <voice-input-button
        appId="5d7f07d2"
        apiKey="37fa5446a26040d0ead4785876aea1f3"
        apiSecret="53f25dde0a16de39430a23426898ce89"
        v-model="result"
        @record="showResult"
        @record-start="recordStart"
        @record-stop="recordStop"
        @record-blank="recordNoResult"
        @record-failed="recordFailed"
        @record-ready="recordReady"
        @record-complete="recordComplete"
        interactiveMode="touch"
        color="#fff"
        tipPosition="top"
      >
        <template slot="no-speak">没听清您说的什么</template>
      </voice-input-button>
    </div>

    <button @click="voicePrompt('我是最帅的')">点击播放</button>
  </div>
</template>

<script>
import voiceInputButton from 'voice-input-button2'

export default {
  name: 'App',
  components: {
    voiceInputButton
  },
  data () {
    return {
      result: ''
    }
  },
  mounted() {
    this.voicePrompt('我是最帅的');
  },
  methods: {
    recordReady () {
      console.info('按钮就绪!')
    },
    recordStart () {
      console.info('录音开始')
    },
    showResult (text) {
      console.info('收到识别结果：', text)
    },
    recordStop () {
      console.info('录音结束')
    },
    recordNoResult () {
      console.info('没有录到什么，请重试')
    },
    recordComplete (text) {
      console.info('识别完成! 最终结果：', text)
    },
    recordFailed (error) {
      console.info('识别失败，错误栈：', error)
    },
    //语音提醒
    voicePrompt (text){
      new Audio('http://tts.baidu.com/text2audio?cuid=baiduid&lan=zh&ctp=1&pdt=311&tex=' + text).play();
    }
  }
}
</script>

<style>
  *{
    box-sizing: border-box;
  }
  #app {
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 400px;
  }
  .voice-input-button-wrapper{
    width: 42px;
    height: 42px;
    background-color: mediumpurple;
    border-radius: 50%;
  }
  .result{
    width: 100%;
    padding: 25px;
    border: #e2e2e2 1px solid;
    border-radius: 5px;
    line-height: 2;
    font-size: 16px;
    color: #727272;
    min-height: 24px;
    margin-bottom: 25px;
  }
</style>