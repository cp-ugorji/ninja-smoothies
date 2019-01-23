<template>
    <div class="add-smoothie container">
        <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2> 
        <form @submit.prevent="AddSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title:</label>
                <input type="text" name="title" v-model="title"/>
            </div>
            <div class="field" v-for="(ing, index) in ingredients" :key="index">
                <label for="ingredient">Ingredient:</label>
                <input type="text" name="ingredient" v-model="ingredients[index]"/>
                <i class="material-icons delete" @click="deleteIngredient(ing)">delete</i>
            </div>

            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient:</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIngredient" v-model="ingredient"/>
            </div>
            <div class="field center-align">
                <p v-if ="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Add Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/firebase_init';
import slugify from 'slugify';

    export default {
        name: 'addsmoothie',
        data(){
            return{
                title: null,
                ingredient: null,
                ingredients: [],
                feedback: null,
                slug: null
            }
        },

        methods:{
            AddSmoothie(){
               /// console.log(this.title, this.ingredients);
               if(this.title){
                   this.feedback = null;

                    //ensuring the ingredient field is pushed to the ingredients list if the field still contains an item
                    if(this.ingredient){
                        this.ingredients.push(this.ingredient);
                        // this.ingredient = null;
                        // this.feedback = null;
                    }

                   //creating slug from title
                    this.slug = slugify(this.title, {
                        replacement: '-',
                        remove: /[$*_+~.()'"!\-:@]/g,//remove all this sign globally from the title
                        lower: true
                    })
                    //console.log(this.slug);
                   //adding data to firebase firestore
                   db.collection('smoothies').add({
                       title: this.title,
                       ingredients: this.ingredients,
                       slug: this.slug
                   }).then(() => {
                       //redirecting to the home/index page after saving to database
                       this.$router.push({ name: 'Index' })
                   })
               }else {
                   this.feedback = 'You must enter a smoothie title.'
               }
            },

            addIngredient()
            {
                if(this.ingredient){
                    this.ingredients.push(this.ingredient);
                    this.ingredient = null;
                    this.feedback = null;
                }else{
                    this.feedback = 'You must enter a value to add an ingredient.'
                }
            },

            deleteIngredient(ing){
                this.ingredients = this.ingredients.filter(ingredient => {
                    return ingredient != ing;
                })
            }
        }
    }
</script>

<style>
.add-smoothie{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}

.add-smoothie h2{
    font-size: 2em;
    margin: 20px auto;
}

.add-smoothie .field{
    margin: 20px auto;
    position: relative;
}

.add-smoothie .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>
