<template>
  <v-dialog v-model="open" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">
        <v-flex justify-space-around>
          <v-icon color="warning">warning</v-icon>
          <span>Accès sécurisé</span>
        </v-flex>
      </v-card-title>
      <v-card-text>
        Veuillez saisir un mot de passe pour pouvoir continuer
        <v-text-field
          label="Mot de passe administrateur"
          v-model="password"
          :error-messages="errors"
          autofocus
          :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (passwordVisible = !passwordVisible)"
          :type="!passwordVisible ? 'password' : 'text'"
          @keyup.enter="validate"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click.native="cancel">Annuler</v-btn>
        <v-btn color="primary" @click.native="validate">Connection</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
</style>

<script>

  import { SHA256 } from 'crypto-js';

  export default {
    name: 'ask-password-modal',
    props: [
      'valid'
    ],
    data() {
      return {
        open: true,
        password: null,
        errors: [],
        passwordVisible: false,
      };
    },
    methods: {
      validate() {
        
        // Nous savons que ce n'est pas propre de vérifier un mot de passe en front
        // En soit, c'est notre seul moyen de pouvoir permettre une navigation OffLine
        // Tout en sécurisant certaines parties de l'application via MDP.
        // De plus, la modal en soit laisse quand même appeler des Data() les composants,

        this.errors = [];
        if (!this.password) return this.errors.push('Veuillez saisir un mot de passe.');

        const compare = (pwd) => {
          if (pwd === this.password) {
            this.$emit('update:valid', true);
          } else {
            this.errors.push('Le mot de passe est invalide')
          }
        }

        if (!this.isOnline || true) {
          this.$utils.findOne({ key: 'adminPassword' }, (err, kvp) => {
            compare(kvp.value);
          });
        }

      },
      cancel() {
        this.$router.push('/');
      }
    },
    computed: {},
  };
</script>