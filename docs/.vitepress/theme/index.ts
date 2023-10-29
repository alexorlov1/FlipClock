import DefaultTheme from 'vitepress/theme';
import MyLayout from './MyLayout.vue';

// const project = new Project({
//     // useInMemoryFileSystem: true
// });

// const sourceFile = project.addSourceFilesAtPaths('../../../src/**/*.ts');

// console.log(project.getSourceFile());

export default {
    ...DefaultTheme,
    // override the Layout with a wrapper component that
    // injects the slots
    Layout: MyLayout
}