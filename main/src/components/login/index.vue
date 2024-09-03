<template>
  <div class="h-full w-full bg-black">
    <a
      href="#"
      class="login-btn"
      :style="{ color: niceColor, borderColor: niceColor }"
      @click="login"
      @mouseenter="mouseEnterEvent"
      @mouseleave="mouseLeaveEvent"
    >
      login
    </a>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { IAccount } from "./type";
import { useUserStore } from "@/store/module/user";

// import { niceColors } from '@/assets/niceColors'
import router from "@/router";
// import sprite from '@/assets/png/sprite.png'
// import { random } from '@/utils'

const niceColor = ref("#76b900");
const timer = ref();
const userStore = useUserStore();
async function login() {
  // 登录
  try {
    const res = await userStore.loginAction(account);
    // console.log(res)
    if (res) {
      router.push("/home/index");
    }
  } catch {}
}

onMounted(() => {});

const account: IAccount = {
  account: "admin",
  password: "123456",
};
</script>

<style scoped lang="less">
.login-btn {
  font-family: "Montserrat", sans-serif;
  font-size: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 50px;
  line-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0.5);
  border: 3px solid #fff;
  font-weight: bold;
  border-radius: 50px;
}
</style>
