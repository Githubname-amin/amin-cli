# amin-cli
Amin's attempt at front-end engineering


# 一些规定

1. 需要监听某个区域的点击事件，则需要给该区域添加`observer-click`属性，值为该事件的唯一标识，例如：`observer-click="a-b-c"`
    1. 推荐的传值规范：传入值将作为当前埋点子事件id，a为页面层面，b为组件层面，c为具体标签或业务内容
