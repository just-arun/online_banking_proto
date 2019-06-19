<template>
  <v-layout row justify-center>
    <v-dialog v-model="settings" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="$emit('closeSettings')">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="$emit('closeSettings')">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>User Controls</v-subheader>
          <v-list-tile avatar>
            <v-list-tile-action>
              <v-switch color="primary" @change="$emit('toggleThem')"></v-switch>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Dark them</v-list-tile-title>
              <v-list-tile-sub-title>this will make the interface darker and make it easier for our eyes to see it on darkness</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
  export default {
      props: ['settings'],
    data () {
      return {
        
      }
    }
  }
</script>