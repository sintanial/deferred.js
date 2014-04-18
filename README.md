Объект для удобной работы с асинхронностью
========

Описание
--------

##### new Deferred - Конструктор
**handler(arg1,arg2,...,argn)** - обработчик. Вызывается после выполнения всех отложенных методов.
arg1,arg2,...,argn - результат выполнения отложенных методов. Добавляются в таком же порядком, в каком добавлялись отложенные методы

**context** - смена контекста this в методе handler.
```javascript
new Deferred(handler, context = window);
```

##### done - Добавление отложенного метода
**handler(complete)** - обработчик. Вызывается после выполнения всех отложенных методов.
complete(result) - метод который необходимо вызвать для передачи результата в Deferred.

**context** - смена контекста this в методе handler.
```javascript
dfd.done(handler, context = window);
```

##### resolve - Выполнение всех отложенных методов
```javascript
dfd.resolve();
```

Как использовать
--------

```javascript
// Создание нового объекта Deferred с добавлением обработчика, который вызовится после выполнения всех отложенных методов.
// result1, result2 - результаты выполнения отложенных методов. Аргументы передаются в порядке добавления отложенных методов
// ctx - контекст передающийся в обработчик в виде this
var dfd = new Deferred(function(result1, result2){console.log(result1, result2);}, window);

// Добавление отложенного метода
// ctx - контекст передающий в колбек в виде this
dfd.done(function(complete){
    var xhr = new XmlHttpRequest();
    xhr.onreadystatechange = function () {
        complete('example');
    };
    xhr.open('GET', 'example.com', true);
    xhr.send();
}, window);

dfd.done(function(complete){
    var xhr = new XmlHttpRequest();
    xhr.onreadystatechange = function () {
        complete('foobar');
    };
    xhr.open('GET', 'foobar.org', true);
    xhr.send();
}, window);

// Выполняет все отложенные методы
dfd.resolve();

// После выполнения всех отложенны методов, выполняется обработчик переданный в Deferred, в который передаются результаты выполнения отложенных методов.
// В итоге после выполнения данного кода результатом будет в console
// example foobar
```
