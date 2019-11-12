![Plotter Screenshot](https://github.com/jcponce/complex/blob/gh-pages/function-plotter/reim.png)

## Complex Function Plotter 
#### [Live Demo](http://jcponce.github.io/complex/function-plotter/)

A WebGL-based complex expression parser and plotter. This project was forked from the amazing work of [Brandon Pelfrey](https://github.com/brandonpelfrey/complex-function-plot). 

## What is this?

This tool allows you to visualize, in real-time, in a browser, how complex functions distort the complex plane, like in the [Conformal Mapping](http://mathworld.wolfram.com/ConformalMapping.html) entry from Wolfram Mathworld.

The rendered image is created by evaluating the user-supplied function and then using the results of that function to look up a color in an image which is infinitely tiled over the [Complex Plane](http://mathworld.wolfram.com/ComplexPlane.html). By changing the expression in the input field, you can visualize how various functions distort the plane.

## Available Functions and Variables
I added extra complex functions to explore.

* Basic arithmetic operators -- "+ - * /" for combining various complex numbers
* Functions -- "sin, cos, tan, sinh, cosh, tanh, abs, conj, re, im, log, ^" for computing sine, cosine, tangent, hyperbolic trigonometric functions, the conjugate, real and imaginary components, along with complex power and logarithms
* Constants -- "<a,b>" for defining a complex number (a,b) from two real-values.
* Pre-Defined Constants -- "pi, e, a, b" for using common constants. The constants "a" and "b" will take on the value of the real and complex part of the point in the complex plane.
* "Animated" Parameter -- "t" can be used in place of a real value to provide some animation to your plot. It slowly oscillates between -1 and 1.

## Some examples

* [Fluid around cilinder](https://jcponce.github.io/complex/function-plotter/?expression=eiAqICgxIC0gKHQrMSkvMikgKyAodCsxKS8yICogKHorMS96KQ==)
* [Disk with a rotating tile](https://jcponce.github.io/complex/function-plotter/?expression=KHogKiAwLjk5ICsgMC4wMSAqICgoMSAtIHpeKDE4KSkgKiB6XjIpICkgKiAoMSArIGkgKiB0KQ==)
* [Dilatation](https://jcponce.github.io/complex/function-plotter/?expression=ZV4oaSAqIDAuNSAqICh6IC0gMyppKSArIGxvZyh6IC0gMyppKSkgKiAodCsxKS8yICsgeiAqICgxIC0gKHQrMSkvMik=)
* [Disturbing reality](https://jcponce.github.io/complex/function-plotter/?expression=KHogKiAzKS8yICogZV4odCAqIHBpICogaSAqIGVeKCAtMSAqIGFicyggKHoqMykvMiApXjIgKSk=)
* [Waves](https://jcponce.github.io/complex/function-plotter/?expression=ZV4oaSAqICgxLjUgKiByKV41KSArIHQ=)

## How does it work?
#### This tool runs in real-time thanks to a few other libraries.

* Expressions given by the user are parsed using the [PEG.js](https://pegjs.org/) library along with a grammar written specifically for this plotter that encapsulates complex-valued arithmetic and functions. The grammar is fed to PEG.js which produces a parser, and that parser is then used to transform mathematical expressions into a WebGL-compatible snippet of code. The generated code is placed into a WebGL shader template and compiled to give a new rendering based on the expression supplied by the user. All of this happens ~instantly, even on a phone.
* [THREE.js](https://threejs.org/) is used to set up the full-window Quad, manage GLSL uniforms, shader compilation, etc. (Basically all the boilerplate display logic).
* jQuery is used for some very minor setup logic (could be easily removed...)


