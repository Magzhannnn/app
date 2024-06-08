import Category from "../views/Category.vue";
import Questions from "../views/Questions.vue";
import { createRouter, createWebHistory, useRoute } from "vue-router";
import SignUp from "../views/SignUp.vue";
import SignIn from "../views/SignIn.vue";
import OneQuestion from "@/components/Questions/QuestionWrap/OneQuestion.vue";
import QuestionMain from "@/components/Questions/QuestionWrap/QuestionMain.vue";
import AskPage from "@/views/AskPage.vue";
import AskQuestionForm from "@/components/AskPage/AskQuestionForm.vue";
import SuccesAskQuestion from "@/components/AskPage/SuccesAskQuestion.vue";
import PremiumPage from "@/views/PremiumPage.vue";
import EditQuestion from "@/views/EditQuestion.vue";
import SuccessPage from "@/views/SuccessPage.vue";
import ErrorPage from "@/views/ErrorPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "signUp",
      component: SignUp,
    },
    {
      path: "/sign-in",
      name: "signIn",
      component: SignIn,
    },
    {
      path: "/category",
      name: "category",
      component: Category,
    },
    {
      path: "/ask",
      name: "ask",
      component: AskPage,
      children: [
        {
          path: "",
          name: "questionForm",
          component: AskQuestionForm,
        },
        {
          path: "successfully",
          name: "questionSuccessfull",
          component: SuccesAskQuestion,
        },
      ],
    },
    {
      path: "/edit-question",
      name: "editQuestion",
      component: EditQuestion,
    },
    {
      path: "/questions",
      name: "questions",
      component: Questions,
      children: [
        {
          path: "category/:categoryId",
          name: "questionCategory",
          component: QuestionMain,
        },
        {
          path: "category/:categoryId/:id",
          name: "oneQuestion",
          component: OneQuestion,
        },
      ],
    },
    {
      path: "/premium",
      name: "premium",
      component: PremiumPage,
    },
    {
      path: "/success-payment",
      name: "successPayment",
      component: SuccessPage,
    },
    {
      path: "/error-payment",
      name: "errorPayment",
      component: ErrorPage,
    },
  ],
});

export default router;

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (to.name !== "oneQuestion") {
    localStorage.removeItem("chooseQuestion");
  }

  // Проверяем наличие токенов и исключаем возможные пустые значения
  if (!accessToken || !refreshToken) {
    // Если хотя бы один токен отсутствует, перенаправляем на роут signUp
    if (to.fullPath !== "/") {
      next("/");
    } else {
      next();
    }
  } else {
    // Иначе оставляем на текущем маршруте
    next();
  }
});
