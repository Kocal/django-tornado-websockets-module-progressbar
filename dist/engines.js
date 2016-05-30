var ProgressBarModuleEngineBootstrap, ProgressBarModuleEngineInterface, ___a,
    extend = function(child, parent) {
        for (var key in parent) {
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    },
    hasProp = {}.hasOwnProperty;

___a = (function(superClass) {
    extend(___a, superClass);

    function ___a() {
        return ___a.__super__.constructor.apply(this, arguments);
    }

    return ___a;

})(Window);


/**
 * Interface for classes that represent a {@link ProgressBarModule#engine}.
 * @interface
 * @class
 */

ProgressBarModuleEngineInterface = (function() {
    function ProgressBarModuleEngineInterface() {
        throw new Error('`ProgressBarModuleEngineInterface` should be implemented as an interface.');
    }

    ProgressBarModuleEngineInterface.prototype.render = function() {
        throw new Error('`render` method should be overridden.');
    };

    ProgressBarModuleEngineInterface.prototype.updateProgression = function() {
        throw new Error('`updateProgression` method should be overridden.');
    };

    return ProgressBarModuleEngineInterface;

})();

ProgressBarModuleEngineBootstrap = (function(superClass) {
    extend(ProgressBarModuleEngineBootstrap, superClass);


    /**
     * Bootstrap engine for {@link ProgressBarModule} that implements {@link ProgressBarModuleEngineInterface}
     * @constructs
     */

    function ProgressBarModuleEngineBootstrap() {}

    ProgressBarModuleEngineBootstrap.prototype.render = function() {};

    return ProgressBarModuleEngineBootstrap;

})(ProgressBarModuleEngineInterface);