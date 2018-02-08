<template>
  <v-layout row wrap justify-center id="wrapper">
    <div style="width: 80%">
      <v-expansion-panel popout>
        <v-expansion-panel-content>
          <div slot="header">Salon</div>
          <v-card>
            <v-card-text>
              <v-text-field 
                label="Lieu de contact actuel"
                v-model="$services.contact.contactPlace"
              ></v-text-field>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <div slot="header">Mots de passe</div>
          <v-card>
            <v-card-text>
              <v-text-field
                label="Mot de passe administrateur"
                hint="8 charachtères minimum"
                v-model="$services.shared.pwdAdmin"
                min="8"
                :append-icon="pwdAnonymousVisible ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (pwdAnonymousVisible = !pwdAnonymousVisible)"
                :type="!pwdAnonymousVisible ? 'password' : 'text'"
                counter
              ></v-text-field>

              <v-text-field
                label="Mot de passe invité"
                hint="8 charachtères minimum"
                v-model="$services.shared.pwdAnonymous"
                min="8"
                :append-icon="pwdAnonymousVisible ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (pwdAnonymousVisible = !pwdAnonymousVisible)"
                :type="!pwdAnonymousVisible ? 'password' : 'text'"
                counter
              ></v-text-field>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>

  </v-layout>
</template>

<style lang="scss">
</style>

<script>
  export default {
    data() {
      return {
        pwdAnonymousVisible: false,
      };
    },
    methods: {
    },
    computed: {
    },
  };
</script>