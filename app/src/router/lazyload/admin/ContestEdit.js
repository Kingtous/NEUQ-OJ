/**
 * Created by out_xu on 17/4/13.
 */

const ContestEdit = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/admin/ContestEdit'))
  }, 'ContestEdit')
}

export default ContestEdit
