exports.isValiDate = function isValidDate (date) {
return typeof date === 'string' && moment(date, DATE_FORMAT, true).isValid()
}
exports.isAdmin = async function isAdmin (robot, username) {
    try {
      const info = await robot.adapter.api.get('users.info', { username: username })

      if (!info.user) {
        throw new Error('No user data returned')
      }

      if (!info.user.roles) {
        throw new Error('User data did not include roles')
      }

      return info.user.roles.indexOf('admin') !== -1
    } catch (err) {
      robot.logger.error('Could not get user data with bot, ensure it has `view-full-other-user-info` permission', err)
    }
  }