<!--
 * @Author: yuanyxh 15766118362@139.com
 * @Date: 2023-02-26 15:24:56
 * @LastEditors: yuanyxh 15766118362@139.com
 * @LastEditTime: 2023-02-26 17:23:39
 * @FilePath: \h5-demo\src\components\Camera.vue
 * @Description: 摄像模板
-->
<template>
  <div className="camera-draw">
    <div className="video-container">
      <video ref="video" width="400" height="500" autoPlay></video>
    </div>

    <el-button :type="isCamera ? 'danger' : 'primary'" @click="camera">{{
      isCamera ? "停止捕捉" : "开始捕捉人像"
    }}</el-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from 'element-plus';
import { getMedia } from "@/camera";
const video = ref(null),
  isCamera = ref(false);
/** @type {MediaStream} */
let media_object = null;

/**
 * @callback success
 * @param {MediaStream} value
 * @returns {void | MediaStream}
 */

/**
 * @callback fail
 * @param {any} reason
 * @returns {void | MediaStream}
 */

/**
 *
 * @param {success} success
 * @param {fail} fail
 */
function requestMedia(success, fail) {
  getMedia({
    constraints: {
      audio: false,
      video: {
        width: 400,
        height: 500,
      },
    },
    success,
    fail,
  });
}
function success(stream) {
  media_object = stream;
  if ("srcObject" in video.value) {
    video.value.srcObject = stream;
  } else {
    video.value.src = URL.createObjectURL(stream);
  }

  video.value.onloadedmetadata = () => {
    if (stream.active) {
      return video.value.play();
    }
    requestMedia(success, fail);
  };
  video.value.onerror = () => {
    ElMessage.error('播放出现异常，请稍后重试。');
  };
}

function fail() {
  ElMessage.error('无法调用系统摄像头！请检查是否开启摄像权限。')
}

function camera() {
  if (isCamera.value) {
    const tracks = media_object.getTracks();
    tracks.forEach((item) => item.stop());
    return (isCamera.value = !isCamera.value);
  }

  isCamera.value = !isCamera.value;

  requestMedia(success, fail);
}
</script>

<style scoped lang="scss">
.camera-draw {
  width: 80%;
  margin: 50px auto;
  height: calc(100vh - 100px);

  .video-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    video {
      transform: rotateY(180deg);
      -webkit-transform: rotateY(180deg);
      -moz-transform: rotateY(180deg);
    }
  }
}
</style>
