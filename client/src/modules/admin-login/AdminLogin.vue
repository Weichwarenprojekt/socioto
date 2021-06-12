<template>
    <div>
        <div id="login-side"></div>
        <div class="login-container">
            <!-- The Logo -->
            <img class="login-logo" src="~@/assets/img/logo.svg" alt="Logo" />

            <!-- The actual form -->
            <div class="login-form">
                <hr />
                <span>{{ $t("adminLogin.username") }}</span>
                <input v-model="username" />
                <span>{{ $t("adminLogin.password") }}</span>
                <input v-model="password" />
                <hr />
                <button class="login-confirm">
                    <i class="el-icon-check"></i>
                    {{ $t("adminLogin.confirm") }}
                </button>
            </div>

            <!-- Weichwarenprojekt --->
            <div class="login-powered-by">
                {{ $t("adminLogin.poweredBy") }} <br />
                Weichwarenprojekt
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "AdminLogin",
    data() {
        return {
            // The name typed in by the user
            username: "",
            // The password typed in by the user
            password: "",
        };
    },
});
</script>

<style lang="less" scoped>
@import "~@/styles/vars";

@logo-width: 500px;

@content-width: 350px;

#login-side {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(0deg, @light-grey, @primary);
    clip-path: polygon(0 0, calc(50% - 50vh) 0, calc(50%) 100%, 0 100%);
}

.login-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateX(200px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.login-logo {
    width: @logo-width;
    margin-bottom: 48px;
}

.login-form {
    display: flex;
    width: @content-width;
    flex-direction: column;

    & > span {
        margin-bottom: 16px;
    }

    hr,
    input {
        margin-bottom: 32px;
    }
}

.login-confirm {
    align-self: flex-end;
}

.login-powered-by {
    margin-top: 32px;
    text-align: center;
    font-size: @description;
}

@media only screen and (max-width: 1050px) {
    .login-container {
        transform: translateX(100px);
    }
}

@media only screen and (max-width: 800px) {
    .login-container {
        transform: translateX(0);
    }
    #login-side {
        display: none;
    }
}

@media only screen and (max-width: @logo-width + 2 * @padding) {
    .login-logo {
        margin-right: @padding;
        margin-left: @padding;
        width: calc(100% - 2 * @padding);
    }

    .login-form {
        margin-right: 2 * @padding;
        margin-left: 2 * @padding;
        width: calc(100% - 4 * @padding);
        max-width: @content-width;
    }
}
</style>
