import { defineClientAppEnhance } from '@vuepress/client'
import ElementPlus from 'element-plus';
// 你自定义的 css
import './index.scss'

const noop = ({ app }) => {
    app.use(ElementPlus)
}

export default defineClientAppEnhance(noop)
