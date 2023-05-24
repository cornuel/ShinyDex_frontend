<template>
  <body class="w-full">
    <div>
      <div v-if="this.userStore.dark" class="z-30">
        <img
          src="@/assets/pokeball_bg_2_dark.svg"
          alt="pokeball"
          class="fixed h-screen w-full bg-darkPurple"
        />
      </div>
      <div v-else class="z-30">
        <img
          src="@/assets/pokeball_bg_2.svg"
          alt="pokeball"
          class="fixed h-screen w-screen"
        />
      </div>
    </div>
    <div class="z-20 log-in h-full">
      <div class="flex justify-center items-center mt-52">
        <div class="w-full max-w-xs text-left z-40">
          <Form
            class="bg-white dark:bg-lightIndigo/70 dark:shadow-darkPurple dark:shadow-sm dark:border-themeYellow/80 dark:border-2 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
            @submit="submitForm"
          >
            <a
              href="https://cornuel.github.io/ShinyDex"
              class="flex items-center justify-center mb-4 sm:mb-0"
            >
              <img
                src="@/assets/pokeball_bg.svg"
                class="h-8 mr-3"
                alt="Flowbite Logo"
              />
              <span
                class="font-nunito self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
                >ShinyDex</span
              >
            </a>
            <div class="identity-input mb-4">
              <label
                class="font-nunito block text-gray-700 dark:text-white text-sm font-bold mb-2"
              >
                Email
              </label>
              <Field
                class="shadow appearance-none rounded-md w-full py-2 px-3 dark:bg-white bg-slate-50 dark:focus:bg-white focus:bg-slate-100 text-gray-700 mb-3 leading-tight focus:outline-1 focus:outline-purple-400 focus:shadow-outline"
                type="email"
                name="email"
                v-model="email"
                :rules="validateEmail"
              />
              <ErrorMessage class="text-xs text-lavender" name="email" />
            </div>
            <label
              class="font-nunito block text-gray-700 dark:text-white text-sm font-bold mb-2"
            >
              Mot de passe
            </label>
            <Field
              class="shadow appearance-none rounded-md w-full py-2 px-3 dark:bg-white bg-slate-50 dark:focus:bg-white focus:bg-slate-100 text-gray-700 mb-3 leading-tight focus:outline-1 focus:outline-purple-400 focus:shadow-outline"
              type="password"
              name="password"
              v-model="password"
              :rules="validatePassword"
            />
            <label
              class="font-nunito block text-gray-700 dark:text-white text-sm font-bold mb-2"
            >
              Confirmer le mot de passe
            </label>
            <Field
              class="shadow appearance-none rounded-md w-full py-2 px-3 dark:bg-white bg-slate-50 dark:focus:bg-white focus:bg-slate-100 text-gray-700 mb-3 leading-tight focus:outline-1 focus:outline-purple-400 focus:shadow-outline"
              type="password"
              name="confirmPassword"
              v-model="confirmPassword"
              :rules="validatePassword"
            />
            <ErrorMessage class="text-xs text-lavender" name="password" />
            <div class="flex items-center justify-between py-4">
              <button
                class="font-nunito w-fit bg-themeYellow hover:bg-lavender hover:text-slate-50 text-gray-700 shadow-md font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
              <a
                class="font-nunito inline-block px-2 align-baseline font-bold text-sm text-lavender hover:text-amber-300"
                href="#log-in"
              >
                J'ai déjà un compte
              </a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
  import axios from "axios";
  import { useUserStore } from "@/store/user";
  import { Form, Field, ErrorMessage } from "vee-validate";

  export default {
    name: "SignUp",

    components: {
      Form,
      Field,
      ErrorMessage,
    },

    setup() {
      const userStore = useUserStore();
      return {
        userStore,
      };
    },

    data() {
      return {
        email: "",
        // username: '',
        password: "",
        confirmPassword: "",
      };
    },
    methods: {
      async submitForm() {
        if (this.password !== this.confirmPassword) {
          // If the passwords don't match, show an error message
          this.$notify(
            {
              group: "foo",
              title: "Oups",
              type: "oups",
              text: `Les mots de passe ne correspondent pas`,
            },
            3000
          ); // 2s
          return;
        }

        const formData = {
          email: this.email,
          // username: this.username,
          password: this.password,
        };

        axios
          .post("https://shinydex.pythonanywhere.com/api/v1/signup", formData)
          .then((response) => {
            console.log(response.data);
            if (response.data.Error == "User already exists") {
              console.log("User already exists");
              this.$notify(
                {
                  group: "foo",
                  title: "Oups",
                  type: "oups",
                  text: `L'utilisateur est déjà inscrit !`,
                },
                3000
              ); // 2s
            } else {
              this.$notify(
                {
                  group: "foo",
                  title: "Bravo",
                  type: "bravo",
                  text: `Le compte a été créé avec succès !`,
                },
                3000
              ); // 2s
              this.$router.push("/log-in");
            }
          })
          .catch(() => {
            // console.log(error)
          });
      },
      validateEmail(value) {
        // if the field is empty
        if (!value) {
          return "L'email est requis";
        }

        // if the field is not a valid email
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!regex.test(value)) {
          return "Ce champ doit contenir une adresse email valide";
        }

        // All is good
        return true;
      },
      validateUsername(value) {
        if (!value) {
          return "Username is required";
        }
        return true;
      },
      validatePassword(value) {
        if (!value) {
          return "Le mot de passe est requis";
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          return "Le mot de passe doit contenir au moins un caractère special";
        }
        if (!/\d/.test(value)) {
          return "Le mot de passe doit contenir au moins un chiffre";
        }

        if (value.length < 8) {
          return "Le mot de passe doit contenir au moins 8 caractères";
        }
        return true;
      },
    },
  };
</script>
