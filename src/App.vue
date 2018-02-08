<template>
  <div id="app">
    <v-app :dark="isDark ? true : false">

      <!-- Left sidebar -->
      <v-navigation-drawer
        fixed
        :mini-variant="miniVariant"
        :clipped="clipped"
        v-model="drawer"
        app
      >
        <v-list>
          <v-list-tile 
            router
            :to="item.to"
            :key="i"
            v-for="(item, i) in items"
            exact
          >
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>


      <!-- Top toolbar -->
      <v-toolbar fixed app :clipped-left="clipped" >

        <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>

        <!-- <v-btn 
          icon
          @click.native.stop="miniVariant = !miniVariant"
        >
          <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
        </v-btn>

        <v-btn
          icon
          @click.native.stop="clipped = !clipped"
        >
          <v-icon>web</v-icon>
        </v-btn>

        <v-btn
          icon
          @click.native.stop="fixed = !fixed"
        >
          <v-icon>remove</v-icon>
        </v-btn> -->

        <v-toolbar-title v-text="title"></v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn
          icon
          @click.native.stop="isDark = !isDark"
        >
          <v-icon>lightbulb_outline</v-icon>
        </v-btn>
        <v-icon :color="isOnline ? 'success' : 'error'">
          {{ isOnline ? 'network_wifi' : 'signal_wifi_off' }}
        </v-icon>

      </v-toolbar>

      <!-- Content -->
      <v-content>
        <v-container fluid fill-height>
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </v-container>
      </v-content>

      <!-- FOOTER -->
      <v-footer :fixed="fixed" app>
        <v-spacer></v-spacer>
        <span>&copy; 2017</span>
      </v-footer>

      <v-snackbar
        :timeout="snack.timeout"
        :color="snack.color"
        multi-line
        :vertical="snack.mode === 'vertical'"
        v-model="snack.open"
      >
        <span v-html="snack.text"></span>
        <v-btn dark flat @click.native="snack.open = false">Close</v-btn>
      </v-snackbar>

    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'cesi-ta-chance',
    data: () => ({
      clipped: false,
      drawer: false,
      fixed: false,
      isDark: false,
      items: [
        { icon: 'format_align_left', title: 'Formulaire', to: '/' },
        { icon: 'sync', title: 'Synchronisation', to: '/sync' },
        { icon: 'settings', title: 'Paramètres', to: '/settings' },
      ],
      miniVariant: false,
      right: true,
      title: 'CESI Ta Chance !',
      snack: {},
      modal: {
        opened: false,
        next: null,
        cancel: null,
        password: {
          value: null,
          isVisible: false,
        }
      },
    }),

    created() {
     this.snack = this.$services.snack.data;
     this.modal = this.$services.modal.data;
    }
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
</style>
