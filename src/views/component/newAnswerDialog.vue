<template>
  <div>
    <el-dialog
      title="新建回答"
      :visible.sync="createAnswerDialogVisiable"
      style="width: 1300px; margin: 0 auto"
    >
      <el-form
        :model="newAnswerForm"
        :rules="newAnswerRules"
        ref="newAnswerForm"
      >
        <el-form-item label-width="0px" prop="content">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 10 }"
            v-model="newAnswerForm.content"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="createNewQuestion">发 布</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "NewAnswerDialog",
  props: ["createAnswerDialogVisiable", "qid", "quid"],
  data() {
    return {
      newAnswerForm: {
        content: "",
      },
      // 新建问题表单校验规则
      newAnswerRules: {
        content: [
          { required: true, message: "请填写回答内容", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  computed: {
    uid: {
      get() {
        return this.$store.state.user.userId;
      },
    },
  },
  methods: {
    // 改变父组件的传入的参数
    closeDialog() {
      this.$parent.dialogVisiable = false;
    },
    // 发布新的回答
    createNewQuestion() {
      this.$refs["newAnswerForm"].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl("http://zhizhi.com/blog/answer/save"),
            method: "post",
            data: this.$http.adornData(
              {
                qid: this.qid,
                quid: this.quid,
                content: this.newAnswerForm.content,
                uid: this.uid,
              },
              false,
              "json"
            ),
          }).then(({ data }) => {
            if (data && data.code === 200) {
              // 成功弹窗提醒
              this.$message({ message: "回答发布成功", type: "success" });
              // 关闭表单对话框
              this.$parent.dialogVisiable = false;
              // 清空表单内容
              this.newAnswerForm.content = "";
              // 刷新页面
              this.$router.go(0);
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>