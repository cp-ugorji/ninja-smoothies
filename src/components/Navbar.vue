<template>
    <!--creating top navigation bar with materialize from google-->
    <div class="navbar">
        <!--making the navigation bar large with colour indigo and a dark nav bar-->
        <nav class="nav-extended indigo darken-2">
            <!--creating a content area for the navigation bar-->
            <div class="nav-content">
                <!--adding link/anchor tag to the navigation bar-->
                <router-link :to="{ name: 'Index' }">
                    <!--adding a title to the link/anchor tag-->
                    <span class="nav-title">Ninja Smoothies</span>
                </router-link>
                <!--adding a link/anchor tag to act as a large floating button,
                with pink color and positioned halfway between the navigation
                bar and the main content area of the page-->
                <a href="" class="btn-floating btn-large halfway-fab pink">
                    <!--adding a link router to the supposed floating button.
                    this tell the button where to go or which page to display 
                    when clicked in this case, it is AddSmoothie-->
                    <router-link :to="{ name : 'AddSmoothie' }">
                        <!--adding a plus/add icon to the floating button-->
                        <i class="material-icons">add</i>
                    </router-link>
                </a>
            </div>
        </nav>
    </div>
</template>

<script>
    export default{
        name: 'Navbar',
        data(){
            return{

            }
        }
    }
</script>

<style>
.navbar nav{
    padding: 0 20px;
}
</style>
