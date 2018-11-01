/* 设备导航 */
<template>
  <section>
    <!-- 导航部分 -->
    <div id="panel" class="panel" @click="hanleClickPanel">
      <!-- canvas 部分 -->
      <div id="canvasWrap" class="canvas-wrap" style="transform: rotate(0deg)">
        <canvas id="navChart" width="430" height="430"></canvas>
      </div>
      <!-- 中间机床部分 -->
      <div id="machineInfo" class="machine-info">
        <div class="machine-image">
          <img id="machineImg" src="~@/assets/images/machine/default.png" alt="">
        </div>
        <div class="info">
          <div>{{equipmentItem.mtNo}}</div>
          <div>{{equipmentItem.typeName}}</div>
        </div>
      </div>
      <!-- 二级导航区域 -->
      <div id="ballWrap" class="ball-wrap">
        <div class="ball" id="ball-a">
          <div class="outer">
            <div class="inner" id="ball-a-inner">
              <img src="~@/assets/images/ball-01.png" alt="">
              <div class="title">设备档案</div>
            </div>
          </div>
        </div>
        <div class="ball" id="ball-b">
          <div class="outer">
            <div class="inner" id="ball-b-inner">
              <img src="~@/assets/images/ball-02.png" alt="">
              <div class="title">远程诊断</div>
            </div>
          </div>
        </div>
        <div class="ball" id="ball-c">
          <div class="outer">
            <div class="inner" id="ball-c-inner">
              <img src="~@/assets/images/ball-03.png" alt="">
              <div class="title">机床体检</div>
            </div>
          </div>
        </div>
        <div class="ball" id="ball-d">
          <div class="outer">
            <div class="inner" id="ball-d-inner">
              <img src="~@/assets/images/ball-04.png" alt="">
              <div class="title">状态监控</div>
            </div>
          </div>
        </div>
        <div class="ball" id="ball-e">
          <div class="outer">
            <div class="inner" id="ball-e-inner">
              <img src="~@/assets/images/ball-05.png" alt="">
              <div class="title">设备报警</div>
            </div>
          </div>
        </div>
        <div class="ball" id="ball-f">
          <div class="outer">
            <div class="inner" id="ball-f-inner">
              <img src="~@/assets/images/ball-06.png" alt="">
              <div class="title">故障维修</div>
            </div>
          </div>
        </div>
        <div class="ball" id="ball-g">
          <div class="outer">
            <div class="inner" id="ball-g-inner">
              <img src="~@/assets/images/ball-07.png" alt="">
              <div class="title">设备运行</div>
            </div>
          </div>
        </div>
      </div>
      <div class="hint">
        <span>提示：</span>
        <span>1、可在看板右侧空白区域上下拖拽以调整导航位置</span>
        <span>2、双击看板空白区域可以重置设备导航</span>
      </div>
    </div>

    <!-- 预加载图片 -->
    <div class="preload-imgs" id="preload">
      <img id="m1" src="~@/assets/images/machine/m1.png" alt="">
      <img id="m3" src="~@/assets/images/machine/m3.png" alt="">
      <img id="m4" src="~@/assets/images/machine/m4.png" alt="">
      <img id="m8" src="~@/assets/images/machine/m8.png" alt="">
      <img id="t1" src="~@/assets/images/machine/t1.png" alt="">
      <img id="t3" src="~@/assets/images/machine/t3.png" alt="">
      <img id="t5" src="~@/assets/images/machine/t5.png" alt="">
      <img id="default-type" src="~@/assets/images/machine/default.png" alt="">

      <img id="ball-01" src="~@/assets/images/ball-01.png" alt="">
      <img id="ball-02" src="~@/assets/images/ball-02.png" alt="">
      <img id="ball-03" src="~@/assets/images/ball-03.png" alt="">
      <img id="ball-04" src="~@/assets/images/ball-04.png" alt="">
      <img id="ball-05" src="~@/assets/images/ball-05.png" alt="">
      <img id="ball-06" src="~@/assets/images/ball-06.png" alt="">
      <img id="ball-07" src="~@/assets/images/ball-07.png" alt="">

      <img id="pie-01" src="~@/assets/images/pie-01.png" alt="">
      <img id="pie-01-active" src="~@/assets/images/pie-01-active.png" alt="">
      <img id="pie-02" src="~@/assets/images/pie-02.png" alt="">
      <img id="pie-02-active" src="~@/assets/images/pie-02-active.png" alt="">
      <img id="pie-03" src="~@/assets/images/pie-03.png" alt="">
      <img id="pie-03-active" src="~@/assets/images/pie-03-active.png" alt="">
      <img id="pie-04" src="~@/assets/images/pie-04.png" alt="">
      <img id="pie-04-active" src="~@/assets/images/pie-04-active.png" alt="">
      <img id="pie-05" src="~@/assets/images/pie-05.png" alt="">
      <img id="pie-05-active" src="~@/assets/images/pie-05-active.png" alt="">
    </div>
  </section>
