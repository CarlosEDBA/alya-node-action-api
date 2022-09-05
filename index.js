const { nanoid } = require('nanoid')

const GENERATE_IDS = false

let actions = {}

let transformers = []

let cache = []

let response = []

function log() {
  console.log('alya-node-action-api >', ...arguments)
}

function registerAction(actionName, action) {
  actions = { ...actions, [actionName]: action }
}

function addTransformer(transformer) {
  transformers = [...transformers, transformer]
}

function addToCache(value) {
  cache = [...cache, value]
}

function clearCache() {
  cache = []
}

function addToResponse(obj) {
  response = { ...response, ...obj }
}

function clearResponse() {
  response = {}
}

function errorHandler(payload, err) {
  console.error(err)
  
  addToResponse({
    [payload.id]: {
      status: 'error',
      error: {
        name: err.name,
        message: err.message,
      }
    }
  })
}

async function executeAction(payload, data) {
  let actionName = payload.action
  let params = payload.params || {}

  let action = actions[actionName]

  if (action && typeof action === 'function') {
    let result = await action({ params, data }).catch(errorHandler.bind(null, payload))

    if (result) {
      addToCache([payload.id, result])

      addToResponse({
        [payload.id]: {
          status: 'success',
          result: result
        }
      })
    }
  } 
}

async function handlePayload(payload) {
  if (GENERATE_IDS && !payload.id) {
    payload.id = nanoid()
  }

  let data = payload.data || {}

  for (let key of Object.keys(data)) {
    for (let transformer of transformers) {
      transformer(data, key)
    }
  }

  await executeAction(payload, data)
}

async function handler(req, res) {
  let payloads = req.body || []

  if (!Array.isArray(payloads)) {
    payloads = [payloads]
  }

  if (payloads) {
    for (let payload of payloads) {
      log('payload:', payload)

      await handlePayload(payload)
    }

    res.send(response)

    clearCache()
    clearResponse()
  } else {
    res.sendStatus(204)
  }
}

module.exports = {
  registerAction,
  addTransformer,
  handler,
}