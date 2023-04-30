import ansiColors from 'ansi-colors'
import Hexo from 'hexo'
import gitembed from 'git-embed'

const logname =
  ansiColors.magentaBright('hexo-shortcodes') +
  ansiColors.blueBright('(github)')

/**
 * hexo shortcode to embed file
 * @param hexo
 */
export function githubEmbed(hexo: Hexo) {
  hexo.extend.tag.register(
    'github',
    async function (params) {
      // filter empty array
      params = params.filter((str) => String(str).trim().length > 0)

      // only parse when array length > 0
      if (params.length > 0) {
        let url: string
        let parseURL: URL
        const config = {
          repo: '',
          file: '',
          line: '',
          ref: ''
        }

        if (params.length === 1) {
          // params is url
          try {
            parseURL = new URL(params[0])
          } catch (_e) {
            parseURL = new URL('https://github.com/' + params[0])
          }

          url = parseURL.toString()
        } else {
          // params is object
          const splitcolon = params.map((str) => String(str).split(':'))
          splitcolon.forEach((split) => {
            ;(config as any)[split[0].trim()] = split[1].trim()
          })
          parseURL = new URL('https://github.com')
          // merge pathname
          parseURL.pathname = [
            config.repo,
            'blob',
            config.ref,
            config.file
          ].join('/')
          // fix line
          if (!config.line.includes('L')) {
            // fix line to #L{number}-L{number}
            const splithypen = config.line.split('-')
            parseURL.hash = '#L' + splithypen[0] + '-L' + splithypen[1]
          } else {
            parseURL.hash = config.line
          }
          url = parseURL.toString()
        }

        hexo.log.i(logname, 'embed', parseURL.pathname + parseURL.hash)
        config.line = parseURL.hash
        const embed = await gitembed(url, { tabSize: 2 })
        return embed.result
      }

      return ''
    },
    { async: true }
  )
}
