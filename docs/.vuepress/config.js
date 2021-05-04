module.exports = {
	title: '彭小呆的随笔杂谈',
	description: '天不生我彭小呆，万古长青一生狂',
	base: '/', // 基准url
	href: './favicon.ico',
	head: [
		['link', { rel: 'icon', href: '/logo.png' }],
		['link', { rel: 'manifest', href: '/manifest.json' }],
		['meta', { name: 'theme-color', content: '#53A8FF' }],
		['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
		['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
		['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
		['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#53A8FF' }],
		['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
		['meta', { name: 'msapplication-TileColor', content: '#000000' }],
		// ['meta', { 'http-equiv': 'Content-Security-Policy', content: 'Content-Security-Policy'}, { name: 'content', content: 'upgrade-insecure-requests'}]
    	// ['script', { type: 'text/javascrpit', src: 'https://cdn.jsdelivr.net/npm/typing.js@2.1.0/typing.min.js'}],
    	// ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/typing.js@2.1.0/typing.css'}]
	],
	themeConfig: {
		nav: [
			{ text: '首页', link: '/' },
			// { text: '2020', link: '/2020/' }, 隐藏url
      { text: 'Lot', link: '/lot/' },
			{ text: '技术', link: '/blog/' },
			{ text: '杂笔', link: '/life/' },
			{ text: '特性', link: '/features/' },
			{
				text: '开源',
				items: [
          { text: 'halcon', link: '/halcon/' },
          { text: 'p-blog', link: '/pblog/' },
					{ text: 'easy-typer-js', link: '/typer/' },
          { text: 'vue-qrcode-direction', link: '/qrcode/' }
				]
			},
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
      '/lot/': getLot('Lot'),
      '/2020/': get2020('2020'),
			'/halcon/': getHalconSidebar('指南', '深入'),
			'/typer/': getTyperSidebar('打字机插件'),
      '/qrcode/': getQrCodeSidebar('二维码插件'),
      '/pblog/': getPblogSidebar('P-BLOG博客框架'),
      '/features/': getFeaturesSidebar('特性'),
      '/blog/': getBlog('技术分享'),
      '/life/': getLife('杂笔'),
			'/': [
				'contact', /* /contact.html */
				'about',    /* /about.html */
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

function getHalconSidebar (groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'guide',
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

function getTyperSidebar (title) {
	return [
		{
			title: title,
			collapsable: false,
			children: [
				''
			]
		}
	]
}

function getQrCodeSidebar (title) {
	return [
		{
			title: title,
			collapsable: false,
			children: [
				''
			]
		}
	]
}

function getPblogSidebar (title) {
	return [
		{
			title: title,
			collapsable: false,
			children: [
				''
			]
		}
	]
}

function getFeaturesSidebar (title) {
	return [
	  {
      title: title,
      collapsable: false,
      children: [
        '',
        'line-edit',
        'easy-typer',
        'h5-live-face'
      ]
	  }
	]
}

function getLife (title) {
	return [
	  {
      title: title,
      collapsable: false,
      children: [
        '',
        '中国福州鼓山半日游',
        '我们毕业了',
        '深海迷航联机教程'
      ]
	  }
	]
}

function getBlog (title) {
	return [
	  {
      title: title,
      collapsable: false,
      children: [
        '',
        'start'
      ]
    },
    {
      title: 'JavaScript && Vue',
      collapsable: false,
      children: [
        '闭包',
        'Vue插件开发之拍照上传功能',
        'H5实时在线人脸识别',
        'ztree',
        'element-table',
        '权限控制篇',
      ]
    },
    {
      title: 'NodeJs',
      collapsable: false,
      children: [
        '基于node的断点续传、分片上传',
        '基于node的分片传输和下载',
      ]
    },
    {
      title: 'Linux',
      collapsable: false,
      children: [
        'docker-gogs-nginx配置Git服务自动部署Web应用',
        '使用树莓派构建一台服务器，永久运行网站',
        '用nginx配置反向代理实现二级域名配置到公网ip的不同端口的应用',
        'Centos-cp-去掉覆盖提醒',
        'Centos部署ngrok内网穿透服务器',
      ]
    },
    {
      title: 'Other',
      collapsable: false,
      children: [
        '双向链表',
        '经典游戏贪吃蛇Snake',
        '小飞机ss-ssr的部署方法',
        'github更新项目',
        '关于php执行shell命令的一些体会',
        'hexo生成博文插入图片的办法',
        '用hexo和github搭建个人博客小站全攻略',
      ]
	  }
	]
}

function get2020 (title) {
	return [
	  {
      title: title,
      collapsable: false,
      children: [
        '',
        'university'
      ]
	  }
	]
}

function getLot (title) {
	return [
	  {
      title: title,
      collapsable: false,
      children: [
        ''
      ]
	  }
	]
}