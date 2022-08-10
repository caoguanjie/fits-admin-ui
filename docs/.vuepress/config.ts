import { resolve } from 'path'
import Unocss from 'unocss/vite'
import { defineUserConfig } from 'vuepress'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import sidebar from './sidebar'
import { path } from '@vuepress/utils'
import {
	NaiveUiResolver,
	VueUseComponentsResolver
} from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect'

export default defineUserConfig({
	lang: 'zh-CN',
	title: 'FitsAdmin',
	head: [
		['link', { rel: 'icon', href: '/images/favicon.ico' }]
	],
	description: '基于vue3-element-admin为模板的前端框架',
	themeConfig: {
		logo: '/images/logo.png',
		sidebar,
		sidebarDepth: 3,
		navbar: [
			{
				text: '指南',
				link: '/guide/quickstart'
			},
			{
				text: '组件',
				link: '/components/'
			},
			{
				text: 'GitHub',
				link: 'https://github.com/caoguanjie/fits-admin-ui.git'
			},
		]
	},
	public: resolve(__dirname, '../assets'),
	theme: resolve(__dirname, './theme/index.ts'),
	alias: {
		'~': resolve(__dirname, '../'),
		'~u': resolve(__dirname, './composables')
	},
	plugins: [
		[
			'@vuepress/register-components',
			{
				componentsDir: resolve(__dirname, '../../components'),
				getComponentName: (filename: string) => {
					//生成的组件名字
					const arr = filename.split("/")
					return `Fits${path.trimExt(arr[arr.length - 1])}`;
				}
			}
		],
		['vuepress-plugin-demoblock-plus', {
			cssPreprocessor: 'less',
			customClass: 'demoblock-custom',
			scriptReplaces: [
				{
					searchValue: /const ({ defineComponent as _defineComponent }) = Vue/g,
					replaceValue: 'const { defineComponent: _defineComponent } = Vue'
				}
			]
		}],

		[
			'@vuepress/plugin-search',
			{
				locales: {
					'/': {
						placeholder: 'Search'
					}
				}
			}
		]
	],
	bundlerConfig: {
		viteOptions: {
			plugins: [
				Inspect(),
				Unocss({
					mode: 'per-module'
				}),
				Components({
					dirs: '',
					dts: resolve(
						__dirname,
						'./types/components.d.ts'
					),
					extensions: ['vue', 'md'],
					include: [/\.md$/, /\.vue$/],
					resolvers: [
						NaiveUiResolver(),
						VueUseComponentsResolver()
					]
				}),
				AutoImport({
					dts: resolve(
						__dirname,
						'./types/auto-imports.d.ts'
					),
					imports: ['vue', 'vue-router', '@vueuse/core']
				})
			]
		}
	}
})
