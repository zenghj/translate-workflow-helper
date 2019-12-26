import * as path from 'path'
import syncTranslations from '../dist'

test('basic usage', async () => {
  const result = await syncTranslations({
    translationsRootPath: path.resolve(__dirname, './res'),
    translationFileName: 'zh.json',
    outputPath: path.resolve(__dirname, './output'),
    outputNameMap: {
      'values': 'en'
    },
    excludes: [
      'values-zh-rCN'
    ]
  })
  expect(result).toBe(true)
})