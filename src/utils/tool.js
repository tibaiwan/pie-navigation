import { typeImageList } from '@/const/machineTypeImage'

export default {
  // 根据机床型号获取对应图片ID
  getImageIdByMtType (mtType) {
    if (mtType && mtType.indexOf('.') > -1) {
      let type = mtType.split('.')[0]
      if (Object.keys(typeImageList).indexOf(type) > -1) {
        return type.toLowerCase()
      }
    }
    return 'default-type'
  }
}
