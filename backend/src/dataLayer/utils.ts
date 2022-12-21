/**
 * Encode last evaluated key using
 *
 * @param {Object} lastEvaluatedKey a JS object that represents last evaluated key
 *
 * @return {string} URI encoded last evaluated key
 */
export function encodeNextKey(lastEvaluatedKey: any): string {
    if (!lastEvaluatedKey) {
      return null
    }
  
    return encodeURIComponent(JSON.stringify(lastEvaluatedKey))
}