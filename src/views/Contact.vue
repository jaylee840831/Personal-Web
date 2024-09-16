<template>
  <div class="contact">
    <el-alert
      v-if="alert.visible"
      :title="alert.message"
      :type="alert.type"
      :closable="true"
      @close="alert.visible = false"
      style="position: fixed; top: 0px; right: 0px; z-index: 9999;"
      show-icon
      center
    />
    <AnimationLoading :isLoading="isAnimationLoding"/>
    <div class="blockContainer">
      <h1>{{ t('i18n.contact.title') }}</h1>
    </div>
    <div class="blockContainer" style="padding-bottom: 30px;">
      <h3>{{ t('i18n.contact.chatTitle') }}</h3>
      <div class="avenue-messenger">
        <div class="agent-face">
          <div class="half">
          <img class="agent circle" src="/images/user.png"></div>
        </div>
        <div class="chat">
          <div class="chat-title">
            <h1>{{ uuid }}</h1>
          </div>
          <div class="messages">
            <div class="messages-content"></div>
          </div>
          <div class="message-box">
            <textarea type="text" class="message-input" :placeholder="t('i18n.contact.typeMessage')">
            </textarea>
            <button type="submit" class="message-submit" @click="insertMessage()">
              {{ t('i18n.contact.send') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="blockContainer">
      <h3>{{ t('i18n.contact.emailTitle') }}</h3>
      <el-form
        ref="formDom"
        class="formContainer"
        :model="formData"
        :rules="rules"
      >
        <div class="formColumnGroup">
          <el-form-item prop="name">
            <div>
              <img src="/images/resume/about_me.png">
              <el-input
                size="large"
                v-model="formData.name"
                :placeholder="t('i18n.contact.name')"
              />
            </div>
          </el-form-item>
          <el-form-item prop="subject">
            <div>
              <img src="/images/resume/edit.png">
              <el-input
                size="large"
                v-model="formData.subject"
                :placeholder="t('i18n.contact.subject')"
              />
            </div>
          </el-form-item>
        </div>
        <div class="formColumnGroup">
          <el-form-item style="height: 100%;" prop="message">
            <el-input
              type="textarea"
              v-model="formData.message"
              style="height: 100%;"
              :placeholder="t('i18n.contact.message')"
            />
          </el-form-item>
        </div>
        <div>
          <!-- empty block -->
        </div>
        <div class="footer">
          <el-button type="primary" @click="submitFormData">
            {{ t('i18n.contact.submit') }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import axios from 'axios'
  import { useI18n } from 'vue-i18n'
  import emailjs from 'emailjs-com'
  import AnimationLoading from '@/components/AnimationLoading.vue'
  import { v4 as uuidv4 } from 'uuid'
  import $ from 'jquery'

  const { t } = useI18n()
  const isAnimationLoding = ref(false)
  const uuid = ref<string | ''>()
  // const messages = ref<string[]>([])
  let ws: WebSocket | null = null

  const alert = ref({
    visible: false,
    message: '',
    type: '',
  })

  const formDom = ref()
  const formData = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const rules = ref({
    name: [
      {
        required: true,
        message: t('i18n.validation.notEmpty'),
        trigger: [ 'blur', 'change' ]
      },
      {
        min: 2,
        max: 45,
        message: t('i18n.validation.stringLengthLimit2To45'),
        trigger: [ 'blur', 'change' ]
      }
    ],
    email: [
      {
        required: true,
        message: t('i18n.validation.notEmpty'),
        trigger: [ 'blur', 'change' ]
      },
      {
        validator: validateEmail,
        trigger: [ 'blur', 'change' ]
      }
    ],
    subject: [
      {
        required: true,
        message: t('i18n.validation.notEmpty'),
        trigger: [ 'blur', 'change' ]
      },
      {
        min: 2,
        max: 45,
        message: t('i18n.validation.stringLengthLimit2To45'),
        trigger: [ 'blur', 'change' ]
      }
    ],
    message: []
  })

  watch(() => alert.value.visible, (newValue: boolean) => {
    if (newValue) {
      setTimeout(() => {
        alert.value = {
          visible: false,
          message: '',
          type: '',
        }
      }, 5000)
    }
  }, { deep: true })

  // email驗證
  function validateEmail (_rule: any, value: string, callback: any) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return callback(new Error(t('i18n.validation.invalidFormat')))
    }
    callback()
  }

  function sendEmail () {
    isAnimationLoding.value = true
    //註冊EmailJS取得以下id
    const serviceID = ''
    const templateID = ''
    const userID = ''
    const sendTemplate = {
      from_name: '',
      to_name: '',
      message: ''
    }

    sendTemplate.from_name = formData.value.name
    sendTemplate.message = formData.value.message

    // send email by EmailJS
    emailjs.send(serviceID, templateID, sendTemplate, userID)
      .then((response) => {
        isAnimationLoding.value = false
        alert.value = {
          visible: true,
          message: t('i18n.contact.sendEmailSuccess'),
          type: 'success',
        }
        console.log('SUCCESS!', response.status, response.text)
      }, (error) => {
        isAnimationLoding.value = false
        alert.value = {
          visible: true,
          message: `t('i18n.contact.sendEmailError'): ${error.message}`,
          type: 'error',
        }
        console.log('FAILED...', error)
      })
  }

  function submitFormData () {
    formDom.value.validate((valid: boolean) => {
      if (valid) {
        sendEmail()
      } else {
        return false
      }
    })
  }

  async function createGroup () {
    try {
      if (localStorage.getItem('uuid')) {
        uuid.value = localStorage.getItem('uuid')!
      }
      else {
        uuid.value = uuidv4()
        localStorage.setItem('uuid', uuid.value)
      }
      await axios.post(`/api/createGroup`, {
        uuid: uuid.value,
        users: []
      })
    } catch (error: any) {
      console.log(error)
      alert.value = {
        visible: true,
        message: `${error.message}`,
        type: 'error',
      }
    }
  }

  async function getMessage () {
    try {
      const response = await axios.get(`/api/history/message?uuid=${uuid.value}`)
      // console.log(response.data)

      if (response.data?.messages) {
        if (response.data?.messages.length > 0) {
          response.data.messages.forEach((element: string) => {
            if (JSON.parse(JSON.stringify(element))?.text) {
              if (JSON.parse(JSON.stringify(element))?.text.includes('[message from web]')) {
                const formateData = JSON.parse(JSON.stringify(element));
                formateData.text = formateData.text.replace(/^\[message from web\]/, '');
                updatePersonalMessage(formateData);
              } else {
                updateOtherMessage(JSON.parse(JSON.stringify(element)));
              }
            }
          });
        }
      }

      isAnimationLoding.value = false
    } catch (err: any) {
      console.log(err)
      isAnimationLoding.value = false
    }
  }

  async function sendMessage(newMessage: {uuid: string; message: string}) {
    await axios.post(`/api/add/message`, newMessage)
    // console.log(response.data)
  }

  async function updatePersonalMessage(newText: { text: string; date: string }) {
    const messagesContent = document.querySelector('.messages-content') as HTMLInputElement
    messagesContent.innerHTML +=
      `<div class="message"
        style="width:fit-content; text-align: right; background: #F0F0F0;
        padding: 10px;
        margin: 20px 10px 20px auto;
        border:1px solid #ccc;
        -webkit-border-radius: 20px 20px 0 20px;
        -moz-border-radius: 20px 20px 0 20px;
        border-radius: 20px 20px 0 20px;">
        ${newText.text}
      </div>`

    $('<div class="timestamp">' + newText.date + '</div>').appendTo($('.message:last'))
    // $('<div class="checkmark-sent-delivered">&check;</div>').appendTo($('.message:last'))
    // $('<div class="checkmark-read">&check;</div>').appendTo($('.message:last'))
  }

  async function updateOtherMessage(newText: { text: string; date: string }) {
    const messagesContent = document.querySelector('.messages-content') as HTMLInputElement
    messagesContent.innerHTML +=
      `<img src="images/user.png" style="width: 80px; height:80px; border-radius: 50%"/>
      <div class="message"
        style="width:fit-content; text-align: left; background: #6eb8ff;
          padding: 10px;
          margin: 20px auto 20px 10px;
          border:1px solid #ccc;
          -webkit-border-radius: 20px 20px 20px 0px;
          -moz-border-radius: 20px 20px 20px 0px;
          border-radius: 20px 20px 20px 0px;">
        ${newText.text}
      </div>`
    $('<div class="timestamp">' + newText.date + '</div>').appendTo($('.message:last'))
    // $('<div class="checkmark-sent-delivered">&check;</div>').appendTo($('.message:last'))
    // $('<div class="checkmark-read">&check;</div>').appendTo($('.message:last'))
  }

  async function insertMessage() {
    const msg = document.querySelector('.message-input') as HTMLInputElement
    if (msg.value.trim() === '') {
      return false
    }

    const fromWebMessage = '[message from web]' + msg.value

    if (localStorage.getItem('uuid')) {
      await updatePersonalMessage({
        text: msg.value,
        date: new Date().toLocaleString(
          'zh-TW', {
            timeZone: 'Asia/Taipei', // 台灣標準時間
            year: 'numeric',
            month: 'long', // 使用 "short" 以顯示月份縮寫，如 "Jan" 或 "Feb"
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            weekday: 'long' // 使用 "short" 以顯示星期幾的縮寫，如 "Mon"
          }
        )
      })
      await sendMessage({
        uuid: localStorage.getItem('uuid') || '',
        message: fromWebMessage
      })
    }

    $('.message-input').val('')
  }

  $(window).on('keydown', function(e) {
    if (e.which == 13) {
      insertMessage()
      return false
    }
  })

  onMounted(async () => {
    isAnimationLoding.value = true
    await createGroup()
    await getMessage()

    ws = new WebSocket('ws://localhost:8086')
    if (ws) {
      console.log('websocket open')
    }
    ws.onmessage = async (event: MessageEvent<string>) => {
      if (event) {
        const data = JSON.parse(event.data)
        if (localStorage.getItem('uuid')) {
          if (localStorage.getItem('uuid') === data.title) {
            data.messages.forEach((element: string) => {
              if (JSON.parse(JSON.stringify(element))?.text) {
                updateOtherMessage(JSON.parse(JSON.stringify(element)));
              }
            });
          }
        }
      }
    }
  })

  onUnmounted(() => {
    if (ws) {
      ws.close()
      console.log('websocket close')
    }
  })
</script>

<style lang="scss" scoped>
  .contact{
    position: relative;
    width: 100%;
    height: calc(100vh - 40px);
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 20px;
    padding-bottom: 50px;

    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-line;
    word-break: break-word;
  }

  .blockContainer{
    width: 90%;
  }

  .blockContainer > h3{
    color: grey;
  }

  .formContainer {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding-top: 30px;

    .formColumnGroup{
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
  
      .el-form-item {
        div{
          width: 100%;
          display: flex;
          flex-direction: row;
        }
      }

      .el-form-item img{
        width: 28px;
        height: 28px;
        margin-right: 8px;
      }
  
      .el-form-item .el-input {
        margin-right: 30px;
      }

      :deep .el-textarea .el-textarea__inner{
        resize: none !important;
      }
    }

    .footer{
      display: flex;
      justify-content: flex-end;
    }
  }


  @media (max-width: 759px) {
    h1{
      font-size: 24px;
    }

    h2{
      font-size: 18px;
    }

    h3{
      font-size: 16px;
    }

    .formContainer {
      grid-template-columns: repeat(1, 1fr);

      .el-form-item .el-input {
        margin-right: 0px;
      }

      :deep .el-textarea .el-textarea__inner{
        resize: none !important;
        height: 150px;
      }
    }
  }

  @mixin center {
    position: relative;
  }

  @mixin ball {
    @include center;
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
  /*  background: rgba(255, 255, 255, .5);*/
    background:#888;
    z-index: 2;
    margin-top: 4px;
    animation: ball .45s cubic-bezier(0, 0, 0.15, 1) alternate infinite;
  }

  /*--------------------
  Body
  --------------------*/
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /*--------------------
  Chat
  --------------------*/
  .chat {
    @include center;
    width: 100%;
    height: calc(100% - 15px);
    max-height: 500px;
    z-index: 10;
    overflow: hidden;
    /*box-shadow: 0 5px 30px rgba(0, 0, 0, .2);*/
    /* background: rgba(0, 0, 0, .5);*/
    background: transparent;
    border-radius: 20px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  /*--------------------
  Chat Title
  --------------------*/
  .chat-title {
    flex: 0 1 45px;
    position: relative;
    z-index: 2;
    width:100%;
    border-bottom:1px solid #ccc;
    color: #777;
    padding-top:50px;
    padding-bottom:5px;
    background-color:#fff;
    text-transform: uppercase;
    text-align: center;

    h1,
    h2 {
      font-weight: normal;
      font-size: 14px;
      margin: 0;
      padding: 0;
  
    }
    h2 {
      /* color: rgba(255, 255, 255, .8);*/
      font-size: 11px;
      letter-spacing: 1px;
    }
    .avatar {
      position: absolute;
      z-index: 1;
      top: 8px;
      left: 9px;
      -webkit-border-radius: 30px;
      -moz-border-radius: 30px;
      border-radius: 30px;
      width: 60px;
      height: 60px;
      overflow: hidden;
      margin: 0;
      padding: 0;
      border: 1px solid #fff;
      img {
        width: 100%;
        height: auto;
      }
    }
  }

  /*--------------------
  Messages
  --------------------*/
  .messages {
    flex: 1 1 auto;
    /*  color: rgba(255, 255, 255, .5);
    color: #fff;*/
    // overflow: hidden;
    position: relative;
    width: 100%;
    min-height: 270px;
    & .messages-content {
      position: absolute;
      top: 0;
      left: 0;
      height: 95%;
      width: 100%;
      background: #fff;
      overflow-y: auto !important;
    }
    .message {
      clear: both;
      float: left;
      padding: 6px 10px 7px;
      -webkit-border-radius: 20px 20px 20px 0;
      -moz-border-radius: 20px 20px 20px 0;
      border-radius: 20px 20px 20px 0; 
      background: #eee; /*rgba(0, 0, 0, 0.1);*/
      margin: 8px 0;
      font-size: 14px;
      line-height: 1.4;
      margin-left: 35px;
      position: relative;
      border:1px solid #ccc;
      /*text-shadow: 0 1px 1px rgba(0, 0, 0, .2);*/
      .timestamp {
        position: absolute;
        bottom: -15px;
        font-size: 10px;
        color: #555;
        right:30px;
        /* color: rgba(255, 255, 255, .7);*/
        
      }
      .checkmark-sent-delivered {
        position: absolute;
        bottom: -15px;
      right: 10px;
        font-size:12px;
        color:#999;
      }
      .checkmark-read {
        color:blue;
        position: absolute;
        bottom: -15px;
      right: 16px;
        font-size:12px;
      }
      &::before {
      /*  content: '';
        position: absolute;
        bottom: -6px;
        border-top: 6px solid rgba(0, 0, 0, 0.1);
        left: 0;
        border-right: 7px solid transparent;*/
      }
      .avatar {
        position: absolute;
        z-index: 1;
        bottom: -15px;
        left: -35px;
        -webkit-border-radius: 30px;
        -moz-border-radius: 30px;
        border-radius: 30px;
        width: 30px;
        height: 30px;
        overflow: hidden;
        margin: 0;
        padding: 0;
        border: 2px solid rgba(255, 255, 255, 0.5);
        img {
          width: 100%;
          height: auto;
        }
      }
      &.message-personal {
        float: right;
        text-align: right;
  /*      background: linear-gradient(120deg, #ddd, #eee);*/
        background:#fff;
        border:1px solid #ccc /*#4A90E2*/;
        -webkit-border-radius: 20px 20px 0 20px;
        -moz-border-radius: 20px 20px 0 20px;
        border-radius: 20px 20px 0 20px;
      
        &::before {
          
        /*
            content:"";
        border-color:#4A90E2 transparent;
          width:0;
          border-style:solid;*/
          /*
          left: auto;
          right: 0;
          border-right: none;
        border-left: 8px solid transparent;
          border-top: 9px solid #fff;
          
          bottom: -8px;*/
        }
        
      }
      &:last-child {
        margin-bottom: 30px;
      }
      &.new {
        transform: scale(0);
        transform-origin: 0 0;
        animation: bounce 500ms linear both;
      }
      &.loading {
        &::before {
          @include ball;
          border: none;
          animation-delay: .15s;
        }
        & span {
          display: block;
          font-size: 0;
          width: 20px;
          height: 10px;
          position: relative;
          &::before {
            @include ball;
            margin-left: -7px;
          }
          &::after {
            @include ball;
            margin-left: 7px;
            animation-delay: .3s;
          }
        }
      }
    }
  }

  /*--------------------
  Message Box
  --------------------*/

  .message-box {
    width: 98% !important;
    flex: 0 1 42px;
    width: 90%;
    background: #fff;
    margin:2px auto;
  /*-webkit-box-shadow: 0px 1px 1px 1px rgba(0,0,0,0.4);
  -moz-box-shadow: 0px 1px 1px 1px rgba(0,0,0,0.4);
  box-shadow: 0px 1px 1px 1px rgba(0,0,0,0.4);*/
    /*background: rgba(0, 0, 0, 0.3);
      border-top:1px solid #e3e3e3;*/
    padding: 10px;
    position: relative;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px; 
    height:14px;
    border:1px solid #ccc;
  
    & .message-input {
      width: 95% !important;
      border: none;
      outline: none!important;
      resize: none; 
      /* color: rgba(255, 255, 255, .8);*/
      font-size: 15px;
      height: 24px;
      margin: 0;
      padding-right: 20px;
      width: 265px;
      color: #444;
    }
    textarea:focus:-webkit-placeholder {
      color: transparent;
    }
    & .message-submit {
      position: absolute;
      z-index: 1;
      top: 9px;
      right: 10px;
      color: #4A90E2;
      border: none;
    /* background: #c29d5f;*/
      background: #fff;
      font-size: 12px;
      text-transform: uppercase;
      line-height: 1;
      padding: 6px 10px;
      border-radius: 5px;
      outline: none!important;
      transition: background .2s ease;
      cursor:pointer;
      &:hover {
        background: #fff;
        color: #333;
      }
    }
  }

  /*--------------------
  Custom Srollbar
  --------------------*/

  .mCSB_scrollTools {
    margin: 1px -3px 1px 0;
    opacity: 0;
  }

  .mCSB_inside > .mCSB_container {
    margin-right: 0px;
    padding: 0 10px;
  }

  .mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar {
    background-color: rgba(0, 0, 0, 0.5)!important;
  }

  /*--------------------
  Bounce
  --------------------*/

  @keyframes bounce {
    0% {
      transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    4.7% {
      transform: matrix3d(0.45, 0, 0, 0, 0, 0.45, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    9.41% {
      transform: matrix3d(0.883, 0, 0, 0, 0, 0.883, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    14.11% {
      transform: matrix3d(1.141, 0, 0, 0, 0, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    18.72% {
      transform: matrix3d(1.212, 0, 0, 0, 0, 1.212, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    24.32% {
      transform: matrix3d(1.151, 0, 0, 0, 0, 1.151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    29.93% {
      transform: matrix3d(1.048, 0, 0, 0, 0, 1.048, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    35.54% {
      transform: matrix3d(0.979, 0, 0, 0, 0, 0.979, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    41.04% {
      transform: matrix3d(0.961, 0, 0, 0, 0, 0.961, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    52.15% {
      transform: matrix3d(0.991, 0, 0, 0, 0, 0.991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    63.26% {
      transform: matrix3d(1.007, 0, 0, 0, 0, 1.007, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    85.49% {
      transform: matrix3d(0.999, 0, 0, 0, 0, 0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    100% {
      transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
  }

  @keyframes ball {
    from {
      transform: translateY(0) scaleY(.8);
    }
    to {
      transform: translateY(-10px);
    }
  }

  .avenue-messenger {
    position: relative;
    opacity: 1;
    min-height: 400px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 1);
    z-index: 10;
    box-shadow: 2px 10px 40px rgba(22,20,19,0.4);
    /*  transform: translateX(300px);*/
    -webkit-transition: 0.3s all ease-out 0.1s, transform 0.2s ease-in;
    -moz-transition: 0.3s all ease-out 0.1s, transform 0.2s ease-in;
  }

  .avenue-messenger div.agent-face {
    position: absolute;
    left: 0;
    top: -70px;
    right: 0;
    margin: auto;
    width: 101px;
    height: 50px;
    background: transparent;
    z-index:12;
  }

  .avenue-messenger div {
      font-size: 14px;
      color:#232323;
  }

  .close {
    display: block;
    width: 100px;
    height: 100px;
    margin: 1em auto;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    -webkit-border-radius: 99em;
    -moz-border-radius: 99em;
    border-radius: 99em; opacity: 0.5;
    /*border: 1px solid #ccc;
    color:#ccc;*/
  /* -webkit-box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow:    0px -1px 2px 0px rgba(0, 0, 0, 0.5);
  box-shadow:         0px -1px 2px 0px rgba(0, 0, 0, 0.5);*/
  }
  .close:hover {/*
  -webkit-box-shadow:  0 1px 1px rgba(0,0,0,0.3);
  -moz-box-shadow:  0 1px 1px rgba(0,0,0,0.3);
  box-shadow: 0 1px 1px rgba(0,0,0,0.3);*/
    opacity:0.9;
  }

  .circle {
    display: block;
    width: 100px;
    height: 100px;
    margin: 1em auto;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    -webkit-border-radius: 99em;
    -moz-border-radius: 99em;
    border-radius: 99em;
    border: 2px solid #fff; /*#4A90E2;*/
  /* -webkit-box-shadow: 0px 0px 10px rgba(0,0,0,.8);
    -moz-box-shadow: 0px 0px 10px rgba(0,0,0,.8);
  box-shadow: 0px 0px 10px rgba(0,0,0,.8);*/

  }

  .contact-icon .circle:hover{
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    transition:0.2s all ease-out 0.2s;
    -webkit-transition:0.2s all ease-out 0.2s;
    -moz-transition:0.2s all ease-out 0.2s;
  }


  .arrow_box:after {
      border-color: rgba(255, 255, 255, 0);
      border-left-color: #fff;
      border-width: 5px;
      margin-top: -5px;
  }
  .arrow_box {
      position: relative;
      background: #fff;
      border: 1px solid #4A90E2;
  }
  .arrow_box:after, .arrow_box:before {
      left: 100%;
      top: 50%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
  }


  .menu div.items {
  /*  height: 140px;
    width: 180px;
    overflow: hidden;
    position: absolute;
    left: -130px;
    z-index: 2;
    top: 20px;*/
  }

  .menu .items span {
      color: #111;
    z-index:12;
      font-size: 14px;
      text-align: center;
      position: absolute;
      right: 0;
    top:40px;
      height: 86px;
      line-height: 40px;
      background: #fff;
      border-left:1px solid #ccc; 
    border-bottom:1px solid #ccc;
    border-right:1px solid #ccc;
      width: 48px;
      opacity: 0;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
      transition: .3s all ease-in-out;
      -webkit-transition: .3s all ease-in-out;
      -moz-transition: .3s all ease-in-out;
  }

  .menu .button {
      font-size: 30px;
      
      z-index:12;
      text-align: right;
      color: #333;
      content: "...";
      display: block;
      width: 48px;
      line-height: 25px;
      height: 40px;
      border-top-right-radius: 20px;
  /*  border-top-left-radius:20px;*/
      position: absolute;
      right: 0;
    padding-right:10px;
    cursor: pointer;
    transition: .3s all ease-in-out;
    -webkit-transition: .3s all ease-in-out;
    -moz-transition: .3s all ease-in-out;
  }
  .menu .button.active {background: #ccc;}
  /*
  .menu .button:hover .menu .items span {
    display: block;
    left: -2px;
    opacity: 1;
  }*/

  .menu .items span.active {
    opacity:1;
    /*border-radius:10px;
    height: 180px;
    width: 400px;
    transform:translateY(0);
    -webkit-transform:translateY(0);
    -moz-transform:translateY(0);*/
  }

  .menu .items a {color:#111; text-decoration:none;}
  .menu .items a:hover{color:#777}

  .mCSB_scrollTools {
    margin: 1px -3px 1px 0;
    opacity: 0;
  }

  .mCSB_inside > .mCSB_container {
    margin-right: 0px;
    padding: 0 10px;
  }

  .mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar {
    background-color: rgba(0, 0, 0, 0.5)!important;
  }
</style>
