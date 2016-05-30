/**
 * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/assign
 */
if (typeof Object.assign != 'function') {
    (function() {
        Object.assign = function(target) {
            'use strict';
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined && source !== null) {
                    for (var nextKey in source) {
                        if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        };
    })();
}
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
var ProgressBarModule;

ProgressBarModule = (function() {

    /**
     * Initialize a new ProgressBarModule object with given parameters.
     *
     * @constructs
     * @param {String} path - Path of a progress bar module application
     * @param {HTMLElement} container - HTML container for progress bar HTML element
     * @param {Object}  options - Object options
     * @example
     * var $container = document.querySelector('#container');
     * var progress = new ProgressBarModule('/my_progressbar', $container, {
     *     websocket: {
     *         host: 'my_host.com'
     *     },
     *     bootstrap: {
     *         progressbar: {
     *             animated: false,
     *         },
     *         progression: {
     *             format: 'Progression: {percent}%'
     *         }
     *     }
     * });
     */
    function ProgressBarModule(path, container, options) {
        if (!(this instanceof ProgressBarModule)) {
            return new ProgressBarModule(path, container, options);
        }
        if (path === void 0) {
            throw new Error("You must pass 'path' parameter during 'ProgressBarModule' instantiation.");
        }
        if (container === void 0 || !(container instanceof HTMLElement)) {
            throw new Error("You must pass an HTML element as container during `ProgressBarModule` instantiation.");
        }

        /**
         * @prop {String} path - Path of a progress bar module application.
         * @private
         */
        this.path = path;

        /**
         * @prop {HTMLElement} container - HTML container for progress bar HTML element
         * @private
         */
        this.container = container;

        /**
         * @prop {Object}  options - Default options which can be overridden during {@link ProgressBarModule} instantiation.
         * @prop {Object}  options.websocket - Same options than `TornadoWebSocket` constructor.
         * @prop {String}  options.type - Type of the progress bar, `html5` or `bootstrap` by default.
         *
         * @prop {Object}  options.bootstrap - Options to use when `type` is `bootstrap`.
         * @prop {Object}  options.bootstrap.label - Options for `label`'s behavior.
         * @prop {Boolean} options.bootstrap.label.visible - Switch on/off `label`'s visibility: `true` by default.
         * @prop {String}  options.bootstrap.label.position - Change `label`'s position: `top` or `bottom` by default.
         * @prop {Object}  options.bootstrap.progressbar - Options for `progressbar`'s behavior.
         * @prop {String}  options.bootstrap.progressbar.context - Change `progress bar`'s context: `success`, `warning`, `danger`, or `info` by default.
         * @prop {Boolean} options.bootstrap.progressbar.stripped - Switch on/off `progress bar`'s stripped effect: `true` by default.
         * @prop {Boolean} options.bootstrap.progressbar.animated - Switch on/off `progress bar`'s animated effect: `true` by default.
         * @prop {Object}  options.bootstrap.progression - Options for `progression`'s behavior.
         * @prop {Boolean} options.bootstrap.progression.visible - Switch on/off `progression`'s visibility: `true` by default.
         * @prop {String}  options.bootstrap.progression.format - Change `progression`'s format: `{{percent}}%` by default
         *
         * @prop {Object}  options.html5 - Options to use when `type` is `html5`.
         * @prop {Object}  options.html5.label - Options for `label`'s behavior.
         * @prop {Boolean} options.html5.label.visible - Switch on/off `label`'s visibility: `true` by default.
         * @prop {String}  options.html5.label.position - Change `label`'s position: `top` or `bottom` by default.
         * @prop {Object}  options.html5.progression - Options for `progression`'s behavior.
         * @prop {Boolean} options.html5.progression.visible - Switch on/off `progression`'s visibility: `true` by default.
         * @prop {String}  options.html5.progression.format - Change `progression`'s format: `{{percent}}%` by default
    
         * @private
         */
        this.options = {
            websocket: {},
            type: 'bootstrap',
            bootstrap: {
                label: {
                    visible: true,
                    position: 'bottom'
                },
                progressbar: {
                    context: 'info',
                    stripped: true,
                    animated: true
                },
                progression: {
                    visible: true,
                    format: '{{percent}}%'
                }
            },
            html5: {
                label: {
                    visible: true,
                    position: 'bottom'
                },
                progression: {
                    visible: true,
                    position: 'right',
                    format: '{{percent}}%'
                }
            }
        };
        this.options = Object.assign({}, this.options, options);

        /**
         * @prop {ProgressBarModuleEngineInterface} engine - Progress bar engine.
         * @private
         */
        this.engine = null;
        switch (this.options.type) {
            case 'bootstrap':
                this.engine = new ProgressBarModuleEngineBootstrap(this.container, this.options);
                break;
            case 'html5':
                this.engine = new ProgressBarModuleEngineHtml5(this.container, this.options);
                break;
            default:
                throw new Error('Given `type` should be equal to ``bootstrap`` or ``html5``.');
        }
    }

    return ProgressBarModule;

})();