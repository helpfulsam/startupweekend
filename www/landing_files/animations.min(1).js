define("animations/localTweenEngine/localTweenEngine",["tweenEngine"],function(a){"use strict";var b=new a;return b.engine.adjustLagSmoothing(0),b}),define("animations/animationClasses/base/sequence/baseSequence",["animations/localTweenEngine/localTweenEngine"],function(a){"use strict";function d(a){return b.timeline(a,[])}var b=a.engine,c=a.factory;c.registerAnimation("BaseSequence",d)}),define("animations/animationClasses/base/baseNone",["animations/localTweenEngine/localTweenEngine"],function(a){"use strict";function d(a,c,d,e){return e.duration=c||0,e.delay=d||0,e.to={},b.tween(a,e,[])}var b=a.engine,c=a.factory;c.registerAnimation("BaseNone",d)}),define("animations/animationClasses/base/baseFade",["animations/localTweenEngine/localTweenEngine"],function(a){"use strict";function d(a,c,d,e){return e.duration=c||0,e.delay=d||0,e.lazy=!!e.lazy,e.to&&(e.to.autoAlpha=e.to.autoAlpha||e.to.opacity||0,delete e.to.opacity),e.from&&(e.from.autoAlpha=e.from.autoAlpha||e.from.opacity||0,delete e.from.opacity),b.tween(a,e,["opacity","autoAlpha"])}var b=a.engine,c=a.factory;c.registerAnimation("BaseFade",d)}),define("animations/animationClasses/base/basePosition",["animations/localTweenEngine/localTweenEngine"],function(a){"use strict";function d(a,c,d,e){return e.duration=c||0,e.delay=d||0,b.tween(a,e,["left","top","x","y","z","bezier"])}var b=a.engine,c=a.factory;c.registerAnimation("BasePosition",d)}),define("animations/animationClasses/base/baseScale",["animations/localTweenEngine/localTweenEngine"],function(a){"use strict";function d(a,c,d,e){return e.duration=c||0,e.delay=d||0,b.tween(a,e,["scale"])}var b=a.engine,c=a.factory;c.registerAnimation("BaseScale",d)}),define("animations/animationClasses/base/baseSkew",["animations/localTweenEngine/localTweenEngine"],function(a){"use strict";function d(a,c,d,e){return e.duration=c||0,e.delay=d||0,b.tween(a,e,["skewX","skewY"])}var b=a.engine,c=a.factory;c.registerAnimation("BaseSkew",d)}),define("animations/animationClasses/base/baseRotate",["animations/localTweenEngine/localTweenEngine"],function(a){"use strict";function d(a,c,d,e){return e.duration=c||0,e.delay=d||0,b.tween(a,e,["rotation"])}var b=a.engine,c=a.factory;c.registerAnimation("BaseRotate",d)}),define("animations/animationClasses/base/baseRotate3D",["lodash","animations/localTweenEngine/localTweenEngine"],function(a,b){"use strict";function e(b){a.forEach([b,b.to,b.from],function(a){a&&(a.rotationX||a.rotationY)&&(a.scaleY=a.rotationX&&Math.abs(Math.cos(a.rotationX*Math.PI/180)),a.scaleX=a.rotationY&&Math.abs(Math.cos(a.rotationY*Math.PI/180)),a.rotationX=void 0,a.rotationY=void 0)},this)}function f(b){a.forEach(b,function(a){var b=a.getAttribute("data-z-counter");b=b?Number(b):0,a.setAttribute("data-z-counter",b+1)})}function g(a,b){b.add(c.set(a,{attr:{"data-z-counter":"-=1"},immediateRender:!1}))}function h(b,h,i,j){var k=["rotationX","rotationY","rotationZ"];b=b.length?b:[b];var l=a.unique(a.map(b,function(a){return a.parentNode}));j=a.cloneDeep(j||{}),j.duration=h||0,j.delay=i||0;var m=!!j.fallbackFor3D,n=j.perspective,o=!0;delete j.perspective,delete j.fallbackFor3D,m&&!o&&(e(j),k=k.concat(["scaleX","scaleY"]));var p=d.sequence();return f(l),p.add(c.set(b,{transformPerspective:n}),0).add(c.tween(b,j,k)),g(l,p),p.get()}var c=b.engine,d=b.factory;d.registerAnimation("BaseRotate3D",h)}),define("animations/animationClasses/base/baseClip",["lodash","animations/localTweenEngine/localTweenEngine"],function(a,b){"use strict";function e(a){var b=c.getBoundingRect(a),d=c.getBoundingContentRect(a),e=d.top-b.top,f=d.left-b.left,g=d.width+f,h=d.height+e;return"rect("+[e,g,h,f].join("px,")+"px)"}function f(a,b,d,f){return f.duration=b||0,f.delay=d||0,a=a instanceof HTMLElement?[a]:a,f.to&&f.to.clip||(f.to=f.to||{},f.to.clip=e(a[0])),f.from&&f.from.clip||(f.from=f.from||{},f.from.clip=e(a[0])),c.tween(a,f,["clip"])}var c=b.engine,d=b.factory;d.registerAnimation("BaseClip",f)}),define("animations/animationClasses/base/baseDimensions",["animations/localTweenEngine/localTweenEngine"],function(a){"use strict";function d(a,c,d,e){return e.duration=c||0,e.delay=d||0,b.tween(a,e,["width","height","top","left","maxWidth","maxHeight","minWidth","minHeight","bottom","right","margin","padding","marginTop","marginBottom","marginLeft","marginRight","paddingTop","paddingBottom","paddingRight","paddingLeft","zIndex"])}var b=a.engine,c=a.factory;c.registerAnimation("BaseDimensions",d)}),define("animations/animationClasses/base/baseScroll",["lodash","animations/localTweenEngine/localTweenEngine"],function(a,b){"use strict";function e(b,e,f,g){g=g||{},g.duration=e||0,g.delay=f||0,g.scrollTo={x:g.x||0,y:g.y||0,autoKill:g.autoKill||!1},delete g.x,delete g.y,delete g.autoKill,b=b instanceof HTMLElement||b===window?[b]:b;var h=d.sequence();return a.forEach(b,function(a){h.add(c.tween(a,g,["scrollTo","autoKill"]),0)}),h.get()}var c=b.engine,d=b.factory;d.registerAnimation("BaseScroll",e)}),define("animations/animationClasses/base/baseClear",["lodash","animations/localTweenEngine/localTweenEngine"],function(a,b){"use strict";function e(b,e,f,g){var h,i,j=g.propsToRestore;e=0,b=b.length?b:[b];var k=a.unique(a.map(b,function(a){return a.parentNode}));h=a.defaults({duration:e,delay:f||0,to:{},clearProps:g.props},g),delete h.props,delete h.parentProps,g.parentProps&&(i=a.cloneDeep(h),i.delay=0,i.clearProps=g.parentProps);var l=d.sequence();return l.add(c.tween(b,h,[])),i&&l.add(c.tween(k,i,[])),j&&(j.duration=0,j.delay=0,j.immediateRender=!1,l.add(c.tween(b,j,a.keys(j)))),l.get()}var c=b.engine,d=b.factory;d.registerAnimation("BaseClear",e)}),define("animations/animationClasses/animation/arcIn",["lodash","animations/localTweenEngine/localTweenEngine"],function(a,b){"use strict";function f(a,b){var c=["pseudoRight","right","pseudoLeft","left"],d=Math.round(b/90);return a=(a+(c.length-1)*d)%c.length,c[a]}function g(a){return{rotationX:e[a].angleX,rotationY:e[a].angleY}}function h(a){return"50% 50% "+-1.5*a.offsetWidth}function i(b,i,j,k){b=b instanceof HTMLElement?[b]:b;var l=k.direction||"left";delete k.direction;var m=d.sequence(k);return m.add(d.animate("BaseFade",b,i,j,{from:{opacity:0},to:{opacity:1},ease:"Sine.easeInOut"})),a.forEach(b,function(a){var b=a.getAttribute("data-angle")||0,k=f(e[l].idx,b),n=g(k),o=h(a);m.add(c.set(a,{transformOrigin:o}),0).add(d.animate("BaseRotate3D",a,i,j,{from:n,perspective:200,fallbackFor3D:!1,ease:"Sine.easeInOut"}),0)}),m.get()}var c=b.engine,d=b.factory,e={pseudoRight:{angleX:"180",angleY:"0",idx:0},right:{angleX:"0",angleY:"180",idx:1},pseudoLeft:{angleX:"-180",angleY:"0",idx:2},left:{angleX:"0",angleY:"-180",idx:3}};i.properties={hideOnStart:!0},d.registerAnimation("ArcIn",i)}),define("animations/animationClasses/animation/dropIn",["animations/localTweenEngine/localTweenEngine"],function(a){"use strict";function c(a,c,d,e){var f=b.sequence(e);return f.add([b.animate("BaseFade",a,.25*c,d,{from:{opacity:0},to:{opacity:1},ease:"Sine.easeIn"}),b.animate("BaseScale",a,c,d,{from:{scale:6},ease:"Sine.easeIn"})]),f.get()}var b=a.factory;c.properties={hideOnStart:!0},b.registerAnimation("DropIn",c)}),define("animations/animationClasses/animation/expandIn",["animations/localTweenEngine/localTweenEngine"],function(a){"use strict";function c(a,c,d,e){var f=b.sequence(e);return f.add([b.animate("BaseFade",a,c,d,{from:{opacity:0},to:{opacity:1},ease:"Cubic.easeIn"}),b.animate("BaseScale",a,c,d,{from:{scale:0},ease:"Sine.easeIn"})]),f.get()}var b=a.factory;c.properties={hideOnStart:!0},b.registerAnimation("ExpandIn",c)}),define("animations/animationClasses/animation/fadeIn",["animations/localTweenEngine/localTweenEngine"],function(a){"use strict";function c(a,c,d,e){var f=b.sequence(e);return f.add(b.animate("BaseFade",a,c,d,{from:{opacity:0},to:{opacity:1},ease:"Cubic.easeIn"})),f.get()}var b=a.factory;c.properties={hideOnStart:!0},b.registerAnimation("FadeIn",c)}),define("animations/animationClasses/animation/fadeOut",["animations/localTweenEngine/localTweenEngine"],function(a){"use strict";function c(a,c,d,e){var f=b.sequence(e);return f.add(b.animate("BaseFade",a,c,d,{to:{opacity:0},ease:"Cubic.easeIn"})),f.get()}var b=a.factory;c.properties={hideOnStart:!1},b.registerAnimation("FadeOut",c)}),define("animations/animationClasses/animation/flipIn",["lodash","animations/localTweenEngine/localTweenEngine"],function(a,b){"use strict";function e(a,b){var c=["top","right","bottom","left"],d=Math.round(b/90);return a=(a+(c.length-1)*d)%c.length,c[a]}function f(b,f,g,h){b=b instanceof HTMLElement?[b]:b;var i=h.direction||"left";delete h.direction;var j=c.sequence(h);return j.add(c.animate("BaseFade",b,.25*f,g,{from:{opacity:0},to:{opacity:1},ease:"Strong.easeIn"})),a.forEach(b,function(a){var b=a.getAttribute("data-angle")||0,h=e(d[i].idx,b),k={rotationX:d[h].angleX,rotationY:d[h].angleY};j.add(c.animate("BaseRotate3D",a,.75*f,g,{from:k,perspective:800,fallbackFor3D:!0,ease:"Strong.easeIn"}),0)}),j.get()}var c=b.factory,d={top:{angleX:"90",angleY:"0",idx:0},right:{angleX:"0",angleY:"90",idx:1},bottom:{angleX:"-90",angleY:"0",idx:2},left:{angleX:"0",angleY:"-90",idx:3}};f.properties={hideOnStart:!0},c.registerAnimation("FlipIn",f)}),define("animations/animationClasses/animation/floatIn",["lodash","animations/localTweenEngine/localTweenEngine"],function(a,b){"use strict";function f(b,f,g,h){b=b instanceof HTMLElement?[b]:b;var i=h.direction||"right";delete h.direction;var j=e[i],k={width:window.innerWidth,height:window.innerHeight},l=d.sequence(h);return l.add(d.animate("BaseFade",b,f,g,{from:{opacity:0},to:{opacity:1},ease:"Cubic.easeIn"})),a.forEach(b,function(a){var e,b=c.getBoundingRect(a),h=j.dy*j.distance;e=j.dx>0?j.dx*Math.max(0,Math.min(k.width-b.right,j.distance)):j.dx*Math.max(0,Math.min(b.left,j.distance)),l.add(d.animate("BasePosition",a,f,g,{from:{x:e,y:h},ease:"Sine.easeOut"}),0)}),l.get()}var c=b.engine,d=b.factory,e={top:{dx:"0",dy:"-1",distance:"60"},right:{dx:"1",dy:"0",distance:"120"},bottom:{dx:"0",dy:"1",distance:"60"},left:{dx:"-1",dy:"0",distance:"120"}};f.properties={hideOnStart:!0},d.registerAnimation("FloatIn",f)}),define("animations/animationClasses/animation/flyIn",["lodash","animations/localTweenEngine/localTweenEngine"],function(a,b){"use strict";function f(b){var c={dx:0,dy:0};return a.forEach(b,function(b){e[b]&&a.assign(c,e[b])},this),c}function g(b,e,g,h){b=b instanceof HTMLElement?[b]:b;var i=h.direction||"right";delete h.direction;var j=f(i.split(" ")),k={width:window.innerWidth,height:window.innerHeight},l=d.sequence(h);return l.add(d.animate("BaseFade",b,e,g,{from:{opacity:0},to:{opacity:1},ease:"Linear.easeIn"})),a.forEach(b,function(a){var b=c.getBoundingRect(a),f=j.dx>0?k.width-b.right:j.dx*b.left,h=j.dy>0?k.height-b.top:j.dy*b.bottom;l.add(d.animate("BasePosition",a,e,g,{from:{x:f,y:h},ease:"Sine.easeOut"}),0)}),l.get()}var c=b.engine,d=b.factory,e={top:{dy:"-1"},right:{dx:"1"},bottom:{dy:"1"},left:{dx:"-1"}};g.properties={hideOnStart:!0},d.registerAnimation("FlyIn",g)}),define("animations/animationClasses/animation/foldIn",["lodash","animations/localTweenEngine/localTweenEngine"],function(a,b){"use strict";function f(a,b,c){var d={x:0,y:0},e=b.width/2,f=b.height/2,g=b.width*parseInt(a.x,10)/100,h=b.height*parseInt(a.y,10)/100,i=e-e*Math.cos(c)+f*Math.sin(c),j=f-e*Math.sin(c)-f*Math.cos(c),k=g-g*Math.cos(c)+h*Math.sin(c),l=h-g*Math.sin(c)-h*Math.cos(c);return d.x=i-k,d.y=j-l,d}function g(a,b){var c=["top","right","bottom","left"],d=Math.round(b/90);return a=(a+(c.length-1)*d)%c.length,c[a]}function h(a,b,c){var d={x:0,y:0};return d.x=b.left+b.width*(parseInt(c.x,10)/100)-a.left,d.y=b.top+b.height*(parseInt(c.y,10)/100)-a.top,d.x+"px "+d.y+"px"}function i(b,i,j,k){b=b instanceof HTMLElement?[b]:b;var l=k.direction||"left";delete k.direction;var m=d.sequence(k);return m.add(d.animate("BaseFade",b,.25*i,j,{from:{opacity:0},to:{opacity:1},ease:"Cubic.easeInOut"})),a.forEach(b,function(a){var b=a.getAttribute("data-angle")||0,k=b*Math.PI/180,n=g(e[l].idx,b),o=c.getBoundingRect(a),p=c.getBoundingContentRect(a),q=f(e[n].origin,p,k),r=h(o,p,e[n].origin),s={rotationX:e[n].angleX,rotationY:e[n].angleY};m.add([d.animate("BasePosition",a,0,j,{to:{transformOrigin:r,x:q.x,y:q.y}}),d.animate("BaseRotate3D",a,i,j,{from:s,perspective:800,fallbackFor3D:!0,ease:"Cubic.easeInOut"})],0)}),m.get()}var c=b.engine,d=b.factory,e={top:{angleX:"-90",angleY:"0",origin:{x:"50%",y:"0"},idx:0},right:{angleX:"0",angleY:"-90",origin:{x:"100%",y:"50%"},idx:1},bottom:{angleX:"90",angleY:"0",origin:{x:"50%",y:"100%"},idx:2},left:{angleX:"0",angleY:"90",origin:{x:"0",y:"50%"},idx:3}};i.properties={hideOnStart:!0},d.registerAnimation("FoldIn",i)}),define("animations/animationClasses/animation/reveal",["lodash","animations/localTweenEngine/localTweenEngine"],function(a,b){"use strict";function f(a,b){var c=["top","right","bottom","left"],d=Math.round(b/90);return a=(a+(c.length-1)*d)%c.length,c[a]}function g(a,b){var d=c.getBoundingRect(a),e=c.getBoundingContentRect(a),f=e.top-d.top,g=e.left-d.left,h=e.width+g,i=e.height+f,j={top:[f,h,f,g],right:[f,h,i,h],center:[(i+f)/2,(h+g)/2,(i+f)/2,(h+g)/2],bottom:[i,h,i,g],left:[f,g,i,g]};return{clip:"rect("+j[b].join("px,")+"px)"}}function h(b,c,h,i){b=b instanceof HTMLElement?[b]:b;var j=i.direction||"left";delete i.direction;var k=d.sequence(i);return k.add(d.animate("BaseFade",b,.25*c,h,{from:{opacity:0},to:{opacity:1},ease:"Cubic.easeInOut"})),a.forEach(b,function(a){var b=a.getAttribute("data-angle")||0,i="center"!==j?f(e[j].idx,b):j,l=g(a,i);k.add(d.animate("BaseClip",a,c,h,{from:l,ease:"Cubic.easeInOut"}),0)}),k.get()}var c=b.engine,d=b.factory,e={top:{idx:0},right:{idx:1},bottom:{idx:2},left:{idx:3}};h.properties={hideOnStart:!0},d.registerAnimation("Reveal",h)}),define("animations/animationClasses/animation/slideIn",["lodash","animations/localTweenEngine/localTweenEngine"],function(a,b){"use strict";function f(a,b){var c=["top","right","bottom","left"],d=Math.round(b/90);return a=(a+(c.length-1)*d)%c.length,c[a]}function g(a,b,c){var d=b.top-a.top,e=b.left-a.left,f=b.width+e,g=b.height+d,h={top:[g,f,g,e],right:[d,e,g,e],bottom:[d,f,d,e],left:[d,f,g,f]};return{clip:"rect("+h[c].join("px,")+"px)"}}function h(a,b,c){var d=a.width,e=a.height,f=b.dy*e*Math.sin(-c)+b.dx*d*Math.cos(c),g=b.dy*e*Math.cos(-c)+b.dx*d*Math.sin(c);return{x:f,y:g}}function i(b,i,j,k){b=b instanceof HTMLElement?[b]:b;var l=k.direction||"left";delete k.direction;var m=d.sequence(k);return m.add(d.animate("BaseFade",b,.25*i,j,{from:{opacity:0},to:{opacity:1},ease:"Cubic.easeInOut"})),a.forEach(b,function(a){var b=c.getBoundingRect(a),k=c.getBoundingContentRect(a),n=a.getAttribute("data-angle")||0,o=n*Math.PI/180,p=f(e[l].idx,n),q=g(b,k,p),r=h(k,e[p],o);m.add([d.animate("BaseClip",a,i,j,{from:q,ease:"Cubic.easeInOut"}),d.animate("BasePosition",a,i,j,{from:r,ease:"Cubic.easeInOut"})],0)}),m.get()}var c=b.engine,d=b.factory,e={top:{dx:0,dy:-1,idx:0},right:{dx:1,dy:0,idx:1},bottom:{dx:0,dy:1,idx:2},left:{dx:-1,dy:0,idx:3}};i.properties={hideOnStart:!0},d.registerAnimation("SlideIn",i)}),define("animations/animationClasses/animation/slideOut",["lodash","animations/localTweenEngine/localTweenEngine"],function(a,b){"use strict";function f(a,b){var c=["top","right","bottom","left"],d=Math.round(b/90);return a=(a+(c.length-1)*d)%c.length,c[a]}function g(a,b,c){var d=b.top-a.top,e=b.left-a.left,f=b.width+e,g=b.height+d,h={top:[g,f,g,e],right:[d,e,g,e],bottom:[d,f,d,e],left:[d,f,g,f]};return{clip:"rect("+h[c].join("px,")+"px)"}}function h(a,b,c){var d=a.width,e=a.height,f=b.dy*e*Math.sin(-c)+b.dx*d*Math.cos(c),g=b.dy*e*Math.cos(-c)+b.dx*d*Math.sin(c);return{x:f,y:g}}function i(b,i,j,k){b=b instanceof HTMLElement?[b]:b;var l=k.direction||"left";delete k.direction;var m=.75,n=(j||0)+i*m,o=i*(1-m),p=d.sequence(k);return p.add(d.animate("BaseFade",b,o,n,{from:{opacity:1},to:{opacity:0},ease:"Cubic.easeInOut"})),a.forEach(b,function(a){var b=c.getBoundingRect(a),k=c.getBoundingContentRect(a),m=a.getAttribute("data-angle")||0,n=m*Math.PI/180,o=f(e[l].idx,m),q=g(b,k,o),r=h(k,e[o],n);p.add([d.animate("BaseClip",a,i,j,{to:q,ease:"Cubic.easeInOut"}),d.animate("BasePosition",a,i,j,{to:r,ease:"Cubic.easeInOut"})],0)}),p.get()}var c=b.engine,d=b.factory,e={top:{dx:0,dy:-1,idx:0},right:{dx:1,dy:0,idx:1},bottom:{dx:0,dy:1,idx:2},left:{dx:-1,dy:0,idx:3}};i.properties={},d.registerAnimation("SlideOut",i)}),define("animations/animationClasses/animation/spinIn",["lodash","animations/localTweenEngine/localTweenEngine"],function(a,b){"use strict";function e(b,e,f,g){var h=g.direction||"cw",i=g.cycles||5;delete g.direction,delete g.cycles;var j=a.clone(d[h]),k=(j.direction>0?"+=":"-=")+360*i,l=c.sequence(g);return l.add([c.animate("BaseFade",b,e,f,{from:{opacity:0},to:{opacity:1},ease:"Sine.easeIn"}),c.animate("BaseScale",b,e,f,{from:{scale:0},ease:"Sine.easeOut"}),c.animate("BaseRotate",b,e,f,{from:{rotation:k},ease:"Sine.easeIn"})]),l.get()}var c=b.factory,d={cw:{direction:"-1"},ccw:{direction:"1"}};e.properties={hideOnStart:!0},c.registerAnimation("SpinIn",e)}),define("animations/animationClasses/animation/turnIn",["lodash","animations/localTweenEngine/localTweenEngine"],function(a,b){"use strict";function f(b,f,g,h){var i=h.direction||"right";delete h.direction;var j=e[i],k={width:window.innerWidth,height:window.innerHeight},l=d.sequence(h);return l.add(d.animate("BaseFade",b,f,g,{from:{opacity:0},to:{opacity:1},ease:"Linear.easeIn"})),a.forEach(b,function(a){var b=c.getBoundingRect(a),e=j.dx>0?k.width-b.right:j.dx*b.left,h=Math.min(-1.5*b.height,Math.max(-300,-5.5*b.height)),i=(j.dx>0?"+=":"-=")+j.angle,m=[{x:j.dx*b.width,y:h},{x:e,y:h}];l.add([d.animate("BasePosition",a,f,g,{from:{bezier:{values:m,type:"soft"}},ease:"Sine.easeOut",immediateRender:!1}),d.animate("BaseRotate",a,f,g,{from:{rotation:i},ease:"Sine.easeOut",immediateRender:!1})],0)}),l.get()}var c=b.engine,d=b.factory,e={left:{dx:"-1",angle:"90"},right:{dx:"1",angle:"90"}};f.properties={hideOnStart:!0},d.registerAnimation("TurnIn",f)}),define("animations/animationClasses/transition/noTransition",["animations/localTweenEngine/localTweenEngine"],function(a){"use strict";function c(a,c,d,e,f){var g=b.sequence(f);return g.add([b.animate("BaseNone",a,d,e),b.animate("BaseNone",c,d,e)]),g.get()}var b=a.factory;c.properties={defaultDuration:0},b.registerTransition("NoTransition",c)}),define("animations/animationClasses/transition/crossFade",["animations/localTweenEngine/localTweenEngine"],function(a){"use strict";function c(a,c,d,e,f){var g=f.stagger||0,h=f.sourceEase||"Sine.easeInOut",i=f.destEase||"Sine.easeInOut";delete f.sourceEase,delete f.destEase,delete f.stagger;var j=b.sequence(f);return j.add([b.animate("BaseFade",a,d,e,{from:{opacity:1},to:{opacity:0},ease:h,stagger:g}),b.animate("BaseFade",c,d,e,{from:{opacity:0},to:{opacity:1},ease:i,stagger:g})]),j.get()}var b=a.factory;c.properties={defaultDuration:.6},b.registerTransition("CrossFade",c)}),define("animations/animationClasses/transition/outIn",["animations/localTweenEngine/localTweenEngine"],function(a){"use strict";function c(a,c,d,e,f){var g=f.stagger||0,h=f.sourceEase||"Strong.easeOut",i=f.destEase||"Strong.easeIn";delete f.sourceEase,delete f.destEase,delete f.stagger;var j=b.sequence(f);return j.add([b.animate("BaseFade",a,d,e,{from:{opacity:1},to:{opacity:0},ease:h,stagger:g}),b.animate("BaseFade",c,d,e,{from:{opacity:0},to:{opacity:1},ease:i,stagger:g})]),j.get()}var b=a.factory;c.properties={defaultDuration:.7},b.registerTransition("OutIn",c)}),define("animations/animationClasses/transition/slideHorizontal",["animations/localTweenEngine/localTweenEngine"],function(a){"use strict";function c(a,c,d,e,f){f=f||{};var g=f.reverse?-1:1,h=f.width||(a.length?a[0].offsetWidth:a.offsetWidth),i=f.ease||"Strong.easeInOut";delete f.ease,delete f.width,delete f.reverse;var j=b.sequence(f);return j.add([b.animate("BaseFade",c,0,e,{to:{opacity:1},immediateRender:!1}),b.animate("BasePosition",a,d,e,{from:{x:0},to:{x:-h*g},ease:i}),b.animate("BasePosition",c,d,e,{from:{x:h*g},to:{x:0},ease:i})]),j.get()}var b=a.factory;c.properties={defaultDuration:.6},b.registerTransition("SlideHorizontal",c)}),define("animations/animationClasses/transition/slideVertical",["animations/localTweenEngine/localTweenEngine"],function(a){"use strict";function c(a,c,d,e,f){f=f||{};var g=f.reverse?-1:1,h=f.height||(a.length?a[0].offsetHeight:a.offsetHeight),i=f.ease||"Strong.easeInOut";delete f.ease,delete f.height,delete f.reverse;var j=b.sequence(f);return j.add([b.animate("BaseFade",c,0,e,{to:{opacity:1},immediateRender:!1}),b.animate("BasePosition",a,d,e,{from:{y:0},to:{y:-h*g},ease:i}),b.animate("BasePosition",c,d,e,{from:{y:h*g},to:{y:0},ease:i})]),j.get()}var b=a.factory;c.properties={defaultDuration:.6},b.registerTransition("SlideVertical",c)}),define("animations/animationClasses/transition/shrink",["animations/localTweenEngine/localTweenEngine"],function(a){"use strict";function c(a,c,d,e,f){var g=f.height,h=f.width,i="rect("+[g/2,h/2,g/2,h/2].join("px,")+"px)",j=f.stagger||0,k=f.sourceEase||"Sine.easeInOut";delete f.sourceEase,delete f.stagger,delete f.width,delete f.height;var l=b.sequence(f);return l.add(b.animate("BaseFade",c,0,e,{to:{opacity:1},clearProps:"clip"})).add(b.animate("BaseClip",a,d,e,{to:{clip:i},ease:k,stagger:j})),l.get()}var b=a.factory;c.properties={},b.registerTransition("Shrink",c)}),define("animations",["animations/localTweenEngine/localTweenEngine","animations/animationClasses/base/sequence/baseSequence","animations/animationClasses/base/baseNone","animations/animationClasses/base/baseFade","animations/animationClasses/base/basePosition","animations/animationClasses/base/baseScale","animations/animationClasses/base/baseSkew","animations/animationClasses/base/baseRotate","animations/animationClasses/base/baseRotate3D","animations/animationClasses/base/baseClip","animations/animationClasses/base/baseDimensions","animations/animationClasses/base/baseScroll","animations/animationClasses/base/baseClear","animations/animationClasses/animation/arcIn","animations/animationClasses/animation/dropIn","animations/animationClasses/animation/expandIn","animations/animationClasses/animation/fadeIn","animations/animationClasses/animation/fadeOut","animations/animationClasses/animation/flipIn","animations/animationClasses/animation/floatIn","animations/animationClasses/animation/flyIn","animations/animationClasses/animation/foldIn","animations/animationClasses/animation/reveal","animations/animationClasses/animation/slideIn","animations/animationClasses/animation/slideOut","animations/animationClasses/animation/spinIn","animations/animationClasses/animation/turnIn","animations/animationClasses/transition/noTransition","animations/animationClasses/transition/crossFade","animations/animationClasses/transition/outIn","animations/animationClasses/transition/slideHorizontal","animations/animationClasses/transition/slideVertical","animations/animationClasses/transition/shrink"],function(a){"use strict";var b=a.engine,c=a.factory;return{animate:c.animate,transition:c.transition,sequence:c.sequence,getProperties:c.getProperties,addTickerEvent:b.addTickerEvent,removeTickerEvent:b.removeTickerEvent,kill:b.kill,delayedCall:b.delayedCall,animateTimeScale:b.animateTimeScale}});