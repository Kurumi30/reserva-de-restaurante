import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
// import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        external: ['express', 'cors'],
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    // plugins: [
    //   viteStaticCopy({
    //     targets: [
    //       {
    //         // src: path.resolve(__dirname, 'src/renderer/assets/js/*'),
    //         src: 'src/renderer/assets/js/*',
    //         dest: 'assets/js'
    //       },
    //       {
    //         // src: path.resolve(__dirname, 'src/renderer/assets/css/*.css'),
    //         src: 'src/renderer/assets/css/*.css',
    //         dest: 'assets/css'
    //       },
    //       {
    //         // src: path.resolve(__dirname, 'src/renderer/*.html'),
    //         src: 'src/renderer/*.html',
    //         dest: '.'
    //       }
    //     ]
    //   })
    // ]
  },
})
