Объект для удобной работы с асинхронностью
========

Как использовать
--------

```javascript
// Создание нового объекта Deferred с добавлением обработчика, который вызовится после выполнения всех отложенных методов.
// result1, result2 - результаты выполнения отложенных методов. Аргументы передаются в порядке добавления отложенных методов
// ctx - контекст передающийся в обработчик в виде this
var dfd = new Deferred(function(result1, result2){console.log(result1, result2);}, ctx);

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
