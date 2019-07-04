function Complex(e,t){this.re=e,this.im=t,this.argCalc=!1,this.magCalc=!1,this.Real=function(){return this.re},this.Imaginary=function(){return this.im},this.Magnitude=function(){return this.magCalc||(this.mag=Math.sqrt(Math.pow(this.re,2)+Math.pow(this.im,2)),this.magCalc=!0),this.mag},this.Argument=function(){return this.argCalc||(this.arg=Math.atan2(this.im,this.re),this.argCalc=!0),this.arg},this.ToString=function(){return this.im<0?+this.re.toFixed(2)+"-"+ +Math.abs(this.im).toFixed(2)+"i":+this.re.toFixed(2)+"+"+ +Math.abs(this.im).toFixed(2)+"i"}}function Add(e,t){return new Complex(e.Real()+t.Real(),e.Imaginary()+t.Imaginary())}function Subtract(e,t){return Add(e,new Complex(0-t.Real(),0-t.Imaginary()))}function Multiply(e,t){return new Complex(e.Real()*t.Real()-e.Imaginary()*t.Imaginary(),e.Real()*t.Imaginary()+e.Imaginary()*t.Real())}function Divide(e,t){var n=Multiply(e,new Complex(t.Real(),0-t.Imaginary())),a=Math.pow(t.Real(),2)+Math.pow(t.Imaginary(),2);return new Complex(n.Real()/a,n.Imaginary()/a)}function Pow(e,t){var n=e.Magnitude(),a=e.Argument(),i=t.Real(),o=t.Imaginary(),r=Math.log(n),c=Math.pow(Math.E,i*r-o*a),s=i*a+o*r;return new Complex(c*Math.cos(s),c*Math.sin(s))}function Sin(e){var t=Multiply(compI,e),n=Pow(compE,t);return Divide(Subtract(n,Divide(comp1,n)),comp2I)}function Cos(e){var t=Multiply(compI,e),n=Pow(compE,t);return Divide(Add(n,Divide(comp1,n)),comp2)}function Tan(e){var t=Multiply(compI,e),n=Pow(compE,t),a=Divide(comp1,n);return Divide(Subtract(n,a),Multiply(compI,Add(n,a)))}function Log(e){return new Complex(Math.log(e.Magnitude()),e.Argument())}function init(){document.getElementById("main").style.display="block",document.getElementById("canvas").height=$("canvas").height(),document.getElementById("canvas").width=$("canvas").width(),document.getElementById("main").style.display="none",window.onresize=resize,$w=$(window).width(),graph()}function resize(){if($(window).width()!=$w||$w>1080){$w=$(window).width();var e=!1;"none"==document.getElementById("main").style.display&&(document.getElementById("main").style.display="block",e=!0),document.getElementById("canvas").height=$("canvas").height(),document.getElementById("canvas").width=$("canvas").width(),graph(),e&&(document.getElementById("main").style.display="none")}}function setPixel(e,t,n,a,i,o,r){var c=4*(a*e.width+n);t[c]=i,t[c+1]=o,t[c+2]=r,t[c+3]=255}function prec(e){switch(e){case"+":return 1;case"-":return 1;case"*":return 2;case"/":return 2;case"^":return 3;case"sin":return 4;case"cos":return 4;case"tan":return 4;case"log":return 4;default:return-1}}function shuntingYard(e){e=e.replace(/ /g,"");for(var t=0;t<e.length;t++)t<e.length-1&&/[zepi\)]/.test(e[t])&&(/[zepi\(0-9.]/.test(e[t+1])||["sin","cos","tan","log"].indexOf(e.slice(t+1,t+4))>=0)&&(e=e.slice(0,t+1)+"*"+e.slice(t+1,e.length)),t>0&&/[zepi\(]/.test(e[t])&&/[zepi\)0-9.]/.test(e[t-1])&&(e=e.slice(0,t)+"*"+e.slice(t,e.length));for(var t=0;t<e.length;t++)"-"==e[t]&&(0==t||"("==e[t-1])&&(e=e.slice(0,t)+"0"+e.slice(t,e.length));for(var n=[],t=0;t<e.length;t++)if(token=e[t],/[zepi+*-\/\^\(\)]/.test(token))n.push(token);else if(/[0-9.]/.test(token)){for(t++;/[0-9.]/.test(e[t]);)token+=e[t],t++;if(t--,(token.match(/[.]/g)||[]).length>1)throw"Invalid Expression";n.push(token)}else{if(!(["sin","cos","tan","log"].indexOf(e.slice(t,t+3))>=0))throw"Invalid Expression";if(n.push(e.slice(t,t+3)),t+=2,"("!=e[t+1])throw"Invalid Expression"}for(var a=[],i=[],t=0;t<n.length;t++)if(token=n[t],/[0-9.]/.test(token[0])||/^[zepi]/.test(token))i.push(token);else if(/[+*-\/\^]/.test(token)||["sin","cos","tan","log"].indexOf(token)>=0){if(a.length>0)for(;(prec(a[a.length-1])>prec(token)||prec(a[a.length-1])==prec(token)&&"^"!=a[a.length-1])&&(i.push(a.pop()),0!=a.length););a.push(token)}else if("("==token)a.push(token);else if(")"==token){if(!(a.length>0))throw"Invalid Expression";for(;"("!=a[a.length-1];)if(i.push(a.pop()),0==a.length)throw"Invalid Expression";a.pop()}for(;a.length>0;){if("("==a[a.length-1])throw"Invalid Expression";i.push(a.pop())}for(var t=0;t<i.length;t++)"i"==i[t]?i[t]=compI:"e"==i[t]?i[t]=compE:"p"==i[t]?i[t]=compPi:/[0-9.]/.test(i[t][0])&&(i[t]=new Complex(Number(i[t]),0));return i}function funcVal(e,t){for(var n=0;n<t.length;n++)"z"==t[n]&&(t[n]=e);stack=[];for(var n=0;n<t.length;n++)if(token=t[n],"string"==typeof token){if(["sin","cos","tan","log"].indexOf(token)>=0){var a=stack.pop();switch(token){case"sin":r=Sin(a);break;case"cos":r=Cos(a);break;case"tan":r=Tan(a);break;case"log":r=Log(a)}}else{var i=stack.pop(),o=stack.pop(),r=new Complex(0,0);switch(token){case"+":r=Add(o,i);break;case"-":r=Subtract(o,i);break;case"*":r=Multiply(o,i);break;case"/":r=Divide(o,i);break;case"^":r=Pow(o,i)}}stack.push(r)}else stack.push(token);if(1!=stack.length)throw"Invalid Expression";return stack.pop()}function FromHSV(e,t,n){var a=n*t,i=a*(1-Math.abs(e/60%2-1)),o=n-a,r=0,c=0,s=0;return e>=0&&60>e?(r=a,c=i,s=0):e>=60&&120>e?(r=i,c=a,s=0):e>=120&&180>e?(r=0,c=a,s=i):e>=180&&240>e?(r=0,c=i,s=a):e>=240&&300>e?(r=i,c=0,s=a):e>=300&&360>=e&&(r=a,c=0,s=i),[Math.floor(255*(r+o)),Math.floor(255*(c+o)),Math.floor(255*(s+o))]}function graph(){"block"==$("#main").css("display")&&$("#overlay").css("opacity","1"),$("#error").css("opacity",""),$("#graphbutton").css({visibility:"",opacity:""}),$changeMade=!1,setTimeout(function(){try{var e=document.getElementById("canvas"),t=e.getContext("2d"),n=t.getImageData(0,0,e.width,e.height),a=n.data,i=new Complex(centre.Real()-nmPerPx*e.width/2,centre.Imaginary()+nmPerPx*e.height/2),o=new Complex(centre.Real()+nmPerPx*e.width/2,centre.Imaginary()-nmPerPx*e.height/2);document.getElementById("topleftcoords").innerHTML=i.ToString(),document.getElementById("bottomrightcoords").innerHTML=o.ToString();var r=Number(document.getElementById("modulus").value);if(0>=r)throw"Invalid Expression";var c=shuntingYard(document.getElementById("function").value);for(x=0;x<e.width;x++)for(y=0;y<e.height;y++){var s=new Complex(i.Real()+x*nmPerPx,i.Imaginary()-y*nmPerPx),l=funcVal(s,c.slice(0)),h=l.Magnitude(),m=l.Argument(),p=Math.floor((m+Math.PI)/Math.PI*180),g=1,u=h%r/r;h%(2*r)>r&&(u=1-u),rgb=FromHSV(p,g,u),setPixel(n,a,x,y,rgb[0],rgb[1],rgb[2])}t.putImageData(n,0,0)}catch(d){$("#error").css("opacity","1")}$("#overlay").css("opacity","")},100)}function shiftUp(){var e=document.getElementById("canvas");centre=new Complex(centre.Real(),centre.Imaginary()+.3*e.height*nmPerPx),graph()}function shiftDown(){var e=document.getElementById("canvas");centre=new Complex(centre.Real(),centre.Imaginary()-.3*e.height*nmPerPx),graph()}function shiftRight(){var e=document.getElementById("canvas");centre=new Complex(centre.Real()+.3*e.width*nmPerPx,centre.Imaginary()),graph()}function shiftLeft(){var e=document.getElementById("canvas");centre=new Complex(centre.Real()-.3*e.width*nmPerPx,centre.Imaginary()),graph()}function zoomIn(){nmPerPx/=2,graph()}function zoomOut(){nmPerPx*=2,graph()}function ToggleControls(){"0px"==$(".control").css("bottom")?($(".control").css("bottom",""),$("#ctr-show").html("Show Controls"),$changeMade&&setTimeout(graph,710)):($(".control").css("bottom","0px"),$("#ctr-show").html("Hide Controls"))}function TextChange(){$("#graphbutton").css({visibility:"visible",opacity:"1"}),$changeMade=!0}const compE=new Complex(Math.E,0),compI=new Complex(0,1),comp2I=new Complex(0,2),comp1=new Complex(1,0),comp2=new Complex(2,0),compPi=new Complex(Math.PI,0);var centre=new Complex(0,0),nmPerPx=.01;