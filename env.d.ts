/// <reference types="vite/client" />
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  type IModalConfig = object
  const component: DefineComponent
  export default component

  export { IModalConfig }
}
