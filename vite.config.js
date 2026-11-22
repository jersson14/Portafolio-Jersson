import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { Readable } from 'node:stream'

/* En desarrollo sirve /api/* con las mismas funciones que corren en Vercel. */
const ROUTES = ['chat', 'speak', 'transcribe']

const localApi = () => ({
  name: 'local-api',
  apply: 'serve',
  configureServer(server) {
    const env = loadEnv(server.config.mode, server.config.root, ['OPENAI_', 'AGENT_', 'UPSTASH_', 'KV_'])
    Object.assign(process.env, env)

    for (const route of ROUTES) server.middlewares.use(`/api/${route}`, async (req, res) => {
      try {
        const chunks = []
        for await (const c of req) chunks.push(c)
        const handler = (await server.ssrLoadModule(`/api/${route}.js`))[req.method]
        if (!handler) { res.statusCode = 405; return res.end() }
        const request = new Request(`http://${req.headers.host}/api/${route}`, {
          method: req.method,
          headers: req.headers,
          ...(chunks.length ? { body: Buffer.concat(chunks) } : {}),
        })
        const out = await handler(request)
        res.statusCode = out.status
        out.headers.forEach((v, k) => res.setHeader(k, v))
        if (!out.body) return res.end()
        Readable.fromWeb(out.body).on('error', () => res.destroy()).pipe(res)
      } catch (err) {
        server.config.logger.error(`[api/${route}] ${err.message}`)
        res.statusCode = 500
        res.end()
      }
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localApi()],
})
