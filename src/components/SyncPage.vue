<template>
  <v-layout v-if="canNavigate" row wrap justify-center id="wrapper">
    <v-flex class="mt-3">
      <v-alert
        color="primary"
        icon="check_circle"
        outlined
        :value="unsyncCount > 0"
        transition="scale-transition"
      >
        <v-layout row align-center align-content-space-between>
          <v-flex>
            Vous avez {{ unsyncCount }} candidats non synchronisé.
          </v-flex>
          <v-btn @click.native="sync" :loading="submitting" :disabled="!isOnline">Synchroniser</v-btn>
        </v-layout>
      </v-alert>
      <!-- <v-btn @click="sync" color="primary" :loading="submitting" :disabled="!selected.length">Synchroniser la sélection</v-btn> -->
      <v-data-table
          v-model="selected"
          v-bind:headers="headers"
          v-bind:items="items"
          select-all
          :loading="loading"
          v-bind:pagination.sync="pagination"
          item-key="_id"
          class="elevation-1"
        >
        <template slot="headers" slot-scope="props">
          <tr>
            <th>
              <v-checkbox
                color="info"
                hide-details
                @click.native="toggleAll"
                :input-value="props.all"
                :indeterminate="props.indeterminate"
              ></v-checkbox>
            </th>
            <th v-for="header in props.headers" :key="header.text"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header.value)"
            >
              <v-icon>arrow_upward</v-icon>
              {{ header.text }}
            </th>
          </tr>
        </template>
        <template slot="items" slot-scope="props">
          <tr :active="props.selected" @click="props.expanded = !props.expanded">
            <td @click="selectItem($event, props)">
              <v-checkbox
                color="primary"
                hide-details
                :input-value="props.selected"
              ></v-checkbox>
            </td>
            <td class="text-xs-right">{{ props.item.firstName }}</td>
            <td class="text-xs-right">{{ props.item.lastName }}</td>
            <td class="text-xs-right">
              <v-icon :color="props.item.sync ? 'success' : 'error'">
                {{ props.item.sync ? 'sync' : 'sync_disabled' }}
              </v-icon>
            </td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-card>
            <v-card-title>{{ props.item.firstName }} {{ props.item.lastName }}</v-card-title>
            <v-card-text>
              <contact-card :contact="props.item"></contact-card>
            </v-card-text>
          </v-card>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
  <ask-password-modal v-else :valid.sync="canNavigate"></ask-password-modal>
</template>

<style>

</style>

<script>
  import ContactCard from './SyncPage/ContactCard';
  import AskPasswordModal from './AskPasswordModal';
  import { fromBackToFront, fromFrontToBack, snack } from './../utils';

  export default {
    components: { ContactCard, AskPasswordModal },
    data() {
      return {
        canNavigate: false,
        pagination: {
          sortBy: 'firstName',
        },
        selected: [],
        headers: [
          { text: 'Prénom', value: 'firstName' },
          { text: 'Nom', value: 'lastName' },
          { text: 'Sync', value: 'sync' },
        ],
        unsyncCount: null,
        items: [],
        loading: true,
        submitting: false,
      };
    },
    created() {
      this.$db.find({}, (err, data) => {
        if (err || !data) {
          this.services.snack.error('Echec de la récupération des données locales');
        } else {
          this.unsyncCount = data.length;
          this.items = [
            ...this.items, 
            ...Object.values(data)
                     .map(val => ({ ...val, sync: false }))
            ];
        }
        this.loading = false;
        return null;
      });

      if (this.isOnline) {
        this.$api.get('candidate')
          .then(({data}) => {
            this.items = [
              ...this.items, 
              ...data.map(fromBackToFront)
            ];
          })
          .catch((err) => {
            console.warn('ERR', err);
            this.$services.snack.error('Une erreure est survenue');
          });
      }
    },
    computed: {
    },
    methods: {
      toggleAll() {
        if (this.selected.length) this.selected = [];
        else this.selected = this.items.slice();
      },
      changeSort(column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending;
        } else {
          this.pagination.sortBy = column;
          this.pagination.descending = false;
        }
      },
      selectItem(evt, props) {
        evt.stopPropagation();
        props.selected = !props.selected;
      },
      sync() {
        this.submitting = true;
        const toSync = this.items.filter(el => !el.sync);
        this.$api.post('candidate/sync', toSync.map(fromFrontToBack))
          .then(({data}) => {
            this.$services.snack.success('Les contact on bien étés synchronisés');
            this.$db.remove({});
            this.items = data.map(fromBackToFront);
            this.submitting = false;
          })
          .catch(err => {
            this.$services.snack.error('Echec de la synchronisation');
            this.submitting = false;
          });

      },
    },
  };
</script>
