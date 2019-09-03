Simple and minimal size scroll library.

# Installing
~~~
npm install litescroll
~~~

# Usage
LiteScroll is easy to usage. Insert the following code into your project.
~~~
import LiteScroll from 'litescroll';
~~~
Next, create a instance. You can set options at the same time. Each default parameter has a trigger of 'litescroll' as class name to start scrolling, duration of 1000 milliseconds as time at animation, easing of 'linear' as animation effect, you can set either for 'linear', 'easeIn', 'easeOut', 'easeInOut'.
~~~
new LiteScroll();

// or set option
new LiteScroll({
  trigger: 'litescroll',
  duration: 1000,
  easing: 'linear'
});
~~~
Finally, attach the trigger name to anchor tag, 
prepare the element you want to scroll.
~~~
<a href="#apple" class="litescroll">

<div id="apple"></div>
~~~

# Support Borwser
- Chrome
- Firefox
- Safari
- Internet Explorer 11
- Edge

# License
MIT @darumock