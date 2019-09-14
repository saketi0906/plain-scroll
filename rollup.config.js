import typescript from 'rollup-plugin-typescript2'
import uglify from 'rollup-plugin-uglify-es'
import serve from 'rollup-plugin-serve'

export default () => {
  if (process.env.dev) {
    return {
      input: 'src/plain-scroll.ts',
      output: {
        file: 'dist/plain-scroll.js',
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
      input: 'src/plain-scroll.ts',
      output: {
        file: 'dist/plain-scroll.js',
        name: 'PlainScroll',
        format: 'umd'
      },
      plugins: [
        typescript(),
        serve({
          open: true,
          openPage: 'index.html',
          contentBase: 'playground'
        })
      ]
    }
  }

  return [
    {
      input: 'src/plain-scroll.ts',
      output: [
        {
          file: 'dist/plain-scroll.min.js',
          name: 'PlainScroll',
          format: 'umd'
        }
      ],
      plugins: [
        typescript(),
        uglify()
      ]
    }
  ]
}