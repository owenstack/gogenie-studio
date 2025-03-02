import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {presentationTool} from 'sanity/presentation'
import {locate} from './presentation/locate'

export default defineConfig({
  name: 'default',
  title: 'gogenie',

  projectId: 'l2tbopyy',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), presentationTool({
    previewUrl: 'https://gogenie.co',
    resolve: {
      locations: locate
    }
  })],

  schema: {
    types: schemaTypes,
  },
})
