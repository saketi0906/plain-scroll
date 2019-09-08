import typescript from 'rollup-plugin-typescript2'
import uglify from 'rollup-plugin-uglify-es'
import serve from 'rollup-plugin-serve'

export default () => {
  if (process.env.dev) {
    return {
      input: './src/plain-scroll.ts',
      output: {
        file: './dist/plain-scroll.js',
        name: 'PlainScroll',
        format: 'umd'
      },
      plugins: [
        typescript()
      ]
    }
  }

  if (process.env.devServer) {
    return {
      input: './src/script.ts',
      output: {
        file: './dist/plain-scroll.js',
        name: 'PlainScroll',
        format: 'umd'
      },
      plugins: [
        typescript(),
        serve({
          open: true,
          openPage: '/index.html',
          contentBase: 'dist'
        })
      ]
    }
  }

  return [
    {
      input: './src/script.ts',
      output: [
        {
          file: './dist/plain-scroll.min.js',
          name: 'PlainScroll',
          format: 'umd'
        },
        {
          file: './dist/plain-scroll.min.esm.js',
          format: 'esm'
        }
      ],
      plugins: [
        typescript(),
        uglify()
      ]
    }
  ]
}