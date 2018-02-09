<template>
  <v-layout v-if="canNavigate" row wrap justify-center id="wrapper">
    <div style="width: 80%">
      <v-expansion-panel popout>
        <v-expansion-panel-content>
          <div slot="header">Lieu de contact</div>
          <v-card>
            <v-card-text>
              <v-text-field 
                label="Lieu de contact actuel"
                autocomplete="off"
                v-model="actualPlace"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click.native="save('actualPlace')">Sauvegarder</v-btn>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <div slot="header">Mots de passe</div>
          <v-card>
            <v-card-text>
              <v-text-field
                label="Mot de passe administrateur"
                hint="8 charachtères minimum"
                v-model="adminPassword"
                min="8"
                :append-icon="pwdVisible ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (pwdVisible = !pwdVisible)"
                :type="!pwdVisible ? 'password' : 'text'"
                autocomplete="off"
                counter
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click.native="save('adminPassword')">Sauvegarder</v-btn>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <div slot="header">Liste des formations</div>
          <v-card>
            <v-card-text>
              Coming soon..
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" :disabled="true">Sauvegarder</v-btn>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>
  </v-layout>
  <ask-password-modal v-else :valid.sync="canNavigate"></ask-password-modal>

</template>

<style lang="scss">
</style>

<script>
  import AskPasswordModal from './AskPasswordModal';

  export default {
    components: { AskPasswordModal },
    data() {
      return {
        canNavigate: false,
        pwdVisible: false,

        adminPassword: null,
        actualPlace: null,
      };
    },

    created() {
      this.$utils.findOne({ key: 'adminPassword' }, (err, row) => {
        console.log('PASSWORD', row.value);
        if (!err && row) this.adminPassword = row.value;
      });
      this.$utils.findOne({ key: 'actualPlace' }, (err, row) => {
        console.log('CONTACT PLACE', row);
        if (!err && row) this.actualPlace = row.value;
      });
    },

    methods: {
      save(key) {
        this.$utils.update({ key }, { key, value: this[key] }, { upsert: true });
        this.$services.snack.success('Paramêtre enregistré.');
      },
    },
    computed: {
    },
  };
</script>