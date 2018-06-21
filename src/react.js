export default class Element {
  /**
   * 
   * @param {String} tag 
   * @param {Object} props 
   * @param {Array} children 
   * @param {String} key 
   */
  constructor(tag, props, children, key){
    this.tag = tag
    this.props = props
    if(Array.isArray(children)){
      this.children = children
    } else if(typeof(children) === 'string'){
      this.key = children
      this.children = null
    }
    if (key) this.key = key
  }
  render(){
    let root = this._createElement(
      this.tag,
      this.props,
      this.children,
      this.key
    )
    document.body.appendChild(root)
    return root
  }
  create(){
    return this._createElement(
      this.tag,
      this.props,
      this.children,
      this.key
    )
  }
  /**
   * 生成虚拟dom
   */
  _createElement(tag, props, children, key){
    let el = document.createElement(tag)
    // 添加节点属性
    for(const key in props){
      if(props.hasOwnProperty(key)){
        const value = props[key]
        el.setAttribute(key, value)
      }
    }
    if(key){
      el.setAttribute('key', key)
    }
    // 地柜添加子节点
    if(children){
      children.forEach(element => {
        let child
        if(element instanceof Element){
          child = this._createElement(
            element.tag,
            element.props,
            element.children,
            element.key
          )
        }else{
          child = document.createTextNode(element)
        }
        el.appendChild(child)
      })
    }
    return el
  }
}