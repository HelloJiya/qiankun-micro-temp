<template>
  <div class="common-upload">
    <el-upload
      v-if="isHandle"
      :with-credentials="true"
      class="upload-demo"
      accept=".jpg, .png, .jpeg, .gif, .mp3, .wma, .m4a, .mp4, .rmvb, .rm"
      :action="fileUrl"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="beforeUpload"
      :show-file-list="false"
      :data="{'root': 'ims', 'type': '1'}"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传图片(jpg/png/jpeg/gif), 音频(mp3/wma/m4a), 视频(mp4/rmvb/rm)文件，且不超过40MB</div>
    </el-upload>
    <div style="display:flex;flex-wrap: wrap;margin-top: 8px;">
      <div v-for="(item, index) in fileList.image" :key="item" class="file-item" style="height: auto;max-width: 140px;max-height: 80px;">
        <el-image
          style="width:84px;height: 100%;"
          :src="showUrl + item"
          fit="contain"
          :preview-src-list="fileList.image.map(item => {item = showUrl + item; return item})"
          :z-index="99999"
        />
        <i v-if="isHandle" class="el-icon-error remove" @click="removeFile(index, 'image')" />
      </div>
      <div v-for="(item, index) in fileList.video" :key="item" class="file-item">
        <a v-if="item.substring(item.lastIndexOf('.')).toLowerCase().match(/.rmvb|.rm/)" :href="showUrl + item" class="video-img" title="点击下载" />
        <video v-if="item.substring(item.lastIndexOf('.')).toLowerCase().match(/.mp4/)" :src="showUrl + item" controls width="140px" height="80px">您的浏览器不支持 video 标签</video>
        <i v-if="isHandle" class="el-icon-error remove" @click="removeFile(index, 'video')" />
      </div>
      <div v-for="(item, index) in fileList.audio" :key="item" class="file-item">
        <a v-if="item.substring(item.lastIndexOf('.')).toLowerCase().match(/.wma/)" :href="showUrl + item" class="audio-img" title="点击下载" />
        <audio v-if="item.substring(item.lastIndexOf('.')).toLowerCase().match(/.mp3|.m4a/)" :src="showUrl + item" controls style="width:110px;height:100%">您的浏览器不支持 audio 标签</audio>
        <i v-if="isHandle" class="el-icon-error remove" @click="removeFile(index, 'audio')" />
      </div>
    </div>
  </div>
</template>

<script>
import { fileUrl, showFileUrl } from '@/utils/dataurl'
export default {
  name: 'CommonUpload',
  props: {
    // 是否操作
    isHandle: {
      type: Boolean,
      default: false
    },
    // 文件列表
    value: {
      type: Object,
      default: () => {
        return {
          video: [],
          audio: [],
          image: []
        }
      }
    }
  },
  data() {
    return {
      fileUrl: fileUrl,
      showUrl: showFileUrl,
      fileList: {
        image: [],
        video: [],
        audio: []
      }
    }
  },
  computed: {
  },
  watch: {
    value: {
      handler(val) {
        this.fileList = this.$deepClone({ image: [], video: [], audio: [], ...val })
      },
      immediate: true
    }
  },
  created() {
    this.fileList = this.$deepClone({ image: [], video: [], audio: [], ...this.value })
  },
  methods: {
    handleSuccess(response, file, fileList) {
      console.log(this.fileList, 'fileList')
      console.log('Success')
      console.log(response, file, fileList)
      if (response.success) {
        const fileUrl = response.data
        const fileFormat = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
        if (fileFormat.match(/.png|.jpg|.jpeg|.gif/)) {
          this.fileList.image.push(fileUrl)
        }
        if (fileFormat.match(/.mp3|.wma|.m4a/)) {
          this.fileList.audio.push(fileUrl)
        }
        if (fileFormat.match(/.mp4|.rmvb|.rm/)) {
          this.fileList.video.push(fileUrl)
        }
        console.log(this.fileList, 'fileList')
        this.$emit('input', this.fileList)
      } else {
        this.$message.error(response.message.message || 'error')
      }
    },
    handleError(err, file, fileList) {
      console.log('error')
      console.log(err, file, fileList)
    },
    beforeUpload(file) {
      console.log('上传之前')
      console.log(file)
      const fileFormat = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
      const maxSize = 40 * 1024 * 1024
      // 检查文件格式
      if (!fileFormat.match(/.png|.jpg|.jpeg|.gif|.mp3|.wma|.m4a|.mp4|.rmvb|.rm/)) {
        this.$message.error('文件格式不正确')
        return false
      }
      // 检查文件大小
      if (file.size > maxSize) {
        this.$message.error('上传文件过大')
        return false
      }
      // 检查文件数量
      if ((this.fileList.video.length + this.fileList.audio.length + this.fileList.image.length) > 4) {
        this.$message.error('文件最多上传5个')
        return false
      }
      this.$message.info('正在上传，请稍等')
    },
    removeFile(index, type) {
      this.fileList[type].splice(index, 1)
      this.$emit('input', this.fileList)
    }
  }
}
</script>

<style lang="scss" scoped>
.file-item{
  width: auto;
  height: 80px;
  position: relative;
  &+.file-item{
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .remove{
    font-size: 20px;
    position: absolute;
    right: -9px;
    top: -13px;
    display: none;
    cursor: pointer;
  }
  &:hover{
    .remove{
      display: block;
    }
  }
}
.video-img{
  width: 140px;
  height: 80px;
  display: inline-block;
  background: url('~@/assets/images/com-video.png') center center no-repeat;
}
.audio-img{
  width: 80px;
  height: 80px;
  display: inline-block;
  background: url('~@/assets/images/com-audio.png') center center no-repeat;
}
.el-upload__tip{
  margin-top: 0;
  line-height: 30px;
  margin-bottom: 0px;
}
</style>

