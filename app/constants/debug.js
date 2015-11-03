/* global DEBUG_MODE */
/* eslint no-console: 0 */
const debug_mode = DEBUG_MODE

const debug = {
  log(...args) {
    if(console && debug_mode) {
      console.log(...args)
    }
  }
}

export default debug
