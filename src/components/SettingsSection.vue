<template>
    <div class="section-background">
    <div class="section-title">
        <font-awesome-icon icon="cogs"/> {{ $t('settings_section.settings') }}
    </div>
    <div class="section-content grid-cols-4 gap-8">
        <div>
            <h5 class="section-heading">{{ $t('settings_section.phpmailer_enabled') }}</h5>
            <h2 v-html="booleanBadge(data.namelessmc.settings.phpmailer)"></h2>
        </div>
        <div>
            <h5 class="section-heading">{{ $t('settings_section.api_enabled') }}</h5>
            <h2 v-html="booleanBadge(data.namelessmc.settings.api_enabled)"></h2>
        </div>
        <div>
            <h5 class="section-heading">{{ $t('settings_section.api_verification_enabled') }}</h5>
            <h2 v-html="booleanBadge(data.namelessmc.settings.api_verification)"></h2>
        </div>
        <div>
            <h5 class="section-heading">{{ $t('settings_section.email_verification_enabled') }}</h5>
            <h2 v-html="booleanBadge(data.namelessmc.settings.email_verification)"></h2>
        </div>

        <div>
            <h5 class="section-heading">{{ $t('settings_section.login_method') }}</h5>
            <h2 class="text-normal">{{ capitalize(data.namelessmc.settings.login_method) }}</h2>
        </div>
        <div>
            <h5 class="section-heading">{{ $t('settings_section.captcha_type') }}</h5>
            <h2 class="text-normal">{{ data.namelessmc.settings.captcha_type }}</h2>
        </div>
        <div>
            <h5 class="section-heading">{{ $t('settings_section.captcha_login_page') }}</h5>
            <h2 v-html="booleanBadge(data.namelessmc.settings.captcha_login)"></h2>
        </div>
        <div>
            <h5 class="section-heading">{{ $t('settings_section.captcha_contact_page') }}</h5>
            <h2 v-html="booleanBadge(data.namelessmc.settings.captcha_contact)"></h2>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: [
        'data',
    ],
}
</script>