</template>

<script>
import navInfoList from '@/const/navInfo.js'
import tool from '@/utils/tool'

const navNum = 5 // 扇形图数量
const navRadius = 215 // 导航栏半径
const navInitPointX = 215 // 导航初始化中心点
const navInitPointY = 215
const colorOrange = '#fabf40'
const colorMiddleOrange = '#fef2d9'
const colorLightOrange = '#F7DCA6'
const pathList = ['/synthesis-manage', '/remote', '/examination', '/monitoring-status', '/equip-warning', '/repair-manage', '/repair-decision']
const ballIds = [...'abcdefg']
let ctx = '' // canvas 上下文
let canvas = '' // canvas
let panel = '' // 面板
let canvasWrap = '' // canvas wrap对象
let machineInfo = '' // 机床信息区域
let ballWrap = '' // 二级菜单区域
let ballAngles = [45, 100, 135, 170, 210, 265, 330]
const ballInitAngles = [45, 100, 135, 170, 210, 265, 330]
let ballArr = []
let ballInnerArr = []

export default {
  data () {
    return {
      count: 0, // 绘制次数计数
      mouseTimer: null,
      isShowingAllBalls: false, // 是否显示了全部二级球
      isShowingSingleBall: false, // 是否显示了单个二级球
      isPointOnInnerCircle: false, // 是否选中了导航中心
      currentSelectedModule: 0, // 当前选中的导航id(1-5)
      currentMouseOverBallIndex: -1, // 鼠标当前悬浮的二级球的索引
      currentRotateAngle: 0, // 当前旋转角度
      start: 0,
      end: 0,
      mousePosition: {}, // 鼠标移动位置
      mouseDownPostion: {}, // 鼠标点击位置
      equipmentItem: {
        typeName: 'M3.BTC', // 设备类型
        mtNo: '设备编号设备编号' // 设备编号
      }
    }
  },
  mounted () {
    panel = document.getElementById('panel')
    canvas = document.getElementById('navChart')
    canvasWrap = document.getElementById('canvasWrap')
    machineInfo = document.getElementById('machineInfo')
    ballWrap = document.getElementById('ballWrap')
    ctx = canvas.getContext('2d')
    document.body.scrollTop = document.documentElement.scrollTop = 0
    // 获取二级球的对象
    this.getBallsObject()
    // 设置二级球的事件
    this.handleEventOnBalls()
    // 绘制中心的设备图片
    this.setMachineImage(this.equipmentItem.typeName)
    // 设定坐标中心点
    ctx.translate(navInitPointX, navInitPointY)
    // 主流程
    this.main()
    // 处理面板的鼠标拖拽事件
    this.handlePanelDrag()
    // 处理机床信息区域的鼠标悬浮事件
    this.handleMachineInfoOver()
    // 设置面板双击事件
    this.handleDoubleClick()
  },
  methods: {
    main () {
      // console.log('Draw times:' + this.count++)
      ctx.clearRect(-navInitPointX, -navInitPointY, canvas.width, canvas.height)
      ctx.save()
      // 绘制外圈饼形图
      this.drawNavChart()
      // 绘制外圈饼形图 上的文字和图标
      this.drawNavTextIcon()
      // 绘制内部多个圆环
      this.drawInnerCircles()
      // 监听鼠标事件
      this.handleMouseEvent()
      ctx.restore()
    },
    // 设置中心的机床图片
    setMachineImage (typeName) {
      if (typeName) {
        let imgId = tool.getImageIdByMtType(typeName)
        document.getElementById('machineImg').src = document.getElementById(imgId).src
      }
    },
    // 绘制外圈饼形图
    drawNavChart () {
      console.log('drawNavChart')
      ctx.rotate(Math.PI / 9) // 旋转一定角使最上面圆环的一个水平
      ctx.beginPath()
      ctx.arc(0, 0, navRadius, 0, 2 * Math.PI)
      ctx.closePath()
      for (let i = 0; i < navNum; i++) {
        let navItem = navInfoList[i]
        ctx.beginPath()
        ctx.moveTo(0, 0)
        this.end += 2 / navNum * Math.PI // 终止角度
        ctx.lineWidth = 20
        ctx.strokeStyle = 'white'
        ctx.arc(0, 0, navRadius, this.start, this.end)
        ctx.closePath()
        if (!this.isShowingAllBalls) {
          navItem.isPointInPath = ctx.isPointInPath(this.mousePosition.x, this.mousePosition.y)
        }
        ctx.fillStyle = this.isShowingAllBalls || navItem.isPointInPath ? colorOrange : colorLightOrange
        ctx.stroke()
        ctx.fill()
        if (!this.isShowingAllBalls && navItem.isPointInPath) {
          // 设置当前选中模块的标识
          this.currentSelectedModule = navItem.id
          // 显示选中的扇形对应的二级球形
          navInfoList[navItem.ballIndex].children.forEach((item, index) => {
            ballArr[item.ballIndex].classList.add('ball-show')
            ballArr[item.ballIndex].style.transform = `rotate(${ballAngles[item.ballIndex]}deg)`
            ballInnerArr[item.ballIndex].style.transform = `rotate(-${ballAngles[item.ballIndex]}deg)`
          })
        }
        this.start += 2 / navNum * Math.PI // 设置下个扇形的起始角度
      }
      if (this.isShowingSingleBall && !ballWrap.classList.contains('ball-show-single')) {
        ballWrap.classList.add('ball-show-single')
      }
      this.isShowingSingleBall = this.isPointInSinglePie()
      if (!this.isShowingAllBalls && !this.isShowingSingleBall) {
        this.resetAmimationData()
      }
      ctx.rotate(-Math.PI / 9) // 重置旋转
    },
    // 绘制外圈饼形图上的文字和图标
    drawNavTextIcon () {
      for (let i = 0; i < navNum; i++) {
        let navItem = navInfoList[i]
        // 绘制扇形区域的文本和图标
        ctx.font = '12px weight 微软雅黑'
        ctx.textAlign = 'center'
        if (this.currentSelectedModule === navItem.navId || this.isShowingAllBalls) {
          ctx.fillStyle = '#fff'
          this.drawPieIcon(navItem.iconId, navItem.pointX - 10, navItem.pointY, true)
        } else {
          ctx.fillStyle = '#333'
          this.drawPieIcon(navItem.iconId, navItem.pointX - 10, navItem.pointY)
        }
        ctx.save()
        // 变换旋转原点
        ctx.translate(navItem.pointX, navItem.pointY)
        ctx.rotate(navItem.rotate)
        ctx.fillText(navItem.name, navItem.textPointX, navItem.textPointY)
        ctx.rotate(-navItem.rotate)
        ctx.restore()
      }
    },
    // 画圆共同方法
    drawCircle (radius, color, mouseOverFlag = false) {
      ctx.beginPath()
      ctx.arc(0, 0, radius, 0, 2 * Math.PI)
      ctx.fillStyle = color
      ctx.fill()
      // 该圆形是否有鼠标悬浮事件
      if (mouseOverFlag) {
        // 设置阴影
        this.isPointOnInnerCircle = ctx.isPointInPath(this.mousePosition.x, this.mousePosition.y)
        if (this.isPointOnInnerCircle) {
          ctx.shadowOffsetX = 0
          ctx.shadowBlur = 50
          ctx.shadowColor = colorOrange
        }
      }
    },
    // 绘制内部多个圆环
    drawInnerCircles () {
      ctx.save()
      this.drawCircle(165, '#fff')
      this.drawCircle(150, colorLightOrange)
      this.drawCircle(138, '#fff')
      this.drawCircle(123, colorMiddleOrange)
      this.drawCircle(114, 'rgba(255, 255, 255)')
      this.drawCircle(102, colorOrange, true)
      this.drawCircle(92, colorLightOrange)
      this.drawCircle(88, '#fff')
      ctx.restore()
    },
    // 绘制扇形区域的图标(type: active)
    drawPieIcon (imgId, pointX, pointY, isActive = false) {
      let img = isActive ? document.getElementById(`${imgId}-active`) : document.getElementById(imgId)
      ctx.drawImage(img, pointX, pointY)
    },
    // 监听鼠标事件，延迟4毫秒
    handleMouseEvent () {
      // 监听鼠标移动
      canvas.addEventListener('mousemove', e => {
        e.stopPropagation()
        e = e || window.event
        this.mousePosition.x = e.offsetX
        this.mousePosition.y = e.offsetY
        // 防抖、重绘
        clearTimeout(this.mouseTimer)
        this.mouseTimer = setTimeout(() => {
          ctx.clearRect(-navInitPointX, -navInitPointY, canvas.width, canvas.height)
          this.main()
        }, 4)
      })
    },
    // 处理面板的鼠标拖动事件
    handlePanelDrag () {
      panel.onmousedown = e => {
        let startY = e.offsetY
        panel.onmousemove = e => {
          let moveY = e.offsetY - startY
          let rotate = parseInt(moveY % 360 / 20) // 20倍低速旋转
          this.currentRotateAngle += rotate
          this.rotateCanvas(+this.currentRotateAngle)
        }
        panel.onmouseup = e => {
          panel.onmouseup = null
          panel.onmousemove = null
        }
      }
      return false
    },
    // 旋转canvas
    rotateCanvas (rotate) {
      // 是否显示了所有的二级球
      if (this.isShowingAllBalls) {
        // console.log('旋转度数：', rotate)
        canvasWrap.style.transform = `rotate(${rotate}deg)`
        for (let i = 0; i < ballIds.length; i++) {
          let angle = ballAngles[i] + rotate
          ballArr[i].style.transform = `rotate(${angle}deg)`
          ballInnerArr[i].style.transform = `rotate(-${angle}deg)`
        }
      } else {
        this.resetAllBallStyles()
      }
    },
    // 获取二级球的对象
    getBallsObject () {
      let ballArrTemp = []
      let ballInnerArrTemp = []
      for (let i = 0; i < ballIds.length; i++) {
        ballArrTemp.push(document.getElementById(`ball-${ballIds[i]}`))
        ballInnerArrTemp.push(document.getElementById(`ball-${ballIds[i]}-inner`))
      }
      ballArr = ballArrTemp
      ballInnerArr = ballInnerArrTemp
    },
    // 设置二级球的事件，悬浮和点击跳转
    handleEventOnBalls () {
      ballArr.forEach((item, index) => {
        item.addEventListener('mouseenter', e => {
          console.log('mouseenter', index)
          item.classList.add('ball-active')
          this.currentMouseOverBallIndex = index
        })
        item.addEventListener('mouseleave', e => {
          item.classList.remove('ball-active')
          setTimeout(() => {
            this.currentMouseOverBallIndex = -1
          }, 350)
        })
        item.addEventListener('click', e => {
          // 只响应显示全部二级球的点击
          if (this.isShowingAllBalls) {
            alert('跳转路由：' + pathList[index])
          }
        })
      })
    },
    // 处理机床信息区域，控制二级球的显示与隐藏
    handleMachineInfoOver () {
      machineInfo.addEventListener('mouseenter', e => {
        if (!ballWrap.classList.contains('ball-show-all')) {
          this.resetAllBallStyles()
          // 显示所有球体
          ballWrap.classList.add('ball-show-all')
          this.isShowingAllBalls = true
          this.isShowingSingleBall = false
          this.main()
          // 二级球旋转到相应位置
          ballArr.forEach((item, index) => {
            item.style.transform = `rotate(${ballAngles[index]}deg)`
          })
          ballInnerArr.forEach((item, index) => {
            item.style.transform = `rotate(-${ballAngles[index]}deg)`
          })
        }
      })
    },
    // 设置面板双击事件，重置面板动画
    handleDoubleClick () {
      canvasWrap.addEventListener('dblclick', e => {
        e.stopPropagation()
      })
      machineInfo.addEventListener('dblclick', e => {
        e.stopPropagation()
      })
      panel.addEventListener('dblclick', e => {
        this.resetAllBallStyles()
        this.resetAmimationData()
        this.main()
      })
    },
    // 重置动画参数
    resetAmimationData () {
      this.isShowingAllBalls = false
      this.isShowingSingleBall = false
      this.isPointOnInnerCircle = false
      this.currentSelectedModule = 0
      this.start = 0
      this.end = 0
      this.currentRotateAngle = 0
      ballAngles = ballInitAngles
      // 重置看板中心的机床信息
      canvasWrap.style.transform = 'rotate(0deg)'
    },
    // 重置所有的球体的样式
    resetAllBallStyles () {
      ballWrap.classList.remove('ball-show-single')
      ballWrap.classList.remove('ball-show-all')
      ballArr.forEach(item => {
        item.classList.remove('ball-show')
        item.style.transform = 'rotate(0deg)'
      })
      ballInnerArr.forEach(item => {
        item.style.transform = 'rotate(0deg)'
      })
    },
    // 是否高亮了单个扇形图
    isPointInSinglePie () {
      let inFlag = false
      for (let i = 0; i < navNum; i++) {
        let navItem = navInfoList[i]
        if (navItem.isPointInPath) {
          inFlag = true
          break
        }
      }
      return inFlag
    },
    // 判断鼠标是否悬浮在二级球上
    isMouseOnBalls () {
      return ballArr.some(item => item.classList.contains('ball-active'))
    },
    // 处理panel的点击事件
    hanleClickPanel () {
      // 只响应显示一级导航的点击
      if (!this.isShowingAllBalls && this.currentMouseOverBallIndex !== -1) {
        alert('跳转路由：' + pathList[this.currentMouseOverBallIndex])
      }
    }
  },
  watch: {
    // 所选扇形图变更的场合，重置二级球样式
    currentSelectedModule () {
      if (this.currentSelectedModule !== 0) {
        this.resetAllBallStyles()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/navigation.scss";
</style>
