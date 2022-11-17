<template lang="pug">
div
  el-button.button-save(type="primary" @click="onSubmitHandler") Save 
  h3 Comments
  el-form
    el-form-item
      el-input(v-model="comment.username" placeholder="Your name")
    el-form-item
      el-input(v-model="comment.message" placeholder="Your comment")
  .comment-item(v-for="c in comments" :key="c.id")
    .comment-item-user {{c.username}}:
    .comment-item-comment {{c.comment}}
</template>
<script setup>
import { reactive, computed, defineEmits, defineProps } from "vue";
const emit = defineEmits(["commentHandler"])
const props = defineProps({
  comments: Array,
  commentHandler: Function,
})
const comment = reactive({
  username: "",
  message: "",
  isValid: computed(() => {
    return (
      comment.username.trim().length > 0 && comment.message.trim().length > 0
    );
  }),
});
const onSubmitHandler = () => {
  if (comment.isValid) {
    emit("commentHandler", {
      username: comment.username,
      comment: comment.message,
    });
    comment.username = "";
    comment.message = "";
  }
};
</script>
<style>
.comment-item {
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  border-left: 4px solid gray;
}
.button-save {
  float: right;
}
</style>
