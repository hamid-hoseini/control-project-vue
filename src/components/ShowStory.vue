<template>
  <b-row class="show-story-container">
    <b-col cols="12">
      <h2>
        Show Story
      </h2>
      <b-jumbotron>
        <template slot="header">
          {{story.title}}
          <hr class="my-4">
        </template>
        
        <template slot="lead">
            <strong>  NO.</strong>: <a :href="storyLink" target="_blank">{{story.storyNo}}</a><br>
            Type: {{story.type}}<br>
            Release: {{story.release}}<br>
            Status: {{story.status}}<br>
            Date: {{story.date}}<br>
            Release Date: {{story.releaseDate}}<br>
            Github Branch: {{story.branch}}<br>
            Github Commit: <a :href="gitLink" target="_blank" v-if="gitLink !== ''">
                <b-button variant="outline-primary" size="sm">Git link</b-button>
                </a><br>
            Developer: {{story.developer}}<br>
            Description: {{story.description}}<br>
        </template>
        <hr class="my-4">
        <b-btn class="edit-btn" variant="success" @click.stop="editboard(key)">Edit</b-btn>
        <b-btn variant="danger" @click.stop="deleteboard(key)">Delete</b-btn>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import firebase from '../Firebase'
import router from '../router'

export default {
  name: 'ShowStory',
  data () {
    return {
      key: '',
      story: {},
      storyLink: '',
      gitLink: ''
    }
  },
  created () {
    const ref = firebase.firestore().collection('stories').doc(this.$route.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.key = doc.id;
        this.story = doc.data();
        this.storyLink = "https://unifisoftware.atlassian.net/browse/" + this.story.storyNo;
        this.gitLink = this.story.commit;

      } else {
        alert("No such document!");
      }
    });
  },
  methods: {
    editboard (id) {
      router.push({
        name: 'EditStory',
        params: { id: id }
      })
    },
    deleteboard (id) {
      firebase.firestore().collection('stories').doc(id).delete().then(() => {
        router.push({
          name: 'StoryList'
        })
      }).catch((error) => {
        alert("Error removing document: ", error);
      });
    }
  }
}
</script>

<style>

  .show-story-container {
      padding: 70px 30px 30px 30px;
  }
  .show-story-container h1 {
      font-size: 28px;
  }
  .show-story-container .jumbotron {
    padding: 2rem;
    width: 80%;
    margin: 20px auto;
  }
  .edit-btn {
    margin-right: 20px;
    width: 70px;
  }
</style>