<template>
  <b-row class="list-story-container">
    <b-col cols="12">
      <h2>
        Story List
        <b-link href="#/add-story" class="float-right">
            <b-button variant="outline-dark">Add Story</b-button>
        </b-link>
      </h2>
      <b-table striped hover :items="stories" :fields="fields">
        <template slot="actions" scope="row">
          <b-btn size="sm" @click.stop="details(row.item)">Details</b-btn>
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script>

import firebase from '../Firebase'
import router from '../router'

export default {
  name: 'StoryList',
  data () {
    return {
      fields: {
        storyNo: { label: 'Story No', sortable: true, 'class': 'text-left' },
        title: { label: 'Title', sortable: true, 'class': 'text-left' },
        status: { label: 'Status', sortable: true, 'class': 'text-left' },
        release: { label: 'Release', sortable: true, 'class': 'text-left' },
        actions: { label: 'Action', 'class': 'text-center' }
      },
      stories: [],
      errors: [],
      ref: firebase.firestore().collection('stories').orderBy('storyNo')
    }
  },
  created () {
    this.ref.onSnapshot((querySnapshot) => {
      this.stories = [];
      querySnapshot.forEach((doc) => {
        this.stories.push({
          key: doc.id,
          title: doc.data().title,
          storyNo: doc.data().storyNo,
          status: doc.data().status,
          release: doc.data().release,

        });
      });
    });
  },
  methods: {
    details (story) {
      router.push({ name: 'ShowStory', params: { id: story.key }})
    }
  }
}
</script>

<style>
  .list-story-container {
      padding: 70px 30px 30px 30px;
  }
  .list-story-container .table {
    width: 80%;
    margin: 20px auto;
  }
</style>