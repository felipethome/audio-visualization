!function t(e,n,i){function r(o,s){if(!n[o]){if(!e[o]){var u="function"==typeof require&&require;if(!s&&u)return u(o,!0);if(a)return a(o,!0);var c=new Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[o]={exports:{}};e[o][0].call(l.exports,function(t){var n=e[o][1][t];return r(n||t)},l,l.exports,t,e,n,i)}return n[o].exports}for(var a="function"==typeof require&&require,o=0;o<i.length;o++)r(i[o]);return r}({1:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=t("./Request"),o=function(){function t(e,n){i(this,t);var r=window.AudioContext||window.webkitAudioContext;this.buckets=e.buckets,this.smoothingTimeConstant=e.smoothingTimeConstant,this.audioCtx=new r,this.sourceNode=this.audioCtx.createBufferSource(),this.analyserNode=this.audioCtx.createAnalyser(),this.javascriptNode=this.audioCtx.createScriptProcessor(e.bufferSize,1,1),this.callback=n}return r(t,[{key:"setup",value:function(t){var e=this;this.analyserNode.fftSize=2*this.buckets,this.analyserNode.smoothingTimeConstant=this.smoothingTimeConstant,this.sourceNode.connect(this.analyserNode),this.analyserNode.connect(this.javascriptNode),this.javascriptNode.connect(this.audioCtx.destination),this.sourceNode.connect(this.audioCtx.destination),this.javascriptNode.onaudioprocess=function(){var t=new Uint8Array(e.analyserNode.frequencyBinCount);e.analyserNode.getByteFrequencyData(t),e.callback(e.filterFrequencies(t))},this.sourceNode.buffer=t,this.sourceNode.start()}},{key:"filterFrequencies",value:function(t){for(var e=t.length-200,n=new Uint8Array(e),i=50;i<t.length-150;i++)n[i-50]=t[i];return n}},{key:"loadFromURL",value:function(t,e){var n=this;return(0,a.get)(t,"arraybuffer",{},e).then(function(t){n.audioCtx.decodeAudioData(t,function(t){n.setup(t)})})}}]),t}();n.default=o},{"./Request":6}],2:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(){function t(e,n,r){i(this,t),this.ctx=e,this.color=n.color.slice(),this.constants=Object.assign({},r)}return r(t,[{key:"draw",value:function(t){var e=this.ctx,n=this.color,i=this.constants,r=i.width,a=i.height;e.fillStyle="rgba("+n[0]+", "+n[1]+", "+n[2]+", "+t/50+")",e.fillRect(0,0,r,a)}}]),t}();n.default=a},{}],3:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(){function t(){i(this,t)}return r(t,null,[{key:"isSafari",value:function(t){return-1!==t.indexOf("Safari/")&&-1===t.indexOf("Chrome")&&-1===t.indexOf("Chromium")}}]),t}();n.default=a},{}],4:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(){function t(e,n){i(this,t),this.ctx=e,this.x=n.cx-n.width/2,this.y=n.cy-n.height/2,this.width=n.width,this.height=n.height}return r(t,[{key:"draw",value:function(){var t=this.ctx,e=this.x,n=this.y,i=this.width,r=this.height,a=document.getElementById("earth-img");t.drawImage(a,e,n,i,r)}}]),t}();n.default=a},{}],5:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(t){return t&&t.__esModule?t:{default:t}}(t("./Utils")),o=function(){function t(e,n,r){i(this,t),this.ctx=e,this.angle=n.angle,this.cx=n.cx,this.cy=n.cy,this.radius=n.radius,this.constants=Object.assign({},r);var o=Math.sqrt(Math.pow(n.vx,2)+Math.pow(n.vy,2));this.direction={x:n.vx/o,y:n.vy/o},this.arrival={x:n.cx,y:n.cy},this.current={x:n.cx,y:n.cy},this.origin={x:r.mainCenterX,y:r.mainCenterY},this.minDistance=a.default.euclideanDistance2d(this.current,this.origin),this.fallVelocity=0}return r(t,[{key:"move",value:function(t,e){this.intensity=e,this.arrival.x=this.cx+t*this.direction.x,this.arrival.y=this.cy+t*this.direction.y;var n=a.default.euclideanDistance2d(this.arrival,this.origin),i=a.default.euclideanDistance2d(this.current,this.origin);i>=n?(this.wasLanching&&(this.fallVelocity=0),this.wasLanching=!1,i>this.minDistance?this.fall():this.draw()):(this.wasLanching=!0,this.launch(this.intensity))}},{key:"fall",value:function(){this.fallVelocity+=this.constants.gravity,this.current.x-=this.fallVelocity*this.direction.x,this.current.y-=this.fallVelocity*this.direction.y,this.draw()}},{key:"launch",value:function(){this.current.x+=this.intensity*this.direction.x,this.current.y+=this.intensity*this.direction.y,this.draw()}},{key:"draw",value:function(){var t=this.ctx,e=this.current,n=this.radius,i=this.intensity,r=this.constants,o=a.default.getRandomColor(.6);t.save(),t.beginPath(),t.strokeStyle=o,t.moveTo(r.mainCenterX,r.mainCenterY),t.lineTo(e.x,e.y),t.stroke(),t.restore(),t.beginPath(),t.arc(e.x,e.y,n+6*i,0,2*Math.PI,!1),t.fillStyle=o,t.fill();var s=document.getElementById("particle-img"),u=2*n,c=2*n;t.drawImage(s,e.x-u/2,e.y-c/2,u+2.2*i,c+2.2*i)}}]),t}();n.default=o},{"./Utils":8}],6:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=function(t,e,n,i,r){return new Promise(function(a,o){var s=new XMLHttpRequest;s.responseType=n,s.open(e.toUpperCase(),t),Object.keys(i).forEach(function(t){s.setRequestHeader(t,i[t])}),s.onprogress=function(t){if(t.lengthComputable){var e=t.loaded/t.total;r&&r(e)}else console.error("Unable to compute progress")},s.onload=function(){s.status>=200&&s.status<=299?a(s.response):o(s)},s.onerror=function(){console.error("Network error.")},s.send()})};n.get=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments[3];return t||console.error("URL can't be "+t+"."),i(t,"GET",e,n,r)}},{}],7:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(t){return t&&t.__esModule?t:{default:t}}(t("./Utils")),o=function(){function t(e,n,r){i(this,t),this.ctx=e,this.nOfStars=n.nOfStars,this.starMaxSize=n.starMaxSize,this.constants=Object.assign({},r),this.stars=[],this.starImageNames=["star-opacity-9-img","star-opacity-8-img","star-opacity-7-img","star-opacity-6-img","star-opacity-5-img"];for(var o=0;o<this.nOfStars;o++){var s=a.default.getRandomInteger(this.constants.width),u=a.default.getRandomInteger(this.constants.height),c=a.default.getRandomInteger(this.starMaxSize);this.stars.push({fileName:a.default.getRandomElement(this.starImageNames),x:s,y:u,size:c})}}return r(t,[{key:"draw",value:function(){for(var t=this.ctx,e=this.nOfStars,n=this.stars,i=0;i<e;i++){var r=document.getElementById(n[i].fileName);t.drawImage(r,n[i].x,n[i].y,n[i].size,n[i].size)}}}]),t}();n.default=o},{"./Utils":8}],8:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r=function t(){i(this,t)};r.getRandomInteger=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Math.floor(Math.random()*(t-e))+e},r.getRandomElement=function(t){return t[this.getRandomInteger(t.length)]},r.getRandomColor=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=["rgba(183, 28, 28, "+t+")","rgba(136, 14, 79, "+t+")","rgba(230, 81, 0, "+t+")","rgba(191, 54, 12, "+t+")"];return r.getRandomElement(e)},r.getAverage=function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t.length,i=0,r=0,a=e;a<n&&a<t.length;a++)i+=t[a],r++;return i/r},r.euclideanDistance2d=function(t,e){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))},r.toRadians=function(t){return t*(Math.PI/180)},r.getPointOnArc=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{x:0,y:0},i=n.x,r=void 0===i?0:i,a=n.y,o=void 0===a?0:a;return{x:t*Math.cos(this.toRadians(e))+r,y:t*Math.sin(this.toRadians(e))+o}},r.remapNumber=function(t,e,n){var i=e.min,r=void 0===i?0:i,a=e.max,o=n.min,s=void 0===o?0:o;return(t-r)/(a-r)*(n.max-s)+s},n.default=r},{}],9:[function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var r=i(t("./AudioConfig")),a=i(t("./BrowserDetection")),o=i(t("./Background")),s=i(t("./Sky")),u=i(t("./Earth")),c=i(t("./Particle")),l=i(t("./Utils")),h=i(t("./throttle")),f=document.getElementById("canvas"),d=f.getContext("2d"),g=void 0,y=void 0,v=void 0,m=void 0,p=void 0,w=void 0,x=function(){w={width:window.innerWidth,height:window.innerHeight,particleRadius:15,particleDistance:60,particleMaxDistance:100,nOfParticles:30,mainRadius:150,mainCenterX:Math.ceil(window.innerWidth/2),mainCenterY:Math.ceil(window.innerHeight/2),gravity:1},f.width=w.width,f.height=w.height,v=new o.default(d,{color:[183,28,28]},w),y=new s.default(d,{nOfStars:800,starMaxSize:6},w),m=new u.default(d,{cx:w.mainCenterX,cy:w.mainCenterY,width:2*w.mainRadius,height:2*w.mainRadius}),p=[];for(var t=0;t<360;t+=parseInt(360/w.nOfParticles)){var e=l.default.getPointOnArc(w.mainRadius+w.particleDistance,t,{x:w.mainCenterX,y:w.mainCenterY});p.push(new c.default(d,{angle:t,cx:e.x,cy:e.y,radius:w.particleRadius,vx:e.x-w.mainCenterX,vy:e.y-w.mainCenterY},w))}},b=function(){x(),(0,h.default)("resize","optimizedResize"),window.addEventListener("optimizedResize",x),document.getElementById("progress").classList.toggle("hidden")},C=function(t,e){if(t.length<w.nOfParticles)return e>=t.length?0:t[e];var n=Math.floor(t.length/w.nOfParticles),i=e*n,r=i+n;return l.default.getAverage(t,i,r)},M=function(t){d.clearRect(0,0,f.width,f.height);var e=l.default.getAverage(t),n=l.default.remapNumber(e,{max:256},{max:10});v.draw(n),y.draw();for(var i=0;i<p.length;i++){var r=C(t,i),a=l.default.remapNumber(r,{max:256},{max:w.particleMaxDistance});p[i].move(a,n)}m.draw()},O=function(t){console.log(t),document.getElementById("progress").innerHTML=parseInt(t)+"%"};document.getElementById("play-button").addEventListener("click",function(t){t.currentTarget.classList.toggle("hidden"),document.getElementById("progress").classList.toggle("hidden"),g=new r.default({buckets:512,smoothingTimeConstant:.3,bufferSize:2048},M),a.default.isSafari(navigator.userAgent)?g.loadFromURL("audio/audiobinger-rise-and-shine.mp3",O).then(b):g.loadFromURL("audio/audiobinger-rise-and-shine.ogg",O).then(b)})},{"./AudioConfig":1,"./Background":2,"./BrowserDetection":3,"./Earth":4,"./Particle":5,"./Sky":7,"./Utils":8,"./throttle":10}],10:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.default=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:window,i=!1;n.addEventListener(t,function(){i||(i=!0,requestAnimationFrame(function(){n.dispatchEvent(new CustomEvent(e)),i=!1}))})}},{}]},{},[9]);