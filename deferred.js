/**
 * @author Roman Martynov
 * @version 1.0
 */
(function (window) {
    window.Deferred = function (resolver, context) {
        this.resolver = resolver;
        this.isResolved = false;
        this.resolverContext = context;
        this.cblist = [];
        this.args = [];
    };
    Deferred.prototype = {
        done   : function (cb, context) {
            this.cblist.push({'cb': cb, 'ctx': context});
            return this;
        },
        resolve: function () {
            var list = this.cblist;


            for (var i = 0, l = list.length; i < l; i++) {
                var self = this;

                (function (i) {
                    var complete = function (arg) {
                        self.args[i] = arg;
                        if (self.args.length == l && !self.isResolved) {
                            self.isResolved = true;
                            self.resolver.apply(self.resolverContext, self.args);
                        }
                    }

                    var df = list[i];
                    df.cb.call(df.ctx, complete);
                })(i)
            }
        }
    };
})(window);