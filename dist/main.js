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
var ProgressBarModule;

ProgressBarModule = (function() {

    /**
     * Initialize a new ProgressBarModule object with given parameters.
     *
     * @constructs
     * @param {String} path - Path of a progress bar module application
     * @param {HTMLElement} container - HTML container for progress bar
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
     *     },
     *     progression: {
     *         text_format: 'Progression: {percent}%'
     *     }
     * });
     */
    function ProgressBarModule(path, container, options) {
        var ref;
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
         * @property {String} path - Path of a progress bar module application.
         * @private
         */
        this.path = path;
        this.container = container;

        /**
         * @prop {Object}  options - Default options overridden during {@link ProgressBarModule} instantiation
         * @prop {Object}  options.websocket - Same options than `TornadoWebSocket` constructor
         * @prop {String}  options.type - Type of the progress bar, `html5` or `bootstrap` by default
         * @prop {Object}  options.bootstrap - Options to use when `type` is `bootstrap`
         * @prop {Object}  options.bootstrap.label - Options for `label`'s behavior
         * @prop {Boolean} options.bootstrap.label.visible - Switch on/off label's visibility, `true` by default
         * @prop {String}  options.bootstrap.label.position - Label's position `top` or `bottom` by default
         * @prop {Object}  options.bootstrap.progressbar - Options for `progressbar`'s behavior
         * @prop {Boolean} options.bootstrap.progressbar.context - Switch on/off label's visibility, `true` by default
         * @prop {Object}  options.html5 - configuration when `type` is `html5`
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
                    text_format: '{percent}%'
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
                    text_format: '{percent}%'
                }
            }
        };
        this.options = Object.assign({}, this.options, options);
        if ((ref = this.options.type) !== 'bootstrap' && ref !== 'html5') {
            throw new Error('Given `type` should be equal to ``bootstrap`` or ``html5``.');
        }
        this.render();
    }


    /**
     * A method
     * @memberof ProgressBarModule
     */

    ProgressBarModule.prototype.render = function() {
        if (this.options.type === 'bootstrap') {
            console.log('bootstrap');
            return;
        }
        if (this.options.type === 'html5') {
            console.log('html5');
        }
    };

    return ProgressBarModule;

})();