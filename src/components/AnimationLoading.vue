<template>
  <el-dialog
    v-model="isAnimationLoading"
    title=""
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    style="width: fit-content; background-color: transparent !important; box-shadow: none !important;
      display: flex; justify-content: center;"
  >
    <img
      v-for="(c, index) in carList"
      :key="index"
      :index="index"
      :src="c.path"
      v-show="index === currentCarIndex"
      style="width: auto; height: 150px;"
    />
    <div class="leftLightContainer">
      <div class="light">
        <div class="beam"></div>
      </div>
    </div>
    <div class="rightLightContainer">
      <div class="light">
        <div class="beam"></div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
  const isAnimationLoading = ref(false)
  const currentCarIndex = ref(0)
  const currentCarImage = ref('')
  const carList = ref([
    {
      path: 'images/car/car1.png',
      leftLight: 'position: absolute; top: 30px; left: -25px;',
      rightLight: 'position: absolute; top: 30px; left: 80px'
    },
    {
      path: 'images/car/car2.png',
      leftLight: 'position: absolute; top: 20px; left: 20px;',
      rightLight: 'position: absolute; top: 20px; right: 20px;'
    },
    {
      path: 'images/car/car3.png',
      leftLight: 'position: absolute; top: 30px; right: 120px;',
      rightLight: 'position: absolute; top: 30px; right: -10px;'
    },
    {
      path: 'images/car/car4.png',
      leftLight: 'position: absolute; top: 30px; left: -20px;',
      rightLight: 'position: absolute; top: 40px; right: 130px;'
    }
  ])

  const props = defineProps({
    isLoading: {
      type: Boolean
    }
  })

  async function setCarImage() {
    await nextTick()
    currentCarIndex.value = Math.floor(Math.random() * 4)
    const leftLight = document.getElementsByClassName('leftLightContainer') as HTMLCollectionOf<HTMLDivElement>
    const rightLight = document.getElementsByClassName('rightLightContainer') as HTMLCollectionOf<HTMLDivElement>
    currentCarImage.value = carList.value[currentCarIndex.value].path
    leftLight[0].style.cssText = carList.value[currentCarIndex.value].leftLight
    rightLight[0].style.cssText = carList.value[currentCarIndex.value].rightLight
  }

  watch(() => props.isLoading, (newValue: boolean) => {
    isAnimationLoading.value = newValue
    if (newValue) {
      setCarImage()
    }
  }, { deep: true })
</script>

<style lang="scss" scoped>
  .light{
    position: relative;
    width: 100px;
    height: 100px;
    background-color: transparent;
    border-radius: 50%;
    overflow: hidden;
  }

  .beam{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%;
    height: 300%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 20%, rgba(255, 255, 255, 0) 60%);
    transform: translate(-50%, -50%);
    animation: expand 1s infinite alternate;
  }

  @keyframes expand{
    0% {
      transform: translate(-50%, -50%) scale(0.4);
      opacity: 0;
    }
    100% {
      transform: translate(-50%, -50%) scale(0.4);
      opacity: 1;
    }
  }
</style>