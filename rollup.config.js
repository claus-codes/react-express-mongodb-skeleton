import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'
import styles from 'rollup-plugin-styles'
import path from 'path'

const outputPath = path.resolve('public/build')

const production = !process.env.ROLLUP_WATCH;

const serverParams = [
  'run',
  production ? 'start' : 'start-dev',
  '--',
  production ? '' : '--dev'
]

function serve() {
  let server

  function toExit() {
    if (server) server.kill(0)
  }

  return {
    writeBundle() {
      if (server) return
      server = require('child_process').spawn('npm', serverParams, {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
      })
      process.on('SIGTERM', toExit)
      process.on('exit', toExit)
    }
  }
}

const plugins = [
  replace({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    preventAssignment: true,
  }),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**'
  }),
  resolve({
    browser: true,
  }),
  commonjs(),
  styles({
    minimize: production,
    mode: 'extract',
    sourceMap: !production,
  }),
  // In dev mode, call `npm run start` once
  // the bundle has been generated
  !production && serve(),
  // Watch the `public` directory and refresh the
  // browser on changes when not in production
  !production && livereload('public'),
  // If we're building for production (npm run build
  // instead of npm run dev), minify
  production && terser()
]

const watchOptions = {
  clearScreen: false
}

export default [
  {
    input: path.resolve('src', 'app', 'app-client.js'),
    output: {
      file: path.resolve(outputPath, 'app.js'),
      sourcemap: !production,
      format: 'iife',
      assetFileNames: '[name][extname]',
    },
    plugins,
    watch: watchOptions,
  },
]
