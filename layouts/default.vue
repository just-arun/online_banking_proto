<template>
  <v-app :dark="darkThem">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      :floating="true"
    >
      <v-list>
        <v-list-tile v-if="$store.state.authUser">
          <v-list-tile avatar>
            Welcome {{$store.state.authUser.name}}
          </v-list-tile>
        </v-list-tile>
        <v-list-tile v-for="(item, i) in navLink" :key="i" :to="item.to" router exact>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="settings = !settings; drawer = !drawer">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Settings
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="clipped" fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer; settings = false"/>
      <!-- <v-btn fab small><v-icon>menu</v-icon></v-btn> -->
      <v-toolbar-title v-text="title"/>
      <v-spacer/>
      <v-btn to="/" @click="logout()" v-if="$store.state.authUser" flat color="grey">
      Logout
      <v-icon right dark>exit_to_app</v-icon>
      </v-btn>
      <v-btn to="/login" v-if="!$store.state.authUser" flat color="grey">
        Login
        <v-icon right>account_circle</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
        <nuxt/>
    <v-footer :fixed="fixed">
      <span>&copy; 2019</span>
    </v-footer>
    </v-content>
    <settings 
    v-on:closeSettings="settings = false"
    v-on:toggleThem="darkThem = !darkThem"
    v-bind:settings="settings"/>
  </v-app>
</template>

<script>
import { returnStatement } from "@babel/types";
import settings from './partials/settings'

export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      darkThem: false,
      settings: false,
      // items: this.navLink(),
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Oline Payment"
    };
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout");
      } catch (e) {
        this.formError.push(e.message);
      }
    }
  },
  components: { settings },
  computed: {
    navLink: function() {
      if (!this.$store.state.authUser) {
        return [
          {
            icon: "home",
            title: "Home",
            to: "/"
          },
          {
            icon: "account_circle",
            title: "Login",
            to: "/login"
          },
        ];
      } else {
        if (this.$store.state.authUser.level == "one") {
          return [
            {
              icon: "home",
              title: "Home",
              to: "/"
            },
            {
              icon: "security",
              title: "secret",
              to: "/secret"
            },
            {
              icon: "dashboard",
              title: "Dashboard",
              to: "/dashboard"
            },
          ];
        } else if(this.$store.state.authUser.level == "two") {
          return [
            {
              icon: "home",
              title: "Home",
              to: "/"
            },
            {
              icon: "dashboard",
              title: "Dashboard",
              to: "/dashboard"
            },
            {
              icon: "security",
              title: "secret",
              to: "/secret"
            },
            {
              icon: "security",
              title: "secret 2",
              to: "/secret2"
            },
            {
              icon: "account_circle",
              title: "signup",
              to: "/signup"
            },
          ];
        }
      }
    }
  }
};
</script>
<style>
  .page{
    min-height: 100vh;
  }
</style>