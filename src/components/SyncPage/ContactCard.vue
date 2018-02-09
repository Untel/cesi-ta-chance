<template>
  <v-flex>
    <v-layout row>
      <v-flex pr-3>
        <v-text-field
          pr-2
          label="Prénom"
          v-model="contact.firstName"
          :append-icon="contact.firstName ? 'content_copy' : ''"
          :append-icon-cb="() => copy(contact.firstName)"
          readonly
        ></v-text-field>
      </v-flex>
      <v-flex>
        <v-text-field
          label="Nom"
          v-model="contact.lastName"
          :append-icon="contact.lastName ? 'content_copy' : ''"
          :append-icon-cb="() => copy(contact.lastName)"
          readonly
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex pr-3 xs8>
        <v-text-field
          label="E-mail"
          v-model="contact.email"
          :append-icon="contact.email ? 'content_copy' : ''"
          :append-icon-cb="() => copy(contact.email)"
          readonly
        ></v-text-field>
      </v-flex>
      <v-flex>
        <v-text-field
          label="Téléphone"
          v-model="contact.phone"
          :append-icon="contact.phone ? 'content_copy' : ''"
          :append-icon-cb="() => copy(contact.phone)"
          readonly
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row align-center>
      <v-flex xs8>
        <v-radio-group label="Sexe"
            prepend-icon="content_copy"
            :prepend-icon-cb="() => copy(contact.gender === 'M' ? 'Homme' : 'Femme')"
            readonly
            v-model="contact.gender" 
            row 
            style="margin-bottom: 26px"
          >
          <v-radio disabled color="primary" label="Féminin" value="F"></v-radio>
          <v-radio disabled color="primary" label="Masculin" value="M"></v-radio>
          <v-radio disabled color="primary" label="Autre" value="A"></v-radio>
        </v-radio-group>
      </v-flex>
      <v-flex xs4>
        <v-text-field
          slot="activator"
          label="Date de naissance"
          v-model="formatedBirthdate"
          :append-icon="formatedBirthdate ? 'content_copy' : ''"
          :append-icon-cb="() => copy(formatedBirthdate)"
          readonly
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs7 mr-3>
        <v-text-field
          label="Adresse"
          v-model="contact.address"
          :append-icon="contact.address ? 'content_copy' : ''"
          :append-icon-cb="() => copy(contact.address)"
          readonly
        ></v-text-field>
      </v-flex>
      <v-flex xs3 mr-3>
        <v-text-field
          label="Ville"
          v-model="contact.city"
          :append-icon="contact.city ? 'content_copy' : ''"
          :append-icon-cb="() => copy(contact.city)"
          readonly
        ></v-text-field>
      </v-flex>
      <v-flex xs2>
        <v-text-field 
          label="Code postal"
          v-model="contact.postalCode"
          :append-icon="contact.postalCode ? 'content_copy' : ''"
          :append-icon-cb="() => copy(contact.postalCode)"
          readonly
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex>
        <v-text-field
          label="Quelle est votre formation actuelle ?"
          v-model="contact.training"
          :append-icon="contact.training ? 'content_copy' : ''"
          :append-icon-cb="() => copy(contact.training)"
          readonly
        ></v-text-field>
      </v-flex>
      <v-flex xs2>
        <v-text-field
          label="Année"
          type="number"
          min="1"
          max="9"
          :suffix="suffix"
          v-model="contact.degree"
          :append-icon="contact.degree ? 'content_copy' : ''"
          :append-icon-cb="() => copy(contact.degree)"
          readonly
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-flex>
      <v-text-field
        label="Dernier établissement fréquenté"
        v-model="contact.lastSchool"
        :append-icon="contact.lastSchool ? 'content_copy' : ''"
        :append-icon-cb="() => copy(contact.lastSchool)"
        readonly
      ></v-text-field>
    </v-flex>

    <v-select
      label="Quelle formation vous intéresse ?"
      v-bind:items="$services.shared.trainings"
      v-model="contact.interestedBy"
      item-text="name"
      item-value="name"
      class="cesi-list"
      :append-icon="contact.interestedBy ? 'content_copy' : ''"
      :append-icon-cb="() => copy(contact.interestedBy.join(', '))"
      readonly
      multiple
      chips
      max-height="auto"
      autocomplete
    >
      <template slot="selection" slot-scope="data">
        <v-chip
          close
          @input="data.parent.selectItem(data.item)"
          :selected="data.selected"
          class="chip--select-multi"
          :key="data.item.code"
        >
          <v-avatar class="primary">{{ data.item.code }}</v-avatar>
          {{ data.item.name }}
        </v-chip>
      </template>
      <template slot="item" slot-scope="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-tile-content v-text="data.item"></v-list-tile-content>
        </template>
        <template v-else>
          <v-list-tile-content>
            <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
          </v-list-tile-content>
        </template>
      </template>
    </v-select>

    <v-layout row>
      <v-flex>
        <v-text-field
          label="Comment avez vous connu le CESI ?"
          v-model="contact.knownCesi"
          multi-line
          :append-icon="contact.knownCesi ? 'content_copy' : ''"
          :append-icon-cb="() => copy(contact.knownCesi)"
          readonly
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout column align-center>
      <v-checkbox
        color="primary"
        label="Êtes-vous en contact avec d'autres écoles ?"
        v-model="contact.hasContactWithOtherSchools"
        readonly
      ></v-checkbox>

      <v-select
          box
          v-if="contact.hasContactWithOtherSchools"
          label="Lesquelles ?"
          chips
          tags
          clearable
          v-model="contact.schoolsContacts"
          :append-icon="contact.schoolsContacts ? 'content_copy' : ''"
          :append-icon-cb="() => copy(contact.schoolsContacts.join(', '))"
          readonly
        >
          <template slot="selection" slot-scope="data">
            <v-chip close @input="data.parent.selectItem(data.item)">
              {{ data.item }}
            </v-chip>
          </template>
      </v-select>
    </v-layout>

    <v-checkbox
      color="primary"
      label="J'autorise le CESI à me contacter afin d'obtenir plus d'informations sur mon projet de formation"
      v-model="contact.allowContact"
      readonly
    ></v-checkbox>

    <textarea id="clipboard"></textarea>
  </v-flex>
</template>

<style scoped>
  #clipboard {
    position: fixed;
    width: 1px;
    height: 1px;
    top: 0;
    left: 0;
    border: none;
    outline: none;
    boxShadow: none;
    background: transparent;
  }
</style>

<script>
  export default {
    name: 'contact-card',
    props: [
      'contact',
    ],
    data() {
      return {};
    },
    methods: {
      copy(text) {
        if (text && text.length > 0) {
          const input = document.getElementById('clipboard');
          input.value = text;
          input.select();
          try {
            const status = document.execCommand('copy');
            if (status) this.$services.snack.notify(`Vous avez copié "${text}"`, 4000);
          } catch (e) {
            console.log('ERR COPY', e)
            this.$services.snack.error('Echec de la copie.', 4000);
          }
        } else {
          this.$services.snack.info('Il n\'y a rien à copier', 4000);
        }
      },
    },
    computed: {
      suffix() {
        if (!this.contact.anneeFormation) return '';
        if (parseInt(this.contact.anneeFormation, 10) === 1) return 'ère';
        return 'ème';
      },
      formatedBirthdate() {
        if (!this.contact.birthdate) {
          return null;
        }
        const [year, month, day] = this.contact.birthdate.split('-');
        return `${day}/${month}/${year}`;
      },
    },
  };
</script>

