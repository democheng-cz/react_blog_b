# 1.错误/难点

## 1. 使用懒加载路由的时候, 一定要使用 suspense

## 2. 通过 useRef 获取函数组件实例

### 1. 函数组件没有 refs

### 2. 通过 React.forwardRef()高阶组件包裹函数组件

### 3. React.forwardRef()无法与 memo 一起用, 使用 memo 将 React.forwardRef()包裹起来

### 4, 通过 UseImperativeHandle 钩子函数将要给父组件使用的属性和方法暴露出去.
