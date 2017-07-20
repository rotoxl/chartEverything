# chartEverything
React Native project for an awesome new app, never ever released before.

Should be serverless (tabletop? firebase?) and should look like:

![Target](https://raw.githubusercontent.com/rotoxl/chartEverything/master/screenshots/MyCharts.png "List") 
![Target](https://raw.githubusercontent.com/rotoxl/chartEverything/master/screenshots/Chart.png "Detail") 


# Install

```shell
npm install --save react-navigation
npm install react-native-vector-icons --save
npm install react-native-pathjs-charts --save
react-native link react-native-svg
npm install
```

# TODO
* ~~Design 'New Chart' screen~~
* Define 
  * ~~chart metadata~~
  * chart types
  * inapp purchases
* ~~Icons stuff~~
* Find best way to create charts... RN charting libraries seem to only scratch the surface
  * ~~https://github.com/AdonRain/react-native-ichart~~ - OUTDATED
  * https://github.com/capitalone/react-native-pathjs-charts - GIVING A TRY 

  
# Add touch events to https://github.com/capitalone/react-native-pathjs-charts
```javascript
//Pie.js
render() {
    let fnOnPress=this.props.onPress 
    ...
    ...
                      <Path d={c.sector.path.print() } stroke={stroke} fill={fill} fillOpacity={1} onPress={() => fnOnPress(c.item)}/>
	...
    
```    

```javascript
//Bar.js
render() {
    let fnOnPress=this.props.onPress 
    ...
    ...
                    <Path  d={ c.line.path.print() } stroke={stroke} fill={color} onPress={() => fnOnPress(c.item)}/>
	...
    
```    