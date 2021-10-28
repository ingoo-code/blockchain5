import Send from '../utils/send'

export default {
  async loginAPI(data) {
    return Send({
      url:'user/login',
      method:'post',
      data
    })
  },
}
