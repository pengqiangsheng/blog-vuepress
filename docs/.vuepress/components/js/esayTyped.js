
var getSingle = function(fn) {
    var result
    return function ()  {
        return result || (result = fn.apply(this, arguments))
    }
}

class EasyTyped {
  constructor(obj, input, fn,) {
    this.defalutObj = { context = '', isEnd = false, speed = 80, back = false, type = 'default', backSpeed = 80 }
    this.obj = obj || this.defalutObj
    this.input = input || ''
    this.fn = fn || function() {}
    console.log(this.obj)
  }
  typing () {
    let i = 0, stop = false
    const that = this
    let timer = setInterval(function() {
        if(i === that.input.length) {
            i = 0
            stop = true
            clearInterval(timer)
            timer = null
        }
        if(that.obj.isEnd) {
            clearInterval(timer)
            timer = null
            return
        }
        if(stop) {
          return (typeof that.fn === 'function') ? that.fn() : ''
        }
        that.obj.context = that.input.slice(0, i+1)
        i++
    }, this.obj.speed)
  }
}

const typedBack = function (obj, fn) {
    let str = obj.context
    let i = str.length, stop = false
    let timer = setInterval(() => {
        if(i === -1) {
            obj.context = ''
            i = 0
            stop = true
            clearInterval(timer)
            timer = null
        }
        if(obj.isEnd) {
            clearInterval(timer)
            timer = null
            obj.back = false
            return
        }
        if(stop) {
            obj.back = false
            console.log(typeof fn === 'function')
            return (typeof fn === 'function') ? fn() : ''
        }
        obj.context = str.slice(0, i+1)
        console.log(i)
        i--
    }, obj.backSpeed)
}
 function typing (obj, str, fn)  {
    let i = 0, stop = false
    let timer = setInterval(() => {
        if(i === str.length) {
            i = 0
            stop = true
            clearInterval(timer)
            timer = null
        }
        if(obj.isEnd) {
            clearInterval(timer)
            timer = null
            return
        }
        if(stop) {
            if(obj.type === 'default') {
                return typedBack(obj, fn)
            }else {
                if(obj.back) {
                   return typedBack(obj, fn)
                }
                return (typeof fn === 'function') ? fn() : ''
            }

        }
        obj.context = str.slice(0, i+1)
        i++
    }, obj.speed)
}
const obj = {
    context: '',
    isEnd: false,
    speed: 240,
    back: false,
    type: 'default',
    backSpeed: 150
}
export default var i = 0;


// function getOu (val) {
//     if(val % 2 === 0) return 1
//     return 0
// }
// let n = 1
// function getIntet() {
//     let direction = 'left'
//     if(getOu(n)) {
//         direction = 'right'
//     }else {
//         direction = 'left'
//     }
//     n++
//     fetch('https://v1.hitokoto.cn')
//         .then(res => res.json())
//         .then(data => {
//             typing(data.hitokoto, obj, getIntet)
//         })
// }
// getIntet()

// typing(`天不生我彭小呆`, obj, getIntet)
// typing(`天不生我彭小呆`, obj)
// obj.back = true
// obj.type = 'none'

// let interval =  setInterval(()=>{
//     console.log(obj.context)
//     if(obj.isEnd) {
//         clearInterval(interval)
//         interval = null
//     }
// }, 200)

// let timer2 =  setTimeout(()=>{
//     obj.isEnd = true
//     clearTimeout(timer2)
//     timer2 = null
// }, 20000)
