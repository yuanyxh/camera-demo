/*
 * @Author: yuanyxh 15766118362@139.com
 * @Date: 2023-02-26 12:33:29
 * @LastEditors: yuanyxh 15766118362@139.com
 * @LastEditTime: 2023-02-26 15:51:47
 * @FilePath: \h5\src\camera\index.ts
 * @Description: 利用浏览器 api 调用系统摄像头摄像，并进行绘制
 */

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
 * @description: 获取媒体信息
 * @param {{ constraints: MediaStreamConstraints, success: success, fail: fail }}
 * @returns {Promise<MediaStream>}
 * FIXME: 类型待修复
 */
export function getMedia({ constraints, success, fail }) {
  // 兼容处理
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }
  if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function (params) {
      const getUserMedia =
        navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
      if (!getUserMedia) {
        return Promise.reject(
          new Error("getUserMedia is not implemented in this browser")
        );
      }

      return new Promise(function (resolve, reject) {
        getUserMedia.call(navigator, params, resolve, reject);
      });
    };
  }

  // 获取 media object
  return navigator.mediaDevices
    .getUserMedia(constraints)
    .then(success)
    .catch(fail);
}
