<template>
  <common-form :visible="importShow" title="导入" @hide-form="hideForm" width="400px">
    <div slot="form-content">
      <el-upload
        ref="upload"
        drag
        :show-file-list="false"
        :limit="1"
        :before-upload="beforeUpload"
        :on-error="uploadError"
        :on-success="uploadSuccess"
        :action="baseUrl + uploadUrl"
        :multiple="false">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击导入</em></div>
        <div class="el-upload__tip">目前只支持Excel导入</div>
      </el-upload>
    </div>
    <div slot="form-footer">
      <el-button @click="importShow = false">关 闭</el-button>
      <el-button type="primary" @click="$emit('templateDown')">下载模板</el-button>
    </div>
  </common-form>
</template>
<script>
import {getBaseUrl} from '@/utils/request'
export default {
  data() {
    return {
      importShow: false,
      baseUrl: getBaseUrl()
    }
  },
  props:{
    uploadUrl: {
      type: String,
      default: null
    }
  },
  methods: {
    // ****************************** 初始化 ****************************** //
    init() {
      console.log('request', getBaseUrl)
      this.importShow = true
      this.$nextTick(() => {
        this.$refs.upload.clearFiles()
      })
    },
    // ****************************** 按钮方法 ****************************** //
    hideForm() { // 关闭弹窗
      Object.assign(this.$data, this.$options.data())
    },
    // ****************************** 数据请求 ****************************** //
    templateDown() { // 模板下载

    },
    // ****************************** 其他方法 ****************************** //
    beforeUpload(file) { // 文件上传拦截
      const type = file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      if (!type) {
        this.$message({
          message: '导入只支持 .xls 或 .xlsx 后缀名文件',
          type: 'warning'
        })
      }
      return type
    },
    uploadError(err, file) { // 文件上传失败
      this.$message.error(`文件 ${file.name} 导入失败，请检查网络后再试`);
    },
    uploadSuccess() {
      his.$message({
        message: '数据导入成功',
        type: 'success'
      })
      this.$emit('success')
      this.importShow = false
    }
  }
}
</script>