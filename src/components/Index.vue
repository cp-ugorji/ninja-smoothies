<template>
  <!--creating a div that identifies this as the index page 
  and adding a container class to it from google's materialize-->
  <div class="index container">
    <!--creating a div that will look like a card to hold
    all element returned per smothie, like the title, ingredents
    and all other values returned but this card will be dynamically
    created per number of smoothies returned thus the for-loop
    v-for and the key/unique identifier should be the id of 
    each smoothie-->
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <!--creating a div to hold the card's content which are
      delete icon, title and the array of ingredient per smoothie-->
      <div class="card-content">
        <!--adding delete icon and styling it using our own declared
        style class delete in the syle tag at the end of this page
        @click property is used to add an on-click event to the delete icon
        and on click we want it to call the deleteSmoothie() function
        which accepts smoothie id as parameter to delete the specified
        smoothie-->
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
        <!--adding title to have the materialize text colour indigo-->
        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <!--adding an un-ordered list with self styled class ingredients-->
        <ul class="ingredients">
          <!--adding a list item and looping through all the ingredients
          in each smoothie-->
          <li v-for="(ing, index) in smoothie.ingredients" :key="index">
            <!--making all list item look small like a chip from materialize-->
            <span class="chip">{{ing}}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name : 'EditSmoothie', params: { smoothie_slug: smoothie.slug }}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
//importing firestore database
import db from '@/firebase/firebase_init';

export default {
  name: 'Index',
  data () {
    return {
      //creating dummy data variable called smoothies
      //which is an array of smoothy
      //each smoothie contain a title, 
      //a slug which is the link that will show in the url,
      //since url links are not suppose to contain spaces as 
      //found in the title 'Ninja Brew' and shouldn't have upper
      //case laters thus we want a slug that meets our url
      //criteria which is 'ninja-brew',
      //an array of ingredeints used to make the smoothie and
      //an id which uniquely identifies each smoothie
      // smoothies:[
      //   {
      //     title: 'Ninja Brew', 
      //     slug: 'ninja-brew',
      //     ingredients: ['bananas', 'coffee', 'milk'],
      //     id: '1'
      //   },
      //   {
      //     title: 'Morning Mood',
      //     slug: 'morning-mood',
      //     ingredients: ['mango', 'lime', 'juice'],
      //     id: '2'
      //   }
      // ]
      smoothies: []
    }   
  },

   methods: {
      deleteSmoothie(id)
      {
        // this.smoothies = this.smoothies.filter(smoothie => {
        //   return smoothie.id != id;
        //})

        //delete doc from firebase firestore
        db.collection('smoothies').doc(id).delete()
        .then(() => {
            this.smoothies = this.smoothies.filter(smoothie => {
            return smoothie.id != id;
            })
        })
      }
    },

    created() {
      //fetching data from the firebase firestore
      db.collection('smoothies').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          //console.log(doc.data(), doc.id);
          let smoothie = doc.data();
          smoothie.id = doc.id;
          this.smoothies.push(smoothie);
        })
      })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}

.index h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}

.index ingredients{
  margin: 30px auto;
}

.index .ingredients li{
  display: inline-block;
}

.index .delete{
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}

</style>
