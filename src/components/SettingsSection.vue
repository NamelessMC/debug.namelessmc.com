<template>
    <div v-if="loaded" class="rounded-lg bg-gray-100 shadow-lg">
        <div class="p-4 h-full bg-blue-400 mb-2 rounded-t-lg font-bold text-white">
            <font-awesome-icon icon="cogs"/> Settings
        </div>
        <div class="pt-2 pb-8 mb-8 grid grid-cols-4 gap-8 text-center">
            <div>
                <h5 class="text-sm font-bold">PHPMailer enabled</h5>
                <h2 v-html="booleanBadge(data.namelessmc.settings.phpmailer)"></h2>
            </div>
            <div>
                <h5 class="text-sm font-bold">API enabled</h5>
                <h2 v-html="booleanBadge(data.namelessmc.settings.api_enabled)"></h2>
            </div>
            <div>
                <h5 class="text-sm font-bold">API verification</h5>
                <h2 v-html="booleanBadge(data.namelessmc.settings.api_verification)"></h2>
            </div>
            <div>
                <h5 class="text-sm font-bold">Email verification enabled</h5>
                <h2 v-html="booleanBadge(data.namelessmc.settings.email_verification)"></h2>
            </div>

            <div>
                <h5 class="text-sm font-bold">Login method</h5>
                <h2>{{ data.namelessmc.settings.login_method }}</h2>
            </div>
            <div>
                <h5 class="text-sm font-bold">Captcha type</h5>
                <h2>{{ data.namelessmc.settings.captcha_type }}</h2>
            </div>
            <div>
                <h5 class="text-sm font-bold">Captcha on login page</h5>
                <h2 v-html="booleanBadge(data.namelessmc.settings.captcha_login)"></h2>
            </div>
            <div>
                <h5 class="text-sm font-bold">Captcha on contact page</h5>
                <h2 v-html="booleanBadge(data.namelessmc.settings.captcha_contact)"></h2>
            </div>
        </div>
    </div>
</template>

<script>
import functions from '../functions.js';

export default {
    created() {
        this.booleanBadge = functions.booleanBadge;
    },
    props: [
        'loaded',
        'data'
    ],
}
</script>
