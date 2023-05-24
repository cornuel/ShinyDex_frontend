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
            <ErrorMessage class="text-xs text-lavender" name="password" />
            <div class="flex items-center justify-between py-4">
              <button
                class="font-nunito w-fit bg-themeYellow hover:bg-lavender hover:text-slate-50 text-gray-700 shadow-md font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Log In
              </button>
              <a
                class="font-nunito inline-block align-baseline font-bold text-sm text-lavender hover:text-amber-300"
                href="#sign-up"
              >
                Créer un compte
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
    name: "LogIn",

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
        password: "",
      };
    },

    methods: {
      submitForm() {
        const formData = {
          email: this.email,
          password: this.password,
        };

        axios
          .post("https://shinydex.pythonanywhere.com/api/v1/login", formData)
          .then((response) => {
            if (response.data.token == "Invalid email or password") {
              this.$notify(
                {
                  group: "foo",
                  title: "Oups",
                  type: "oups",
                  text: `Mauvais identifiant ou mot de passe`,
                },
                3000
              ); // 2s
            } else {
              // console.log(response)
              // console.log(response.data)
              const token = response.data.token;
              this.userStore.setToken(token);
              this.userStore.setUser(this.email);
              localStorage.setItem("token", token);
              this.$notify(
                {
                  group: "foo",
                  title: "Bravo",
                  type: "bravo",
                  text: `Bienvenue ${this.email} !`,
                },
                3000
              ); // 2s
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + token;
              this.$router.push("/dash-board");
              // console.log(response)
            }
          })
          .catch((error) => {
            if (error.code == "ERR_BAD_REQUEST") {
              this.$notify(
                {
                  group: "foo",
                  title: "Oups",
                  type: "oups",
                  text: `Error`,
                },
                3000
              ); // 2s
            }
          });
      },
      validateEmail(value) {
        // if the field is empty
        if (!value) {
          return "L'adresse email est requis";
        }

        // if the field is not a valid email
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!regex.test(value)) {
          return "Ce champ doit être une adresse email valide";
        }

        // All is good
        return true;
      },
      validatePassword(value) {
        if (!value) {
          return "Le mot de passe est requis";
        }
        return true;
      },
    },
  };
</script>
