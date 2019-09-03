Simple and minimal size scroll library.

# Installing
~~~
npm install plainScroll
~~~

# Usage
PlainScroll is easy to usage. Insert the following code into your project.
~~~
import PlainScroll from 'plainScroll';
~~~
Next, create a instance. You can set options at the same time. Each default parameter has a trigger of 'plainScroll' as class name to start scrolling, duration of 1000 milliseconds as time at animation, easing of 'easeOut' as animation effect, you can set either for 'linear', 'easeIn', 'easeOut', 'easeInOut'.
~~~
new PlainScroll();

// or set option
new PlainScroll({
  trigger: 'plainScroll',
  duration: 1000,
  easing: 'easeOut'
});
~~~
Finally, attach the trigger name to anchor tag, 
prepare the element you want to scroll.
~~~
<a href="#moveto" class="plainScroll">

<div id="moveto"></div>
~~~

# Support Borwser
- Chrome
- Firefox
- Safari
- Internet Explorer 11
- Edge

# License
MIT @darumock