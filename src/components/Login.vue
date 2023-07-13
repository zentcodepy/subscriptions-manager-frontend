<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const showLoading = ref(false);
const router = useRouter();

function submit(event: Event){
    event.preventDefault();

    showLoading.value = true;

    const url = '/base-url/sanctum/csrf-cookie';
    axios
        .get(url)
        .then(response => {
            if (response.status == 204) {
                doLogin();
            }
        })
        .catch(error => {
            showLoading.value = false;
            console.log(error);
            alert("Error");
        });
}

function doLogin(){
    const url = '/base-url/api/login';
    axios
        .post(url, {
            email: email.value,
            password: password.value
        })
        .then(response => {
            showLoading.value = false;
            if (response.status == 200) {
                email.value = '';
                password.value = '';
                router.push('/dashboard');
            }
            else {
                alert("Other");//Todo
            }
        })
        .catch(error => {
            showLoading.value = false;
            console.log(error);
            if (error.response.data.message != undefined) {
                alert(error.response.data.message);
            } else {
                alert("Error");
            }
        })
}
</script>

<template>
<div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <h1 v-show="showLoading">Loading...</h1>

    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <!-- <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> -->
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit="submit">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <div class="mt-2">
            <input v-model="email" id="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input v-model="password" id="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button 
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign in
          </button>
        </div>
      </form>
    </div>
</div>
</template>