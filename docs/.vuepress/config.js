module.exports = {
	title: '基于Halcon的光栅投影的三维重构的研究',
	description: '一种原理基于光栅投影，使用了最新的halcon平台去做三维重构的尝试！',
	base: '/', // 基准url
	href: './favicon.ico',
	// markdown: {
	// 	lineNumbers: true
	// },
	head: [
		['link', { rel: 'icon', href: '/logo.png' }],
		['link', { rel: 'manifest', href: '/manifest.json' }],
		['meta', { name: 'theme-color', content: '#53A8FF' }],
		['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
		['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
		['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
		['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#53A8FF' }],
		['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
		['meta', { name: 'msapplication-TileColor', content: '#000000' }]
	],
	themeConfig: {
		nav: [
			{ text: '首页', link: '/' },
			{ text: '指南', link: '/guide/' },
			{
				text: '生态',
				items: [
					{ text: '关于', link: '/about' },
					{ text: '友链', link: '/contact' }
				]
			}
		],
		lastUpdated: '上次更新',
		sidebar: {
			'/guide/': getGuideSidebar('指南', '深入'),
			'/': [
				'contact', /* /contact.html */
				'about'    /* /about.html */
			]
		},
		sidebarDepth: 2,
		repo: 'pengqiangsheng/halcon',
		repoLabel: 'Github',
		docsRepo: 'pengqiangsheng/halcon',
		docsDir: 'docs',
		docsBranch: 'master',
		editLinks: true,
		editLinkText: '编辑此页'
	},
	plugins: [
		['@vuepress/back-to-top', true],
		['@vuepress/pwa', {
			serviceWorker: true,
			updatePopup: true
		}],
		[
      'vuepress-plugin-helper-live2d', {
        live2d: {
          // 是否启用(关闭请设置为false)(default: true)
          enable: true,
          // 模型名称(default: hibiki)>>>取值请参考：
          // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
          model: 'miku',
          display: {
            position: "right", // 显示位置：left/right(default: 'right')
            width: 270, // 模型的长度(default: 135)
            height: 400, // 模型的高度(default: 300)
            hOffset: 65, //  水平偏移(default: 65)
            vOffset: 0, //  垂直偏移(default: 0)
          },
          mobile: {
            show: false // 是否在移动设备上显示(default: false)
          },
          react: {
            opacity: 0.8 // 模型透明度(default: 0.8)
          }
        }
      }
    ]
	]
}

function getGuideSidebar (groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
				'',
				'getting-started',
				'hardware',
				'software',
				'calibration-process',
				'detail',
				'reference'
      ]
    },
    {
      title: groupB,
	  	collapsable: false,
      children: [
        'principle',
        'halcon',
        'raster-generation',
				'phase-m-p',
				'unwrapper',
				'calibration'
      ]
		},
		{
			title: '完整代码',
			collapsable: false,
			children: [
				'code-halcon',
				'code-matlab'
			]
		},
		{
			title: '完整项目',
			collapsable: false,
			children: [
				'project'
			]
		}
  ]
}