(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{19:function(t,e,s){},20:function(t,e,s){"use strict";s.r(e);var o=s(9),i=s.n(o),a=s(10),n=s(7),r=s(2),c=s(3),d=s(4),h=s(6),u=s(5),l=s(0),p=s(11),m=s.n(p),b=s(1),f=function(t){Object(h.a)(s,t);var e=Object(u.a)(s);function s(){return Object(r.a)(this,s),e.apply(this,arguments)}return Object(c.a)(s,[{key:"render",value:function(){var t=this;return Object(b.jsx)("div",{className:this.props.on.some((function(e){return e.posX===t.props.posX&&e.posY===t.props.posY}))?"dark":this.props.red[0]===this.props.posX&&this.props.red[1]===this.props.posY?"red":"box",onClick:this.props.onClick})}}]),s}(l.Component),k=(s(19),s(12)),v=function(t){Object(h.a)(s,t);var e=Object(u.a)(s);function s(t){var o;return Object(r.a)(this,s),(o=e.call(this,t)).handleKeyDown=o.handleKeyDown.bind(Object(d.a)(o)),o.state={on:[{posX:7,posY:8,direction:0},{posX:7,posY:7,direction:0}],red:[],direction:0,disabled:!0,score:0,pressed:!1,deleteTimeout:!1,startTimeout:!1,beginning:!0},o}return Object(c.a)(s,[{key:"getRandomPos",value:function(){var t=[Math.floor(15*Math.random()),Math.floor(15*Math.random())];return this.state.on.some((function(e){return e.posX===t[0]&&e.posY===t[1]}))?this.getRandomPos():t}},{key:"handleScoreChange",value:function(){this.setState((function(t){return{score:t.score+1}})),(!localStorage.getItem("score")||localStorage.getItem("score")<this.state.score)&&localStorage.setItem("score",this.state.score)}},{key:"addPos",value:function(t,e){var s=this;return-1===t||15===t||-1===e||15===e?this.disable():this.state.red[0]===t&&this.state.red[1]===e?(this.handleScoreChange(),this.addPosFromOppDirection()):this.includes(t,e)?this.disable():void(!0!==this.state.disabled&&this.setState((function(o){return{on:[].concat(Object(n.a)(o.on),[{posX:t,posY:e,direction:s.state.direction}])}})))}},{key:"addOpPos",value:function(t,e){var s=this;if(-1===t||15===t||-1===e||15===e)return this.disable();this.setState({red:this.getRandomPos()}),this.setState((function(o){return{on:[{posX:t,posY:e,direction:s.state.direction}].concat(Object(n.a)(o.on))}})),this.addPosFromDirection()}},{key:"includes",value:function(t,e){if(this.state.on.some((function(s){return s.posX===t&&s.posY===e})))return!0}},{key:"disable",value:function(){this.setState({disabled:!0})}},{key:"addPosFromDirection",value:function(){var t=this.state.on[this.state.on.length-1];switch(this.state.direction){case 0:this.addPos(t.posX,t.posY-1);break;case 1:this.addPos(t.posX+1,t.posY);break;case 2:this.addPos(t.posX,t.posY+1);break;case 3:this.addPos(t.posX-1,t.posY);break;default:return new Error("There is no direction in the state")}}},{key:"addPosFromOppDirection",value:function(){var t=this.state.on[0];switch(t.direction){case 0:this.addOpPos(t.posX,t.posY+1);break;case 1:this.addOpPos(t.posX-1,t.posY);break;case 2:this.addOpPos(t.posX,t.posY-1);break;case 3:this.addOpPos(t.posX+1,t.posY);break;default:return new Error("There is no direction in the state")}}},{key:"removeOldestPos",value:function(){!0!==this.state.disabled&&this.setState((function(t){return{on:Object(n.a)(t.on.slice(1))}}))}},{key:"changeDirection",value:function(t){this.setState((function(e){return{direction:(e.direction+t)%4}}))}},{key:"handleKeyDown",value:function(t){if(32===t.keyCode){if(!0===this.state.pressed)return;if(t.preventDefault(),!1===this.state.disabled)return this.setState({pressed:!0,deleteTimeout:!0})}switch(t.keyCode){case 37:case 38:case 39:case 40:t.preventDefault();case 65:case 87:case 68:case 83:case 32:if(!0===this.state.pressed)return;this.setState({pressed:!0}),!0===this.state.disabled&&this.setState({startTimeout:!0})}switch(t.keyCode){case 37:case 65:0!==this.state.direction&&2!==this.state.direction||this.changeDirection(0===this.state.direction?3:1);break;case 38:case 87:3!==this.state.direction&&1!==this.state.direction||this.changeDirection(3===this.state.direction?1:3);break;case 39:case 68:0!==this.state.direction&&2!==this.state.direction||this.changeDirection(0===this.state.direction?1:3);break;case 40:case 83:3!==this.state.direction&&1!==this.state.direction||this.changeDirection(3===this.state.direction?3:1);break;default:return}}},{key:"componentDidMount",value:function(){var t=this;this.setState({red:this.getRandomPos()}),setTimeout((function(){return t.timeout()}),200),document.documentElement.style.setProperty("--snake-color",localStorage.getItem("snake-color")?localStorage.getItem("snake-color"):"#000000"),document.addEventListener("keydown",this.handleKeyDown)}},{key:"timeout",value:function(){var t=this;if(!0===this.state.disabled&&!1===this.state.startTimeout)return setTimeout((function(){return t.timeout()}),200);if(!0===this.state.startTimeout||!0===this.state.deleteTimeout)return this.restart();this.addPosFromDirection(),this.removeOldestPos(),this.setState({pressed:!1});var e=200-2*this.state.score;setTimeout((function(){return t.timeout()}),e>=100?e:100)}},{key:"restart",value:function(){var t=this;this.setState({on:[{posX:7,posY:8,direction:0},{posX:7,posY:7,direction:0}],red:this.getRandomPos(),direction:0,disabled:!1,score:0,deleteTimeout:!1,startTimeout:!1,beginning:!1},Object(a.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.timeout());case 1:case"end":return e.stop()}}),e)}))))}},{key:"handleColorChange",value:function(t){document.documentElement.style.setProperty("--snake-color",t),localStorage.setItem("snake-color",t)}},{key:"render",value:function(){for(var t=this,e=[],s=0;s<15;s++)for(var o=0;o<15;o++)e.push(Object(b.jsx)(f,{posX:o,posY:s,on:this.state.on,red:this.state.red},"".concat(s,"_").concat(o)));return Object(b.jsxs)("div",{children:[Object(b.jsxs)("div",{className:"game",children:["Score: ",this.state.score,Object(b.jsx)("br",{}),"High Score: ",localStorage.getItem("score")||this.state.score,Object(b.jsxs)("div",{className:"layout",children:[Object(b.jsx)("div",{className:"game-board",children:e}),Object(b.jsxs)("button",{type:"button",className:!0===this.state.disabled?"text-block1":"text-block",onClick:function(){return t.setState({startTimeout:!0})},children:[Object(b.jsx)("p",{children:!0===this.state.beginning?"Welcome!":"You died"}),Object(b.jsx)("p",{className:"smaller-text",children:!0===this.state.beginning?"Your goal is to eat as many apples as you can, use the W A S D or the arrow keys to move (or start) and press the space bar to restart if you desire! Click here to begin!":"Click to respawn"})]})]})]}),Object(b.jsx)(k.a,{className:"picker",color:document.documentElement.style.getPropertyValue("--snake-color"),onChange:this.handleColorChange})]})}}]),s}(l.Component);m.a.render(Object(b.jsx)(v,{}),document.getElementById("root"))}},[[20,1,2]]]);
//# sourceMappingURL=main.62aee6c1.chunk.js.map