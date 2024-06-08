<script setup lang="ts">
import FacebookBtn from "@/UI/FacebookBtn.vue";
import GoogleBtn from "@/UI/GoogleBtn.vue";
import { useRouter } from "vue-router";
import {
  signInWithFacebook,
  signInWithGoogle,
} from "../firebased/firebaseConfig";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

if (accessToken && refreshToken) {
  router.push({ name: "category" });
}

const handleGoogleLogin = async () => {
  const data = await signInWithGoogle();

  authStore.onLogin(data);
};

const handleFacebookLogin = async () => {
  const data = await signInWithFacebook();
};
</script>

<template>
  <div class="sinUp bgSignUp">
    <section class="headerSignUp">
      <h1 class="title">Laundromat</h1>
      <div class="content">
        A place where you can get an answer to any question about washing
        machines and laundry
      </div>
    </section>

    <section class="mainSignUp">
      <p class="mainTitle">Sign Up</p>
      <GoogleBtn @click="handleGoogleLogin" />
      <FacebookBtn @click="handleFacebookLogin" />
      <p class="secondTitle">
        By registering, you agree to
        <span class="secondTitleSpan">the privacy policy</span>
      </p>
    </section>

    <section>
      <p class="footerSignUp">
        Already have an account?
        <u @click="router.push({ name: 'signIn' })"><b>Sign in</b></u>
      </p>
    </section>
  </div>
</template>

<style scoped>
.signUp {
  @apply flex flex-col items-center justify-center text-white;
}

.headerSignUp {
  @apply w-[277px] mx-auto flex flex-col items-center pt-[120px] text-white justify-center gap-[18px] mb-[20%];
}

.title {
  @apply text-[30px] font-bold text-center;
}

.content {
  @apply text-sm leading-[16.94px] w-full text-center;
}

.mainSignUp {
  @apply w-max mx-auto flex flex-col gap-5 text-white mb-[40%];
}

.mainTitle {
  @apply font-bold text-sm;
}

.secondTitle {
  @apply text-xs;
}

.secondTitleSpan {
  @apply underline font-bold;
}

.footerSignUp {
  @apply text-sm text-center text-white;
}
</style>
