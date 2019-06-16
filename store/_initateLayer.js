import store from './index'

export default function initateLayer(layer) {
  layer.on('logline', d => {
    if(d.type === 1) {
      store.commit('settings/setpwd', d.payload)
    }
  })

  // layer.on('status', d => {
  //   if(d.type === 'lock') {
  //     store.commit('settings/set', {
  //       hide_handle: d.message
  //     })
  //   }
  // })

  layer.connect()
}
