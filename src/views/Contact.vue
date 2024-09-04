<template>
  <div class="contact">
    <el-alert
      v-if="alert.visible"
      :title="alert.message"
      :type="alert.type"
      :closable="true"
      @close="alert.visible = false"
      style="position: absolute; top: 0; z-index: 9999;"
      show-icon
      center
    />
    <AnimationLoading :isLoading="isAnimationLoding"/>
    <div class="blockContainer">
      <h1>{{ t('i18n.contact.title') }}</h1>
    </div>
    <div class="blockContainer">
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
          <!-- <el-form-item prop="email">
            <div>
              <img src="/images/resume/email.png">
              <el-input
                readonly
                size="large"
                v-model="formData.email"
                :placeholder="t('i18n.contact.email')"
              />
            </div>
          </el-form-item> -->
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
          <el-button type="primary" @click="sendFormData">{{ t('i18n.contact.submit') }}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import emailjs from 'emailjs-com'
  import AnimationLoading from '@/components/AnimationLoading.vue';

  const { t } = useI18n()
  const isAnimationLoding = ref(false)

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
  function validateEmail (rule: any, value: string, callback: any) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return callback(new Error(t('i18n.validation.invalidFormat')))
    }
    callback()
  }

  function sendEmail () {
    const serviceID = 'service_g15ibnp'
    const templateID = 'template_qz695bf'
    const userID = '7fQp4vnmN6wtMC-S2'
    const sendTemplate = {
      from_name: '',
      to_name: '李尹覺',
      message: ''
    }

    sendTemplate.from_name = formData.value.name
    sendTemplate.message = formData.value.message

    emailjs.send(serviceID, templateID, sendTemplate, userID)
      .then((response) => {
        alert.value = {
          visible: true,
          message: t('i18n.contact.sendEmailSuccess'),
          type: 'success',
        }
        console.log('SUCCESS!', response.status, response.text)
      }, (error) => {
        alert.value = {
          visible: true,
          message: `t('i18n.contact.sendEmailError'): ${error.message}`,
          type: 'error',
        }
        console.log('FAILED...', error)
      })
  }

  function sendFormData () {
    formDom.value.validate((valid: boolean) => {
      if (valid) {
        sendEmail()
      } else {
        return false
      }
    })
  }

  onMounted(() => {
    isAnimationLoding.value = true

    setTimeout(() => {
      isAnimationLoding.value = false
    }, 2000)
  })
</script>

<style lang="scss" scoped>
  .contact{
    position: relative;
    width: 100%;
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
</style>
