<template lang="pug">
div
  h3 Comments
  el-form
    el-form-item
      el-input(v-model="username" placeholder="Your name")
    el-form-item
      el-input(v-model="comment" placeholder="Your comment")
    el-form-item
      el-button(type="primary" @click="onSubmitHandler") Save
  .comment-item(v-for="c in comments" :key="c.id")
    .comment-item-user {{c.username}}
    .comment-item-comment {{c.comment}}
</template>
<script>
export default {
  props: {
    comments: Array,
    commentHandler: Function
  },
  data: () => {
    return {
      username: "",
      comment: ""
    }
  },
  methods: {
    onSubmitHandler() {
      if(this.username.trim().length > 0 && this.comment.trim().length > 0) {
        this.$emit("commentHandler", {username: this.username, comment: this.comment})
        this.username = "";
        this.comment = "";
      }
    }
  }
}
</script>
<style>
.comment-item{
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  border-left: 4px solid gray;
}

</style>