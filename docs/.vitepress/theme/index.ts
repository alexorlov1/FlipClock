import DefaultTheme from 'vitepress/theme';
import MyLayout from './MyLayout.vue';

console.log(DefaultTheme.Layout);

export default {
    ...DefaultTheme,
    // override the Layout with a wrapper component that
    // injects the slots
    Layout: MyLayout
}