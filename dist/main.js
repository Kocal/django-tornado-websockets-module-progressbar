(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.deepmerge = factory();
    }
}(this, function() {

    return function deepmerge(target, src) {
        var array = Array.isArray(src);
        var dst = array && [] || {};

        if (array) {
            target = target || [];
            dst = dst.concat(target);
            src.forEach(function(e, i) {
                if (typeof dst[i] === 'undefined') {
                    dst[i] = e;
                } else if (typeof e === 'object') {
                    dst[i] = deepmerge(target[i], e);
                } else {
                    if (target.indexOf(e) === -1) {
                        dst.push(e);
                    }
                }
            });
        } else {
            if (target && typeof target === 'object') {
                Object.keys(target).forEach(function(key) {
                    dst[key] = target[key];
                })
            }
            Object.keys(src).forEach(function(key) {
                if (typeof src[key] !== 'object' || !src[key]) {
                    dst[key] = src[key];
                } else {
                    if (!target[key]) {
                        dst[key] = src[key];
                    } else {
                        dst[key] = deepmerge(target[key], src[key]);
                    }
                }
            });
        }

        return dst;
    }

}));
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


    /**
     * Make and display an HTML render to the user.
     * @memberof ProgressBarModuleEngineInterface
     * @public
     */

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
     * Bootstrap engine for {@link ProgressBarModule} that implements {@link ProgressBarModuleEngineInterface}.
     * @constructs
     * @extends ProgressBarModuleEngineInterface
     */

    function ProgressBarModuleEngineBootstrap(container, options) {
        this.container = container;
        this.options = options;
    }


    /**
     * Read {@link ProgressBarModuleEngineInterface#render}.
     * @memberof ProgressBarModuleEngineBootstrap
     */

    ProgressBarModuleEngineBootstrap.prototype.render = function() {
        console.log(this.container);
        console.log(this.options);
        this._createElements();
        this.$progress.appendChild(this.$progressbar);
        this.container.appendChild(this.$progress);
        if (this.options.label.position === 'top') {
            return this.container.insertBefore(this.$label, this.$progress);
        } else {
            return this.container.appendChild(this.$label);
        }
    };

    ProgressBarModuleEngineBootstrap.prototype._createElements = function() {
        var __, i, len, ref;
        this.$progress = document.createElement('div');
        this.$progress.classList.add('progress');
        this.$progressbar = document.createElement('div');
        this.$progressbar.classList.add('progress-bar');
        this.$progressbar.setAttribute('role', 'progressbar');
        this.$label = document.createElement('span');
        ref = this.options.label.classes;
        for (i = 0, len = ref.length; i < len; i++) {
            __ = ref[i];
            this.$label.classList.add(__);
        }
        if (this.options.label.visibility === false) {
            this.$label.style.display = 'none';
        }
        return this.$label.textContent = 'Loading...';
    };

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
        if (options == null) {
            options = {};
        }
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
         * @prop {Array}   options.bootstrap.label.classes - Array of CSS classes for `label`'.
         * @prop {String}  options.bootstrap.label.position - Change `label`'s position: `bottom` or `top` by default.
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
         * @prop {Array}   options.html5.label.classes - Array of CSS classes for `label`'.
         * @prop {String}  options.html5.label.position - Change `label`'s position: `bottom` or `top` by default.
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
                    classes: ['progressbar-label'],
                    position: 'top'
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
                    classes: ['progressbar-label'],
                    position: 'top'
                },
                progression: {
                    visible: true,
                    position: 'right',
                    format: '{{percent}}%'
                }
            }
        };
        this.options = deepmerge(this.options, options);

        /**
         * @prop {ProgressBarModuleEngineInterface} engine - Progress bar engine.
         * @private
         */
        this.engine = null;
        switch (this.options.type) {
            case 'bootstrap':
                this.engine = new ProgressBarModuleEngineBootstrap(this.container, this.options.bootstrap);
                break;
            case 'html5':
                this.engine = new ProgressBarModuleEngineHtml5(this.container, this.options.html5);
                break;
            default:
                throw new Error('Given `type` should be equal to ``bootstrap`` or ``html5``.');
        }
        this.engine.render();
    }

    return ProgressBarModule;

})();