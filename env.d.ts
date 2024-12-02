/// <reference types="vite/client" />
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  interface ComponentComputedAndMethods {
    fullName: string
    greet: () => string
  }
  const component: DefineComponent<object, object, ComponentComputedAndMethods>
  export default component
}
