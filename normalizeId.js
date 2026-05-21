function normalizeId(id) {
  const idTexto = String(id).trim()

  if (!/^\d+$/.test(idTexto)) {
    return null
  }

  const idNormalizado = Number(idTexto)

  if (!Number.isSafeInteger(idNormalizado) || idNormalizado <= 0) {
    return null
  }

  return idNormalizado
}

module.exports = normalizeId
