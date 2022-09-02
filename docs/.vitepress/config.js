export default {
    title: 'FlipClock.js',
    description: 'Just playing around.',
    themeConfig: {
        // siteTitle: 'My Custom Title'
        nav: [
            { text: 'Guide', link: '/guide' },
            { text: 'Examples', link: '/examples' },
            { text: 'API', link: '/api' },
            // { text: 'Changelog', link: 'https://github.com/...' }
        ],
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Installation', link: '/guide/installation' },
              { text: 'Getting Started', link: '/guide/getting-started' },
              {
                text: 'Faces',
                link: '/guide/faces',
                items: [
                  { text: 'Clock', link: '/guide/faces/clock' },
                  { text: 'Counter', link: '/guide/faces/counter' },
                  { text: 'ElapsedTime', link: '/guide/faces/elapsed-time' },
                ]
              }
            ]
          },
        //   {
        //     text: 'API',
        //     items: [
        //       { text: 'Faces', link: '/extending/faces' },
        //       { text: 'Getting Started', link: '/getting-started' }
        //     ]
        //   }
        ],
        
    },
}