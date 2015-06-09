# carcare
gulp + requirejs + jade 
一个前端框架：
1、html采用jade模板引擎
2、js使用了requirejs（AMD）进行模块化的开发同时，使用到js继承方式
  function sup(name){
     this.name = name;
     this.colors = ['red','green'];
  }
  sup.prototype.sayName = function(){
     alert(this.name);
  }
  
  function sub(name,age){
     sup.call(this,name);
     this.age = age;
  }
  
  sub.prototype =  sup.prototype;
  sub.prototype.constructor = sub;
  sub.prototype.sayAge = function(){
     alert(this.age);
  }
  3、打包发布使用gulp，使用的插件查看Gulpfile.js文件。
  4、使用步骤：
     （1）、npm install
     （2）、gulp default
  5、具体生成内容查看public
