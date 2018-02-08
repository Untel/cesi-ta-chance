<template>
  <v-dialog v-model="modal.open" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Accès sécurisé</v-card-title>
      <v-card-text>
        Veuillez saisir un mot de passe
        <v-text-field
          label="Mot de passe invité"
          hint="8 charachtères minimum"
          v-model="modal.password"
          min="8"
          :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (passwordVisible = !passwordVisible)"
          :type="!passwordVisible ? 'password' : 'text'"
          counter
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click.native="cancel">Annuler</v-btn>
        <v-btn color="primary" flat @click.native="validate">Connection</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
</style>

<script>
  export default {
    name: 'ask-password-modal',
    props: [
      'valid'
    ],
    data() {
      return {
        modal: {
          open: true,
          password: null,
          next: null,
          cancel: null,
        },
        passwordVisible: false,
      };
    },
    methods: {
      validate() {
        this.$emit('update:valid', true)
      },
      cancel() {
        window.history.back();
      }
    },
    computed: {
    },
  };
</script>